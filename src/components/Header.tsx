'use client';

import { motion } from 'framer-motion';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import menu from '../../public/menu.json';
import { Link } from './ui/Link';

interface OverflowMobileMenuProps {
  animate: boolean;
  setAnimate: Dispatch<SetStateAction<boolean>>
}

function OverflowMobileMenu({ animate, setAnimate }: OverflowMobileMenuProps) {
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenHeight(window.screen.availHeight);
    }
  }, []);

  if (!screenHeight) return null;

  return (
    <motion.div
      className="absolute z-30 bottom-0 left-0 w-screen bg-white"
      initial={!animate
        ? { top: 0, bottom: 0, height: screenHeight }
        : { top: 0, bottom: screenHeight, height: 0 }}
      animate={!animate
        ? { top: screenHeight, bottom: 0, height: 0 }
        : { top: 0, bottom: 0, height: screenHeight }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      { animate ? (
        <motion.div
          className="mt-24 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.25, ease: 'easeInOut' }}
        >
          <ul>
            <li>
              <a
                href="#about"
                onClick={() => setAnimate(false)}
                className="uppercase text-3xl font-light leading-loose tracking-widest"
              >
                Aboute me
              </a>
            </li>
            <li>
              <a
                href="#work"
                onClick={() => setAnimate(false)}
                className="uppercase text-3xl font-light leading-loose tracking-widest"
              >
                Work
              </a>
            </li>
            <li>
              <a
                href="#talk"
                onClick={() => setAnimate(false)}
                className="uppercase text-3xl font-light leading-loose tracking-widest"
              >
                Let`s Talk
              </a>
            </li>
          </ul>
        </motion.div>
      ) : null }

    </motion.div>
  );
}

export function Header() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animate, setAnimate] = useState(false);
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    if (animate) {
      lottieRef.current?.setDirection(1);
      lottieRef.current?.goToAndPlay(30, true);
    } else {
      lottieRef.current?.setDirection(-1);
      lottieRef.current?.goToAndPlay(60, true);
    }
  }, [animate]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  return (
    <>
      <header className="absolute z-40 flex top-0 w-screen justify-between items-center h-24 px-2 md:px-8 lg:px-16 bg-transparent">
        <a
          href="/"
          className="gold-text text-2xl md:text-3xl lg:text-4xl font-light"
        >
          F ─ L ©
        </a>

        {pathname === '/' ? (
          <>
            <button
              className="flex md:hidden w-10 h-10 items-center justify-center"
              onClick={() => {
                setAnimate((prevState) => !prevState);
              }}
            >
              <Lottie
                lottieRef={lottieRef}
                className="w-full h-full"
                animationData={menu}
                autoplay={false}
                loop={false}
              />
            </button>

            <nav className="hidden md:flex">
              <ul className="flex gap-6">
                <li>
                  <Link
                    className="text-base md:text-lg lg:text-xl font-extralight"
                    href="#about"
                    title="About me"
                  />
                </li>
                <li>
                  <Link
                    className="text-base md:text-lg lg:text-xl font-extralight"
                    href="#work"
                    title="Work"
                  />
                </li>
                <li>
                  <Link
                    className="text-base md:text-lg lg:text-xl font-extralight"
                    href="#talk"
                    title={"Let's talk"}
                  />
                </li>
              </ul>
            </nav>
          </>
        ) : null}

      </header>

      <OverflowMobileMenu animate={animate} setAnimate={setAnimate} />
    </>
  );
}
