'use client';

import { useLoading } from '@/hooks/useLoading';
import { Cloud, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ReactNode, Suspense, useEffect } from 'react';

function Clouds() {
  return (
    <group>
      <ambientLight intensity={1.4} />
      <pointLight intensity={8} position={[0, 0, -1000]} />

      <Suspense>
        <Cloud position={[-4, -4, -80]} speed={0.1} opacity={1} color="white" />
        <Cloud position={[4, 0, -120]} speed={0.1} opacity={0.5} color="white" />
        <Cloud position={[0, 4, -100]} speed={0.1} opacity={1} color="white" />
        <Cloud position={[8, -4, -110]} speed={0.1} opacity={0.5} color="white" />
        <Cloud position={[2, -4, -140]} speed={0.1} opacity={0.75} color="white" />
      </Suspense>

      <Sky distance={1000} sunPosition={[0, 4, 0]} inclination={0} azimuth={0.2} />
    </group>
  );
}

interface ProviderProps {
  children: ReactNode;
}

export function WorkBackground({ children }: ProviderProps) {
  const { setIsLoading, isLoading } = useLoading();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return null;

  return (
    <>
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
        <Clouds />
      </Canvas>

      <div className="absolute top-0 left-0">
        {children}
      </div>
    </>
  );
}
