'use client';

import { ScrollControllContext } from '@/contexts/ScrollControlls';
import { useScroll } from '@/hooks/useScroll';
import { context as fiberContext, useFrame, useThree } from '@react-three/fiber';
import { ReactNode, StyleHTMLAttributes, forwardRef, useContext, useRef } from 'react';
import { render } from 'react-dom';
import { mergeRefs } from 'react-merge-refs';
import { Group } from 'three';

interface ScrollCanvasProps {
  children: ReactNode;
}

const ScrollCanvas = forwardRef<any, ScrollCanvasProps>(({ children }, ref) => {
  const group = useRef<Group>(null!);
  const state = useScroll();

  const { width, height } = useThree((el) => el.viewport);

  useFrame(() => {
    group.current.position.x = state.horizontal ? -width * (state.pages - 1) * state.offset : 0;
    group.current.position.y = state.horizontal ? 0 : height * (state.pages - 1) * state.offset;
  });
  return <group ref={mergeRefs([ref, group])}>{children}</group>;
});

interface ScrollHtmlProps {
  children?: ReactNode;
  style?: StyleHTMLAttributes<any>;
}

const ScrollHtml = forwardRef<any, ScrollHtmlProps>(({ children, style, ...props }, ref) => {
  const { width, height } = useThree((el) => el.size);
  const state = useScroll();
  const group = useRef<HTMLDivElement>(null!);
  const fiberState = useContext(fiberContext);

  useFrame(() => {
    if (state.delta > state.eps) {
      group.current.style.transform = `translate3d(${state.horizontal ? -width * (state.pages - 1) * state.offset : 0}px,${
        state.horizontal ? 0 : height * (state.pages - 1) * -state.offset
      }px,0)`;
    }
  });

  render(
    <div ref={mergeRefs([ref, group])} className="absolute top-0 left-0 will-change-transform" style={{ ...style }} {...props}>
      <ScrollControllContext.Provider value={state}>
        <fiberContext.Provider value={fiberState}>{children}</fiberContext.Provider>
      </ScrollControllContext.Provider>
    </div>,
    state.fixed,
  );

  return null;
});

type ScrollProps = {
  html?: boolean
  children?: ReactNode
};

export const Scroll = forwardRef<any, ScrollProps>(({ html, children, ...props }, ref) => {
  if (html) return <ScrollHtml ref={ref} {...props}>{children}</ScrollHtml>;

  return <ScrollCanvas ref={ref} {...props}>{children}</ScrollCanvas>;
});
