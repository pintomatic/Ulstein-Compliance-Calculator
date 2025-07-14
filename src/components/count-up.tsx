'use client';

import { useEffect, useState, useRef } from 'react';

type CountUpProps = {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('fr-FR').format(Math.round(num));
};

export const CountUp = ({ end, duration = 800, prefix = '', suffix = '', className }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(step);
      }
    };
    animationFrameId.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId.current as number);
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};
