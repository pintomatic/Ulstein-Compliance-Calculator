'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { CountUp } from '@/components/count-up';
import { trackGtmEvent } from '@/lib/gtm.ts';

const formatNumberWithThinSpace = (num: number): string => {
  return new Intl.NumberFormat('fr-FR').format(Math.round(num));
};

const roundToNearest50 = (num: number) => {
  return Math.round(num / 50) * 50;
};

export function EtsCalculatorSection() {
  const [co2Emissions, setCo2Emissions] = useState(15000);
  const allowancePrice = 90.95; // € per ton of CO2
  const allowanceBill = roundToNearest50(co2Emissions * allowancePrice);

  const handleSliderChange = (value: number[]) => {
    setCo2Emissions(value[0]);
    trackGtmEvent({ event: 'calc_slider_interact' });
  };

  return (
    <section id="ets-calculator" className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Interactive ETS Cost Slider</CardTitle>
          </CardHeader>
          <CardContent className="px-8 md:px-12 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <label htmlFor="co2-slider" className="block text-sm font-medium text-muted-foreground">
                  Annual CO₂ Emissions (tonnes)
                </label>
                <Slider
                  id="co2-slider"
                  aria-label="Annual CO2 emissions in tonnes"
                  min={4000}
                  max={40000}
                  step={100}
                  value={[co2Emissions]}
                  onValueChange={handleSliderChange}
                  className="mt-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>4,000 t</span>
                  <span className="font-bold text-lg text-foreground">{formatNumberWithThinSpace(co2Emissions)} t</span>
                  <span>40,000 t</span>
                </div>
              </div>
              <div className="text-center bg-primary/10 p-6 rounded-lg">
                <p className="text-lg font-medium text-primary">Allowance Bill (€ / year)</p>
                <div className="text-4xl md:text-5xl font-extrabold text-primary mt-2">
                   <CountUp end={allowanceBill} prefix="€" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground w-full text-center">
              *Assumes allowance price escalation 7% CAGR.
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
