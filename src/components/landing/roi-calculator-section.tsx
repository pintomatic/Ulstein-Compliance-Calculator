'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CountUp } from '@/components/count-up';

export function RoiCalculatorSection() {
  const [dailyFuel, setDailyFuel] = useState(35);
  const [fuelPrice, setFuelPrice] = useState(650);
  const [fleetSize, setFleetSize] = useState(5);

  const paybackMonths = 2;
  const npvSaved = 6002813;
  const fuelEfficiencyImprovement = 3;

  return (
    <section id="roi-calculator" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">ROI Calculator</h2>
            <p className="text-muted-foreground md:text-xl">
              See your potential savings. Enter your fleet's numbers to calculate your return on investment.
            </p>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="daily-fuel">Daily Fuel (t)</Label>
                    <Input id="daily-fuel" type="number" value={dailyFuel} onChange={e => setDailyFuel(Number(e.target.value))} />
                  </div>
                  <div>
                    <Label htmlFor="fuel-price">Fuel Price ($)</Label>
                    <Input id="fuel-price" type="number" value={fuelPrice} onChange={e => setFuelPrice(Number(e.target.value))} />
                  </div>
                  <div>
                    <Label htmlFor="fleet-size">Fleet Size</Label>
                    <Input id="fleet-size" type="number" value={fleetSize} onChange={e => setFleetSize(Number(e.target.value))} />
                  </div>
                </div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm text-primary hover:no-underline">Use my real numbers</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid sm:grid-cols-3 gap-4 pt-4">
                        <div>
                          <Label htmlFor="avg-speed">Avg Speed</Label>
                          <Input id="avg-speed" placeholder="e.g., 15 knots" />
                        </div>
                        <div>
                          <Label htmlFor="engine-type">Engine Type</Label>
                          <Input id="engine-type" placeholder="e.g., 2-stroke" />
                        </div>
                        <div>
                          <Label htmlFor="co2-factor">CO₂ Factor</Label>
                          <Input id="co2-factor" placeholder="e.g., 3.114" />
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
                      <CountUp end={npvSaved} prefix="€" />
                    </CardContent>
                </Card>
            </div>
            <p className="text-center text-muted-foreground">
              Based on {fuelEfficiencyImprovement}% fuel-efficiency improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
