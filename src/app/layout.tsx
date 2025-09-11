import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { GtmScript } from '@/lib/gtm.tsx';
import { CookieConsent } from '@/components/cookie-consent';
import imageData from '@/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'Ulstein Digital | Class-Verified EU ETS Compliance',
  description: 'Automate MRV, CII and EU ETS reporting. Cut CO₂ allowance cost and fuel burn with Ulstein Digital’s yard-installed BLUE BOX™.',
  openGraph: {
    title: 'Ulstein Digital | Class-Verified EU ETS Compliance',
    description: 'Automate MRV, CII and EU ETS reporting. Cut CO₂ allowance cost and fuel burn with Ulstein Digital’s yard-installed BLUE BOX™.',
    images: [
      {
        url: imageData.ogImage.src,
        width: imageData.ogImage.width,
        height: imageData.ogImage.height,
        alt: imageData.ogImage.alt,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <GtmScript />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Toaster />
        <CookieConsent />
      </body>
    </html>
  );
}
