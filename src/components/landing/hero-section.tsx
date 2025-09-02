import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { InfoIconTooltip } from './info-icon-tooltip';
import { explainerContent } from '@/lib/explainer-content';

export function HeroSection() {
  const explainerData = explainerContent.find(b => b.id === 'hero');

  return (
    <section id="home" className="relative w-full py-24 md:py-32 lg:py-40 bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/1920x1080.png?text= ')", backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0,32,63,0.7)'}} data-ai-hint="ship ocean">
      <div className="container mx-auto px-4 md:px-6 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight !text-white flex items-center justify-center gap-2">
            EU ETS fines can drain $1.3m per ship.
            {explainerData && (
              <InfoIconTooltip
                blockId={explainerData.id}
                tooltipText={explainerData.microcopy}
                className="text-white"
              />
            )}
          </h1>
          <p className="mt-4 text-2xl md:text-3xl lg:text-4xl font-semibold !text-primary">
            Stop paying for exhaust.
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-200/90">
            Ulstein Digital installs a class-verified data spine before launch—compliance becomes a one-click task.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary">
              <Link href="#ets-calculator">
                Calculate My ETS Cost <ArrowDown className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
