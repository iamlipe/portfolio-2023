'use client';

import { ScrollControls } from '@/contexts/ScrollControlls';
import { useLoading } from '@/hooks/useLoading';
import { Cloud, Preload, Sky, Text } from '@react-three/drei';
import { Canvas, Vector3 } from '@react-three/fiber';
import { ReactNode, Suspense, useEffect, useMemo, useState } from 'react';
import { Scroll } from '../components/ui/ScrollControlls';

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
        <Cloud position={[36, 8, -200]} speed={0.1} opacity={1} color="white" />
        <Cloud position={[44, 6, -180]} speed={0.1} opacity={0.5} color="white" />
        <Cloud position={[40, 8, -220]} speed={0.1} opacity={1} color="white" />
        <Cloud position={[32, 10, -190]} speed={0.1} opacity={0.5} color="white" />
        <Cloud position={[40, 4, -230]} speed={0.1} opacity={0.75} color="white" />
      </Suspense>

      <Sky distance={1000} sunPosition={[0, 4, 0]} inclination={0} azimuth={0.2} />
    </group>
  );
}

interface ProviderProps {
  children: ReactNode;
}

export function HomeBackground({ children }: ProviderProps) {
  const [pages, setPages] = useState(0);
  const { setIsLoading } = useLoading();

  const onLoad = () => {
    if (window.screen.availWidth >= 768 && window.screen.availWidth < 1024) {
      setTimeout(() => setPages(5), 1000);
    }

    if (window.screen.availWidth >= 1024) {
      setTimeout(() => setPages(4), 1000);
    }

    if (window.screen.availWidth < 768) {
      setTimeout(() => setPages(6), 1000);
    }

    setTimeout(() => { setIsLoading(false); }, 3000);
  };

  const resize = () => {
    if (window.screen.availWidth >= 768 && window.screen.availWidth < 1024 && pages !== 5) {
      window.location.reload();
    }

    if (window.screen.availWidth >= 1024 && pages !== 4) {
      window.location.reload();
    }

    if (window.screen.availWidth < 768 && pages !== 6) {
      window.location.reload();
    }
  };

  const positionAbout: Vector3 = useMemo(() => {
    if (pages === 6) return [2, -1, -10];
    if (pages === 5) return [4, -1, -10];

    return [6, -1, -10];
  }, [pages]);

  const positionWork: Vector3 = useMemo(() => {
    if (pages === 6) return [6, 1, -8];
    if (pages === 5) return [10, 1, -8];

    return [14, 1, -8];
  }, [pages]);

  const positionTalk: Vector3 = useMemo(() => {
    if (pages === 6) return [12, -2, -12];
    if (pages === 5) return [20, -2, -12];

    return [26, -2, -12];
  }, [pages]);

  const scaleAbout: Vector3 = useMemo(() => {
    if (pages === 6) return 0.4;
    if (pages === 5) return 0.6;

    return 0.8;
  }, [pages]);

  const scaleWork: Vector3 = useMemo(() => {
    if (pages === 6) return 0.6;
    if (pages === 5) return 0.8;

    return 1;
  }, [pages]);

  const scaleTalk: Vector3 = useMemo(() => {
    if (pages === 6) return 0.5;
    if (pages === 5) return 0.7;

    return 0.9;
  }, [pages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', onLoad);
      window.addEventListener('resize', resize);

      return function unMount() {
        window.removeEventListener('load', onLoad);
        window.removeEventListener('resize', resize);
      };
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  setTimeout(() => { setIsLoading(false); }, 3000);

  if (!pages) return null;

  return (

    <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
      <ScrollControls horizontal damping={1.2} pages={pages} distance={1}>
        <Scroll>
          <Clouds />
          <Text position={positionAbout} scale={scaleAbout}>
            {'ABOUT ME \n'}
            {'ABOUT ME \n'}
            {'ABOUT ME'}
          </Text>
          <Text position={positionWork} scale={scaleWork}>
            {'WORK \n'}
            {'WORK \n'}
            {'WORK'}
          </Text>
          <Text position={positionTalk} scale={scaleTalk}>
            {'LET\'S TALK \n'}
            {'LET\'S TALK \n'}
            {'LET\'S TALK'}
          </Text>
        </Scroll>

        <Scroll html>{children}</Scroll>
        <Preload />
      </ScrollControls>
    </Canvas>
  );
}
