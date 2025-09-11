import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Cloud, LayoutDashboard } from 'lucide-react';
import { InfoIconTooltip } from './info-icon-tooltip';
import { explainerContent } from '@/lib/explainer-content';

const steps = [
  {
    icon: Package,
    title: 'Factory-installed BLUE BOX™',
    description: 'Hardware integrated during construction for seamless data collection.',
    image: 'https://picsum.photos/seed/5/600/400',
    aiHint: 'server rack ship'
  },
  {
    icon: Cloud,
    title: 'Secure cloud verification',
    description: 'DNV Veracity cloud platform with certified data pipeline.',
    image: 'https://picsum.photos/seed/6/600/400',
    aiHint: 'cloud data'
  },
  {
    icon: LayoutDashboard,
    title: 'Live compliance & fuel dashboard',
    description: 'Real-time monitoring with automated regulatory reporting.',
    image: 'https://picsum.photos/seed/7/600/400',
    aiHint: 'dashboard analytics'
  },
];

export function HowItWorksSection() {
  const explainerData = explainerContent.find(b => b.id === 'how-it-works');

  return (
    <section id="how-it-works" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl flex items-center justify-center gap-2">
            How It Works
            {explainerData && (
              <InfoIconTooltip
                blockId={explainerData.id}
                tooltipText={explainerData.microcopy}
              />
            )}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            A simple three-step process from hardware to insights.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center flex flex-col">
              <CardHeader className="items-center">
                 <div className="flex-shrink-0 mb-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                 <Image src={step.image} alt={step.title} width={600} height={400} className="rounded-lg object-cover aspect-[3/2] mb-4" data-ai-hint={step.aiHint} loading="lazy" />
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
