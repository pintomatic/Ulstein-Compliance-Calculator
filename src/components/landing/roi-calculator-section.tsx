'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CountUp } from '@/components/count-up';
import { trackGtmEvent } from '@/lib/gtm';
import { InfoIconTooltip } from './info-icon-tooltip';
import { explainerContent } from '@/lib/explainer-content';

const formatNpv = (npv: number) => {
  if (npv < 500000) {
    return npv.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return Math.round(npv).toLocaleString('fr-FR');
};


export function RoiCalculatorSection() {
  const [dailyFuel, setDailyFuel] = useState(35);
  const [fuelPrice, setFuelPrice] = useState(650);
  const [fleetSize, setFleetSize] = useState(5);

  const paybackMonths = 2;
  
  const explainerData = explainerContent.find(b => b.id === 'roi-calculator');

  const npvSaved = useMemo(() => {
    // A simple calculation based on inputs, replace with real formula if needed
    const dailySavings = (dailyFuel * 0.03) * fuelPrice * fleetSize;
    const yearlySavings = dailySavings * 365;
    // Simplified NPV calculation for demonstration
    const discountRate = 0.05;
    let totalNpv = 0;
    for (let i = 1; i <= 5; i++) {
        totalNpv += yearlySavings / Math.pow(1 + discountRate, i);
    }
    return totalNpv;
  }, [dailyFuel, fuelPrice, fleetSize]);

  
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Keep last valid value if field is emptied
    if (value !== '' && !isNaN(Number(value))) {
        setter(Number(value));
    }
    trackGtmEvent({ event: 'roi_calc_submit' });
  };

  const formattedNpv = useMemo(() => {
     if (npvSaved < 500000) {
      return npvSaved.toFixed(2);
    }
    return Math.round(npvSaved);
  }, [npvSaved]);


  return (
    <section id="roi-calculator" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center gap-2">
              ROI Calculator
              {explainerData && (
                <InfoIconTooltip
                  blockId={explainerData.id}
                  tooltipText={explainerData.microcopy}
                />
              )}
            </h2>
            <p className="text-muted-foreground md:text-xl">
              See your potential savings. Enter your fleet's numbers to calculate your return on investment.
            </p>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="daily-fuel">Daily Fuel (t)</Label>
                    <Input id="daily-fuel" type="number" value={dailyFuel} onChange={handleInputChange(setDailyFuel)} />
                  </div>
                  <div>
                    <Label htmlFor="fuel-price">Fuel Price ($)</Label>
                    <Input id="fuel-price" type="number" value={fuelPrice} onChange={handleInputChange(setFuelPrice)} />
                  </div>
                  <div>
                    <Label htmlFor="fleet-size">Fleet Size</Label>
                    <Input id="fleet-size" type="number" value={fleetSize} onChange={handleInputChange(setFleetSize)} />
                  </div>
                </div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm text-primary hover:no-underline">Use my real numbers</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid sm:grid-cols-3 gap-4 pt-4">
                        <div>
                          <Label htmlFor="avg-speed">Avg Speed</Label>
                          <Input id="avg-speed" placeholder="e.g., 15 knots" readOnly className="bg-muted-foreground/10"/>
                        </div>
                        <div>
                          <Label htmlFor="engine-type">Engine Type</Label>
                          <Input id="engine-type" placeholder="e.g., 2-stroke" readOnly className="bg-muted-foreground/10"/>
                        </div>
                        <div>
                          <Label htmlFor="co2-factor">CO₂ Factor</Label>
                          <Input id="co2-factor" placeholder="e.g., 3.114" readOnly className="bg-muted-foreground/10"/>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <Card className="text-center">
                    <CardHeader><CardTitle>Payback Months</CardTitle></CardHeader>
                    <CardContent className="text-5xl font-extrabold text-primary">
                      <CountUp end={paybackMonths} />
                    </CardContent>
                </Card>
                <Card className="text-center col-span-2 sm:col-span-1">
                    <CardHeader><CardTitle>5-Year NPV Saved</CardTitle></CardHeader>
                    <CardContent className="text-5xl font-extrabold text-primary">
                      <CountUp end={Number(formattedNpv)} prefix="€" />
                    </CardContent>
                </Card>
            </div>
            <p className="text-center text-muted-foreground">
              Based on 3% fuel-efficiency improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
