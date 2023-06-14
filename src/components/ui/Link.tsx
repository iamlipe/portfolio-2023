'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AnchorHTMLAttributes, useCallback, useState } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  title: string;
}

export function Link({ href, title, onMouseEnter, onMouseLeave, className, ...rest }: LinkProps) {
  const [width, setWidth] = useState(0);

  const handleMouseEnter = useCallback((event: any) => {
    setWidth(100);

    if (onMouseEnter) onMouseEnter(event);
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback((event: any) => {
    setWidth(0);

    if (onMouseLeave) onMouseLeave(event);
  }, [onMouseLeave]);

  return (
    <div className="flex flex-col">
      <a
        className={cn('uppercase text-lg', className)}
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {title}
      </a>

      <motion.div
        className="h-[2px] bg-black"
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
      />
    </div>
  );
}
