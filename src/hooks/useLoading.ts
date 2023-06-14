import { LoadingContext } from '@/contexts/Loading';
import { useContext } from 'react';

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) throw Error('Not have context');

  return context;
}
