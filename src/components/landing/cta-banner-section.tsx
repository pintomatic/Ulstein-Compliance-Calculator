'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { trackGtmEvent } from '@/lib/gtm.ts';

export function CtaBannerSection() {
  const handleDownloadClick = () => {
    trackGtmEvent({ event: 'checklist_download' });
  };
  return (
    <section id="audit-cta" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold !text-primary-foreground">Ready to slash compliance cost?</h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => trackGtmEvent({ event: 'audit_form_submit' })} aria-label="Book fleet audit">
              <Link href="#">Book 20-min Fleet Audit</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-primary hover:bg-accent hover:text-accent-foreground border-primary-foreground text-primary-foreground" onClick={handleDownloadClick} aria-label="Download compliance checklist">
              <a href="/Ulstein_Compliance_Checklist_v1.0.pdf" download>
                Download Compliance Checklist (PDF) <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          <p className="mt-4 text-xs text-primary-foreground/80">No spam – 1 PDF, instant download.</p>
        </div>
      </div>
    </section>
  );
}
