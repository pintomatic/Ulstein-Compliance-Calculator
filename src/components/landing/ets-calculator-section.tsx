'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CountUp } from '@/components/count-up';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ALLOWANCE_PRICE_EUR, ETS_CAGR, formatMoney, EUR_TO_USD } from '@/lib/currency';
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
  const [etsPriceEur, setEtsPriceEur] = useState(ALLOWANCE_PRICE_EUR);
  const [fxRate, setFxRate] = useState(EUR_TO_USD);
  const [escalationRate, setEscalationRate] = useState(ETS_CAGR);
  
  const explainerData = explainerContent.find(b => b.id === 'ets-calculator');

  const allowancePriceUsd = useMemo(() => etsPriceEur * fxRate, [etsPriceEur, fxRate]);

  const allowanceBill = useMemo(() => {
    const rawBill = co2Emissions * allowancePriceUsd;
    return Math.round(rawBill / 50) * 50;
  }, [co2Emissions, allowancePriceUsd]);

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
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
              Interactive ETS Cost Calculator
              {explainerData && (
                <InfoIconTooltip
                  blockId={explainerData.id}
                  tooltipText={explainerData.microcopy}
                />
              )}
            </CardTitle>
            <CardDescription className="pt-2">Estimate your fleet&apos;s exposure to carbon costs.</CardDescription>
          </CardHeader>
          <CardContent className="px-4 md:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Column: Inputs */}
              <div className="space-y-8">
                <div className="space-y-4">
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
                  <div className="flex justify-between text-sm text-muted-foreground mt-1 px-1">
                    <span>4,000 t</span>
                    <span className="font-bold text-lg text-foreground">{formatNumberWithThinSpace(co2Emissions)} t</span>
                    <span>40,000 t</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ets-price-eur">ETS price (€/t CO₂)</Label>
                    <Input id="ets-price-eur" type="number" value={etsPriceEur} onChange={(e) => setEtsPriceEur(Number(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fx-rate">FX rate (USD/EUR)</Label>
                    <Input id="fx-rate" type="number" value={fxRate} onChange={(e) => setFxRate(Number(e.target.value))} />
                  </div>
                </div>
                 <div className="text-sm text-center text-muted-foreground -mt-4">
                  Computed price (USD/t CO₂): {formatMoney(allowancePriceUsd, { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>

                 <div className="space-y-3">
                  <Label className="text-sm font-medium text-muted-foreground">Escalation Rate (CAGR)</Label>
                  <div className="flex gap-2">
                    {escalationPresets.map(preset => (
                      <Button 
                        key={preset.label} 
                        variant={escalationRate === preset.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setEscalationRate(preset.value)}
                        className="px-3 py-1 text-xs"
                      >
                        {preset.label} ({(preset.value * 100).toFixed(1)}%)
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Outputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                <div className="bg-primary/10 p-6 rounded-lg flex flex-col justify-center text-center min-h-[180px]">
                  <p className="text-lg font-medium text-primary">Allowance Bill ($/year)</p>
                  <div className="text-4xl md:text-5xl font-extrabold text-primary my-2">
                     <CountUp end={allowanceBill} prefix="$" isMoney={true} />
                  </div>
                   <p className="text-xs text-primary/80">Based on inputs at left</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-lg font-medium text-primary text-center mb-2">5-Year Projection</p>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={projectionData} margin={{ top: 5, right: 25, left: 25, bottom: 5 }}>
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
              Assumptions: ETS settled in EUR. Source price shown in EUR; bill displayed in USD using FX above. Escalation is a market scenario, not guidance.
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
