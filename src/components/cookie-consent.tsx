'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary text-secondary-foreground p-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm z-50">
      <p>
        We use anonymised cookies for performance analytics only. 
        <Link href="/privacy-policy" className="underline hover:text-primary ml-1">Learn more</Link>.
      </p>
      <Button onClick={handleAccept} size="sm">Accept</Button>
    </div>
  );
}
