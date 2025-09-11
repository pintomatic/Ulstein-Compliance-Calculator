'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CountUp } from '@/components/count-up';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HelpCircle } from 'lucide-react';
import { DISCOUNT_RATE, SYMBOL, formatMoney, ALLOWANCE_PRICE_USD, MODULE_PRICING_USD } from '@/lib/currency';
import { cn } from '@/lib/utils';
import { InfoIconTooltip } from './info-icon-tooltip';
import { explainerContent } from '@/lib/explainer-content';


const InfoPopover = ({ content }: { content: React.ReactNode }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" size="icon" className="h-4 w-4 ml-2 text-muted-foreground cursor-help">
        <HelpCircle className="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-80 text-sm">{content}</PopoverContent>
  </Popover>
);

export function RoiCalculatorSection() {
  // Mode Toggles
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [includeSubscription, setIncludeSubscription] = useState(false);

  // Inputs
  const [annualFuel, setAnnualFuel] = useState(10000);
  const [fuelPrice, setFuelPrice] = useState(650);
  const [efficiencyGain, setEfficiencyGain] = useState(5);
  const [etsPrice, setEtsPrice] = useState(ALLOWANCE_PRICE_USD);
  const [emissionFactor, setEmissionFactor] = useState(3.2);
  const [discountRate, setDiscountRate] = useState(DISCOUNT_RATE);

  const { hardwareOneOff: hardwareCost, complianceCore: subscriptionCost } = MODULE_PRICING_USD;
  const explainerData = explainerContent.find(b => b.id === 'roi-calculator');

  // Calculations
  const calculations = useMemo(() => {
    const annualFuelCost = annualFuel * fuelPrice;
    const annualFuelSavings = annualFuelCost * (efficiencyGain / 100);
    const etsSaved = (annualFuel * (efficiencyGain / 100)) * emissionFactor * etsPrice;
    const totalAnnualSavings = annualFuelSavings + (isAdvancedMode ? etsSaved : 0);
    const netAnnualSavings = totalAnnualSavings - subscriptionCost;

    let paybackMonths = 0;
    if (netAnnualSavings > 0) {
      paybackMonths = hardwareCost / (netAnnualSavings / 12);
    }

    const npvSimple = Array.from({ length: 5 }).reduce((sum, _, i) => {
      return sum + annualFuelSavings / Math.pow(1 + discountRate, i + 1);
    }, 0);

    const npvFull = Array.from({ length: 5 }).reduce((sum, _, i) => {
        return sum + netAnnualSavings / Math.pow(1 + discountRate, i + 1);
    }, 0) - hardwareCost;

    let finalNpv = includeSubscription ? npvFull : npvSimple;

    if (finalNpv < 500000) {
        finalNpv = Math.round(finalNpv / 100) * 100;
    } else {
        finalNpv = Math.round(finalNpv);
    }


    return { annualFuelSavings, totalAnnualSavings, netAnnualSavings, paybackMonths, finalNpv };
  }, [annualFuel, fuelPrice, efficiencyGain, etsPrice, emissionFactor, discountRate, isAdvancedMode, includeSubscription, hardwareCost, subscriptionCost]);

  return (
    <section id="roi-calculator" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl flex items-center justify-center gap-2">
              Savings Calculator
              {explainerData && (
                <InfoIconTooltip
                  blockId={explainerData.id}
                  tooltipText={explainerData.microcopy}
                />
              )}
            </h2>
            <div className="flex items-center justify-center mt-4">
                <Label htmlFor="advanced-mode-switch" className="mr-2">Simple</Label>
                <Switch 
                    id="advanced-mode-switch" 
                    checked={isAdvancedMode} 
                    onCheckedChange={setIsAdvancedMode}
                    aria-label="Toggle advanced savings calculator mode"
                />
                <Label htmlFor="advanced-mode-switch" className="ml-2">Advanced</Label>
            </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* --- INPUTS --- */}
            <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Your Fleet Inputs</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="annual-fuel">Annual Fuel Consumption (t/year)</Label>
                        <Input id="annual-fuel" type="number" value={annualFuel} onChange={(e) => setAnnualFuel(Number(e.target.value))} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="fuel-price">Fuel Price ({SYMBOL}/tonne)</Label>
                        <Input id="fuel-price" type="number" value={fuelPrice} onChange={(e) => setFuelPrice(Number(e.target.value))} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="efficiency-gain">Efficiency Gain (%)</Label>
                         <Slider id="efficiency-gain" min={1} max={10} step={0.5} value={[efficiencyGain]} onValueChange={(val) => setEfficiencyGain(val[0])} />
                         <p className="text-center text-sm font-medium">{efficiencyGain}%</p>
                    </div>

                    {isAdvancedMode && (
                        <div className="space-y-4 pt-4 border-t">
                            <div className="space-y-2">
                                <Label htmlFor="emission-factor" className="flex items-center">Emission Factor (t CO₂/t fuel) <InfoPopover content="Typical range for marine fuels is 3.1-3.2." /></Label>
                                <Input id="emission-factor" type="number" value={emissionFactor} onChange={(e) => setEmissionFactor(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="discount-rate" className="flex items-center">Discount Rate for NPV <InfoPopover content="Discounts future savings to today's dollars. Default 10%." /></Label>
                                <Input id="discount-rate" type="number" value={discountRate * 100} onChange={(e) => setDiscountRate(Number(e.target.value) / 100)} />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* --- OUTPUTS --- */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className={cn("sm:col-span-2 lg:col-span-3", !isAdvancedMode && "lg:col-span-3 sm:col-span-2")}>
                    <CardHeader>
                        <CardTitle>Estimated Annual Savings</CardTitle>
                        {isAdvancedMode && <CardDescription>Fuel Savings + ETS Co-benefit</CardDescription>}
                    </CardHeader>
                    <CardContent className="text-4xl font-extrabold text-primary">
                        <CountUp end={isAdvancedMode ? calculations.totalAnnualSavings : calculations.annualFuelSavings} prefix={SYMBOL} isMoney={true} />
                    </CardContent>
                </Card>
                
                {isAdvancedMode && (
                  <>
                  <Card className="sm:col-span-2">
                      <CardHeader>
                          <CardTitle className="flex items-center">5-Year NPV <InfoPopover content="Net Present Value discounts future savings to today's dollars." /></CardTitle>
                          <div className="flex items-center space-x-2 pt-2">
                              <Switch id="npv-mode" checked={includeSubscription} onCheckedChange={setIncludeSubscription} />
                              <Label htmlFor="npv-mode" className="text-sm">Include subscription & hardware costs</Label>
                          </div>
                      </CardHeader>
                      <CardContent className="text-4xl font-extrabold text-primary">
                          {calculations.finalNpv > 0 ? (
                              <CountUp end={calculations.finalNpv} prefix={SYMBOL} isMoney={true} />
                          ) : (
                              <span className="text-destructive">–</span>
                          )}
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <CardTitle className="flex items-center">Payback <InfoPopover content="Months for hardware to 'earn back' via savings." /></CardTitle>
                      </CardHeader>
                      <CardContent className="text-4xl font-extrabold text-primary">
                          {calculations.paybackMonths > 0 && calculations.paybackMonths <= 60 ? (
                            <>
                              <CountUp end={calculations.paybackMonths} suffix=" mo" />
                            </>
                          ) : (
                            <span className="text-muted-foreground text-2xl" title="Increase efficiency % or review inputs">> 60 mo</span>
                          )}
                      </CardContent>
                  </Card>
                  </>
                )}
            </div>
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">
            Illustrative only. Savings from 3–10% efficiency are typical; your results vary by route, sea state, fouling, and operations. We’ll validate with your logs and noon reports.
        </p>
      </div>
    </section>
  );
}
