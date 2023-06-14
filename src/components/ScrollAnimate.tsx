'use client';

import Lottie from 'lottie-react';
import groovyWalkAnimation from '../../public/scroll_down.json';

export function ScrollAnimate() {
  return (
    <Lottie animationData={groovyWalkAnimation} loop className="w-full h-full" />
  );
}
