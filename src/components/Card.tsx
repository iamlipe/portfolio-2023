'use client';

import Image from 'next/image';
import { AnchorHTMLAttributes, useMemo } from 'react';

interface CardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  index: number;
  image: string;
  title: string;
  description: string;
}

export function Card({ index, image, title, description, ...rest }: CardProps) {
  const size = useMemo(() => {
    if (window.screen.availWidth >= 768 && window.screen.availWidth < 1024) {
      return 100;
    } if (window.screen.availWidth >= 1024) {
      return 120;
    }

    return 80;
  }, []);

  return (
    <a href="/" className="w-1/2 h-[74%]" {...rest}>
      <div className="w-full h-[30%] flex items-center justify-center">
        <Image src={image} alt="chat-messaging" width={size} height={size} />
      </div>
      <div className="flex flex-col gap-4 relative w-full h-full p-1 tracking-wider leading-tight">
        <span className="text-base lg:text-lg xl:text-xl font-light tracking-wider leading-tight underline text-slate-800">
          ⌗00
          {index + 1}
        </span>
        <div className="flex relative flex-col h-full justify-between">
          <p className="line-clamp-4 font-extralight text-xs lg:text-sm xl:text-base tracking-wider leading-tight text-slate-800">{description}</p>
          <h4 className="absolute uppercase top-[74%] -left-24 text-2xl md:text-3xl lg:text-4xl -rotate-90 w-60 text-start whitespace-nowrap text-slate-800">{title}</h4>
        </div>
      </div>
    </a>
  );
}
