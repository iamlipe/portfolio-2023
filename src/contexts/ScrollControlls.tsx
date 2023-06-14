'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { ReactNode, createContext, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export type ScrollControlsProps = {
  eps?: number
  horizontal?: boolean
  infinite?: boolean
  pages?: number
  distance?: number
  damping?: number
  enabled?: boolean
  children: ReactNode
};

export type ScrollControlsState = {
  el: HTMLDivElement
  eps: number
  fill: HTMLDivElement
  fixed: HTMLDivElement
  horizontal: boolean | undefined
  damping: number
  offset: number
  delta: number
  pages: number
  range: (from: number, distance: number, margin?: number) => number;
  curve: (from: number, distance: number, margin?: number) => number;
  visible: (from: number, distance: number, margin?: number) => boolean;
};

export const ScrollControllContext = createContext<ScrollControlsState>(null!);

export function ScrollControls(props: ScrollControlsProps) {
  const { children, damping = 4, distance = 1, enabled = true, eps = 0.00001, horizontal, infinite, pages = 1 } = props;
  const { gl, size, invalidate, events } = useThree();
  const [el] = useState(() => document.createElement('div'));
  const [fill] = useState(() => document.createElement('div'));
  const [fixed] = useState(() => document.createElement('div'));
  const target = gl.domElement.parentNode!;
  const scroll = useRef(0);

  const state = useMemo(() => {
    function range(from: number, margin: number = 0) {
      const start = from - margin;
      const end = start + distance + margin * 2;

      if (start > 0 && end < 0) return 1;

      return (0 - start) / (end - start);
    }

    function curve(from: number, margin: number = 0) {
      return Math.sin(range(from, margin) * Math.PI);
    }

    function visible(from: number, margin: number = 0) {
      const start = from - margin;
      const end = start + distance + margin * 2;
      return start <= 0 && end >= 0;
    }

    return { el, eps, fill, fixed, horizontal, damping, offset: 0, delta: 0, scroll, pages, range, curve, visible };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eps, damping, horizontal, pages]);

  useEffect(() => {
    el.style.position = 'absolute';
    el.style.width = '100%';
    el.style.height = '100%';
    el.style[horizontal ? 'overflowX' : 'overflowY'] = 'auto';
    el.style[horizontal ? 'overflowY' : 'overflowX'] = 'hidden';
    el.style.top = '0px';
    el.style.left = '0px';

    fixed.style.position = 'sticky';
    fixed.style.top = '0px';
    fixed.style.left = '0px';
    fixed.style.width = '100%';
    fixed.style.height = '100%';
    fixed.style.overflow = 'hidden';
    el.appendChild(fixed);

    fill.style.height = horizontal ? '100%' : `${pages * distance * 100}%`;
    fill.style.width = horizontal ? `${pages * distance * 100}%` : '100%';
    fill.style.pointerEvents = 'none';
    el.appendChild(fill);
    target.appendChild(el);

    // Init scroll one pixel in to allow upward/leftward scroll
    el[horizontal ? 'scrollLeft' : 'scrollTop'] = 1;

    const oldTarget = typeof events.connected !== 'boolean' ? events.connected : gl.domElement;
    requestAnimationFrame(() => events.connect?.(el));

    return () => {
      target.removeChild(el);
      events.connect?.(oldTarget);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages, distance, horizontal, el, fill, fixed, target]);

  useEffect(() => {
    const containerLength = size[horizontal ? 'width' : 'height'];
    const scrollLength = el[horizontal ? 'scrollWidth' : 'scrollHeight'];
    const scrollThreshold = scrollLength - containerLength;

    let current = 0;
    let disableScroll = true;
    let firstRun = true;

    const onScroll = () => {
      // Prevent first scroll because it is indirectly caused by the one pixel offset
      if (!enabled || firstRun) return;
      invalidate();
      current = el[horizontal ? 'scrollLeft' : 'scrollTop'];
      scroll.current = current / scrollThreshold;
      if (infinite) {
        if (!disableScroll) {
          if (scroll.current >= 1 - 0.001) {
            const damp = 1 - state.offset;
            el[horizontal ? 'scrollLeft' : 'scrollTop'] = 1;
            scroll.current = state.offset = -damp;
            disableScroll = true;
          } else if (current <= 0) {
            const damp = 1 + state.offset;
            el[horizontal ? 'scrollLeft' : 'scrollTop'] = scrollLength;
            scroll.current = state.offset = damp;
            disableScroll = true;
          }
        }

        if (disableScroll) {
          setTimeout(() => {
            disableScroll = false;
          }, 40);
        }
      }
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(() => {
      firstRun = false;
    });

    const onWheel = (e: any) => {
      el.scrollLeft += e.deltaY / 2;
    };

    if (horizontal) el.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      el.removeEventListener('scroll', onScroll);
      if (horizontal) el.removeEventListener('wheel', onWheel);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el, size, infinite, state, invalidate, horizontal]);

  let last = 0;

  useFrame((_, delta) => {
    state.offset = THREE.MathUtils.damp((last = state.offset), scroll.current, damping, delta);
    state.delta = THREE.MathUtils.damp(state.delta, Math.abs(last - state.offset), damping, delta);
    if (state.delta > eps) invalidate();
  });

  return <ScrollControllContext.Provider value={state}>{children}</ScrollControllContext.Provider>;
}
