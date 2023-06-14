'use client';

import dynamic from 'next/dynamic';

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
});

export function Cursor() {
  return (
    <>
      <AnimatedCursor
        innerSize={0}
        outerSize={40}
        outerAlpha={0.2}
        outerScale={2}
        trailingSpeed={20}
        innerStyle={{ backgroundColor: 'black' }}
        showSystemCursor
        outerStyle={{
          width: 32,
          height: 32,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: 'black',
        }}
      />
    </>
  );
}
