'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let heroElement: HTMLElement | null;

    const calculateVisibility = () => {
      if (!heroElement) {
        heroElement = document.getElementById('home');
      }
      if (heroElement) {
        const heroBottom = heroElement.getBoundingClientRect().bottom;
        if (heroBottom < -20) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };
  
    const handleScroll = () => {
      calculateVisibility();

      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateVisibility(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const text = scrollDirection === 'down' ? 'Calculate ETS' : 'Book Audit';
  const href = scrollDirection === 'down' ? '#ets-calculator' : '#audit-cta';

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 transition-all duration-300',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
        <Link href={href}>
          {text} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
