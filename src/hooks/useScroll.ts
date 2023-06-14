import { ScrollControllContext } from '@/contexts/ScrollControlls';
import { useContext } from 'react';

export function useScroll() {
  const context = useContext(ScrollControllContext);

  if (!context) throw Error('Not have context');

  return context;
}
