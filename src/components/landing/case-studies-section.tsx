'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Badge } from '@/components/ui/badge';

const caseStudies = [
  {
    vessel: 'PSV Ulstein SX190',
    stats: [
      { value: '3%', label: 'Fuel Cut' },
      { value: '1.5h', label: 'MRV Close' },
      { value: '8-month', label: 'Payback' },
    ],
    details: 'Admin time 40 h → 1.5 h/quarter',
    certificate: 'DNV certificate on file',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'platform supply vessel',
  },
  {
    vessel: 'OSV Ulstein PX121',
    stats: [
      { value: '4%', label: 'Fuel Cut' },
      { value: '1.2h', label: 'MRV Close' },
      { value: '6-month', label: 'Payback' },
    ],
    details: 'Achieved compliance with zero downtime',
    certificate: 'DNV certificate on file',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'offshore supply vessel',
  },
  {
    vessel: 'Construction Vessel CX102',
    stats: [
      { value: '5%', label: 'Fuel Cut' },
      { value: '1.0h', label: 'MRV Close' },
      { value: '7-month', label: 'Payback' },
    ],
    details: 'Optimized for complex operational profiles',
    certificate: 'DNV certificate on file',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'construction vessel',
  },
];

export function CaseStudiesSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full"
          opts={{ loop: true }}
        >
          <CarouselContent className="-ml-4">
            {caseStudies.map((study, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <Image
                        src={study.image}
                        alt={study.vessel}
                        width={600}
                        height={400}
                        className="rounded-t-lg object-cover aspect-[3/2]"
                        data-ai-hint={study.aiHint}
                      />
                      <CardTitle className="mt-4">{study.vessel}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="grid grid-cols-3 gap-4 text-center mb-4">
                        {study.stats.map(stat => (
                          <div key={stat.label}>
                            <p className="text-2xl font-bold text-primary">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-center">{study.details}</p>
                    </CardContent>
                    <CardFooter>
                      <Badge variant="secondary" className="mx-auto">{study.certificate}</Badge>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-24px] scale-125" />
          <CarouselNext className="absolute right-[-24px] scale-125" />
        </Carousel>
      </div>
    </section>
  );
}
