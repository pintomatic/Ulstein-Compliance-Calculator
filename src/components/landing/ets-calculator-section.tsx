'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CountUp } from '@/components/count-up';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ALLOWANCE_PRICE_USD, ETS_CAGR, SYMBOL, formatMoney } from '@/lib/currency';
import { InfoIconTooltip } from './info-icon-tooltip';
import { explainerContent } from '@/lib/explainer-content';

const formatNumberWithThinSpace = (num: number): string => {
  return new Intl.NumberFormat('fr-FR').format(Math.round(num));
};

const escalationPresets = [
  { label: 'Short-term', value: 0.043 },
  { label: 'Base', value: 0.07 },
  { label: 'Stress', value: 0.125 },
];

export function EtsCalculatorSection() {
  const [co2Emissions, setCo2Emissions] = useState(15000);
  const [allowancePrice, setAllowancePrice] = useState(ALLOWANCE_PRICE_USD);
  const [escalationRate, setEscalationRate] = useState(ETS_CAGR);
  
  const explainerData = explainerContent.find(b => b.id === 'ets-calculator');

  const allowanceBill = useMemo(() => {
    const rawBill = co2Emissions * allowancePrice;
    return Math.round(rawBill / 50) * 50;
  }, [co2Emissions, allowancePrice]);

  const projectionData = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const year = new Date().getFullYear() + i;
      const cost = allowanceBill * Math.pow(1 + escalationRate, i);
      return { year, cost };
    });
  }, [allowanceBill, escalationRate]);

  return (
    <section id="ets-calculator" className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-5xl mx-auto shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
              Interactive ETS Cost Calculator
              {explainerData && (
                <InfoIconTooltip
                  blockId={explainerData.id}
                  tooltipText={explainerData.microcopy}
                />
              )}
            </CardTitle>
            <CardDescription>Estimate your fleet&apos;s exposure to carbon costs.</CardDescription>
          </CardHeader>
          <CardContent className="px-4 md:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {/* Inputs Column */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <Label htmlFor="co2-slider" className="text-sm font-medium text-muted-foreground">
                    Annual CO₂ Emissions (tonnes)
                  </Label>
                  <Slider
                    id="co2-slider"
                    aria-label="Annual CO2 emissions in tonnes"
                    min={4000}
                    max={40000}
                    step={100}
                    value={[co2Emissions]}
                    onValueChange={(val) => setCo2Emissions(val[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>4,000 t</span>
                    <span className="font-bold text-lg text-foreground">{formatNumberWithThinSpace(co2Emissions)} t</span>
                    <span>40,000 t</span>
                  </div>
                </div>
                <div>
                   <Label htmlFor="ets-price">ETS Allowance Price ({SYMBOL}/t CO₂)</Label>
                   <Input id="ets-price" type="number" value={allowancePrice} onChange={(e) => setAllowancePrice(Number(e.target.value))} />
                </div>
                 <div>
                  <Label className="text-sm font-medium text-muted-foreground">Escalation Rate (CAGR)</Label>
                  <div className="flex gap-2 mt-2">
                    {escalationPresets.map(preset => (
                      <Button 
                        key={preset.label} 
                        variant={escalationRate === preset.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setEscalationRate(preset.value)}
                      >
                        {preset.label} ({(preset.value * 100).toFixed(1)}%)
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Outputs Column */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="text-center bg-primary/10 p-6 rounded-lg flex flex-col justify-center">
                  <p className="text-lg font-medium text-primary">Allowance Bill ({SYMBOL}/year)</p>
                  <div className="text-4xl md:text-5xl font-extrabold text-primary mt-2">
                     <CountUp end={allowanceBill} prefix={SYMBOL} isMoney={true} />
                  </div>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-lg font-medium text-primary text-center mb-2">5-Year Projection</p>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                      <XAxis dataKey="year" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={false} />
                      <YAxis tickFormatter={(value) => formatMoney(value as number, { notation: 'compact' })} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={false} width={50} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius)',
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        formatter={(value) => [formatMoney(value as number), 'Cost']}
                      />
                      <Line type="monotone" dataKey="cost" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground w-full text-center">
              Assumptions: ETS settled in EUR; values shown in USD for budgeting. Escalation is a market scenario, not guidance.
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
