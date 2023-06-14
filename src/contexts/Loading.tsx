'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useMemo, useState } from 'react';
import boredHand from '../../public/loading.json';

interface LoadingProps {
  children: ReactNode;
}

export type LoadingState = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingState>(null!);

export function Loading({ children }: LoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenHeight(window.screen.availHeight);
    }
  }, []);

  const state = useMemo(() => ({
    isLoading,
    setIsLoading,
  }), [isLoading]);

  if (!screenHeight) return null;

  return (
    <LoadingContext.Provider value={state}>
      <motion.div
        className="absolute z-50 bg-black flex justify-center items-center w-screen left-0"
        initial={isLoading
          ? { top: screenHeight, bottom: 0, height: 0 }
          : { top: 0, bottom: 0, height: screenHeight }}
        animate={isLoading
          ? { top: 0, bottom: 0, height: screenHeight }
          : { top: 0, bottom: screenHeight, height: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <Lottie animationData={boredHand} loop style={{ width: 400 }} />
          </div>
        ) : null}
      </motion.div>

      {children}
    </LoadingContext.Provider>

  );
}
