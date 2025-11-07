'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-right' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function AnimateOnScroll({ 
  children, 
  animation = 'fade', 
  delay = 0,
  duration = 600,
  className 
}: AnimateOnScrollProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animations = {
    fade: 'animate-fade-in',
    'slide-up': 'animate-slide-up',
    'slide-right': 'animate-slide-in-right',
    scale: 'animate-scale-in',
  };

  return (
    <div
      ref={ref}
      className={clsx(
        'transition-opacity',
        inView ? animations[animation] : 'opacity-0',
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
