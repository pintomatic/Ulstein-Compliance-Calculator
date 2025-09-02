'use client';

import { useEffect, useState, useRef } from 'react';
import { LOCALE, SYMBOL } from '@/lib/currency';

type CountUpProps = {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  isMoney?: boolean;
};

const formatNumber = (num: number, isMoney: boolean): string => {
  const roundedNum = Math.round(num);
  if (isMoney) {
    return new Intl.NumberFormat(LOCALE, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(roundedNum).replace(SYMBOL, ''); // Prefix is handled separately
  }
  return new Intl.NumberFormat(LOCALE).format(roundedNum);
};


export const CountUp = ({ end, duration = 800, prefix = '', suffix = '', className, isMoney = false }: CountUpProps) => {
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
      {prefix}{formatNumber(count, isMoney)}{suffix}
    </span>
  );
};
