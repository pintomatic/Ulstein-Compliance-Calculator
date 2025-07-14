'use client';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const trackGtmEvent = (data: object) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ ...data });
  }
};
