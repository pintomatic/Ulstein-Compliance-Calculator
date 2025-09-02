import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { InfoIconTooltip } from './info-icon-tooltip';
import { explainerContent } from '@/lib/explainer-content';

const timelineData = [
  {
    year: 'CII 2023',
    title: 'Efficiency ratings',
    description: 'Charter-rate downgrade risk',
  },
  {
    year: 'EU ETS 2024',
    title: '€85/t allowances due Q1-2025',
    description: 'Direct financial impact on voyages',
  },
  {
    year: 'FuelEU 2025',
    title: 'Green-fuel quotas',
    description: 'E-fuel cost uplift and compliance complexity',
  },
];

export function TimelineSection() {
  const explainerData = explainerContent.find(b => b.id === 'timeline');

  return (
    <section id="timeline" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {explainerData && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl flex items-center justify-center gap-2">
                Regulatory Pressure Timeline
                <InfoIconTooltip
                  blockId={explainerData.id}
                  tooltipText={explainerData.microcopy}
                />
              </h2>
            </div>
          )}
        <div className="grid md:grid-cols-3 gap-8">
          {timelineData.map((item) => (
            <div key={item.year} className="flex items-start space-x-4">
               <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">{item.year}</p>
                <h3 className="text-lg font-bold mt-1">{item.title}</h3>
                <p className="text-muted-foreground mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
