import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { InfoIconTooltip } from './info-icon-tooltip';
import { explainerContent } from '@/lib/explainer-content';
import imageData from '@/lib/placeholder-images.json';

export function HeroSection() {
  const explainerData = explainerContent.find(b => b.id === 'hero');
  return (
    <section id="hero" className="relative w-full py-24 md:py-32 lg:py-40 bg-cover bg-center" style={{backgroundImage: `url('${imageData.hero.src}')`, backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0,32,63,0.7)'}} data-ai-hint={imageData.hero.aiHint}>
      <div className="container mx-auto px-4 md:px-6 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight !text-white flex items-center justify-center gap-2">
            Stop paying for exhaust. Make ETS compliance a one-click task.
            {explainerData && (
              <InfoIconTooltip
                blockId={explainerData.id}
                tooltipText={explainerData.microcopy}
              />
            )}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-200/90">
            Ulstein Digital installs a class-verified data spine before launch—compliance becomes a one-click task. All figures on this page shown in USD for clarity.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="#ets-calculator">
                Calculate My ETS Cost <ArrowDown className="ml-2 h-4 w-4" />
              </Link>
            </Button>
             <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#audit-cta">Book a 20-minute Fleet Audit</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
