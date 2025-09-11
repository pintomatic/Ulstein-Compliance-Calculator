'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CountUp } from '@/components/count-up';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HelpCircle } from 'lucide-react';
import { DISCOUNT_RATE, SYMBOL, formatMoney, ALLOWANCE_PRICE_USD, MODULE_PRICING_USD } from '@/lib/currency';
import { InfoIconTooltip } from './info-icon-tooltip';
import { explainerContent } from '@/lib/explainer-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const fuelTypes = [
  { name: 'MGO', price: 750 },
  { name: 'VLSFO', price: 520 },
  { name: 'Custom', price: 650 },
];

export function RoiCalculatorSection() {
  // Inputs
  const [annualFuel, setAnnualFuel] = useState(10000);
  const [fuelType, setFuelType] = useState('Custom');
  const [fuelPrice, setFuelPrice] = useState(650);
  const [efficiencyGain, setEfficiencyGain] = useState(5);
  const [etsPrice] = useState(ALLOWANCE_PRICE_USD); // Mirrored from ETS calc
  const [emissionFactor, setEmissionFactor] = useState(3.2);
  const [discountRate, setDiscountRate] = useState(DISCOUNT_RATE);
  const [hardwareCost, setHardwareCost] = useState(MODULE_PRICING_USD.hardwareOneOff);
  const [subscriptionCost, setSubscriptionCost] = useState(MODULE_PRICING_USD.complianceCore);

  const explainerData = explainerContent.find(b => b.id === 'roi-calculator');
  
  const handleFuelTypeChange = (value: string) => {
    setFuelType(value);
    if (value !== 'Custom') {
      const selectedFuel = fuelTypes.find(ft => ft.name === value);
      if (selectedFuel) {
        setFuelPrice(selectedFuel.price);
      }
    }
  };

  const calculations = useMemo(() => {
    const baselineFuelCost = annualFuel * fuelPrice;
    const fuelSaved = annualFuel * (efficiencyGain / 100);
    const annualFuelSavings = fuelSaved * fuelPrice;
    const estimatedCo2Emissions = annualFuel * emissionFactor;
    const co2Savings = fuelSaved * emissionFactor * etsPrice;
    const annualSavings = annualFuelSavings + co2Savings;

    const totalYear1Cost = hardwareCost + subscriptionCost;
    
    let paybackMonths = 0;
    if(annualSavings > 0) {
      paybackMonths = (hardwareCost / annualSavings) * 12;
    }

    let npv = 0;
    if (discountRate > 0) {
      npv = annualSavings * ((1 - Math.pow(1 + discountRate, -5)) / discountRate);
    } else {
      npv = annualSavings * 5;
    }

    return { baselineFuelCost, estimatedCo2Emissions, annualSavings, paybackMonths, npv, totalYear1Cost };
  }, [annualFuel, fuelPrice, efficiencyGain, etsPrice, emissionFactor, discountRate, hardwareCost, subscriptionCost]);

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
        </div>
        
        <Tabs defaultValue="simple" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simple">Simple</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          <TabsContent value="simple" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-8">
                  <Card>
                      <CardHeader><CardTitle>Fleet Inputs</CardTitle></CardHeader>
                      <CardContent className="space-y-6">
                           <div className="space-y-2">
                              <Label htmlFor="annual-fuel-simple">Yearly Fuel Consumption (t/year)</Label>
                              <Input id="annual-fuel-simple" type="number" value={annualFuel} onChange={(e) => setAnnualFuel(Number(e.target.value))} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                  <Label htmlFor="fuel-type-simple">Fuel Type</Label>
                                  <Select value={fuelType} onValueChange={handleFuelTypeChange}>
                                      <SelectTrigger id="fuel-type-simple"><SelectValue /></SelectTrigger>
                                      <SelectContent>
                                          {fuelTypes.map(ft => <SelectItem key={ft.name} value={ft.name}>{ft.name}</SelectItem>)}
                                      </SelectContent>
                                  </Select>
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="fuel-price-simple">Fuel Price ($/t)</Label>
                                  <Input id="fuel-price-simple" type="number" value={fuelPrice} onChange={(e) => setFuelPrice(Number(e.target.value))} disabled={fuelType !== 'Custom'} />
                              </div>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="efficiency-gain-simple">Efficiency Gain (%)</Label>
                              <Slider id="efficiency-gain-simple" min={1} max={10} step={0.5} value={[efficiencyGain]} onValueChange={(val) => setEfficiencyGain(val[0])} />
                              <p className="text-center text-sm font-medium">{efficiencyGain.toFixed(1)}%</p>
                          </div>
                      </CardContent>
                  </Card>
                  <Card className="flex flex-col justify-center">
                       <CardHeader>
                        <CardTitle>Derived Estimates & Savings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                          <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Baseline Fuel Cost ($/year)</span>
                              <span className="font-medium">{formatMoney(calculations.baselineFuelCost)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                               <span className="text-muted-foreground flex items-center">
                                Estimated CO₂ Emissions (t/year)
                                <InfoPopover content="CFO simplification; technical factor varies by fuel." />
                              </span>
                              <span className="font-medium">{Math.round(calculations.estimatedCo2Emissions).toLocaleString()} t</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">CO₂ Price ($/t)</span>
                              <span className="font-medium">{formatMoney(etsPrice)}</span>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                              <p className="text-lg font-medium text-primary">Annual Savings ($/year)</p>
                              <div className="text-4xl font-extrabold text-primary">
                                  <CountUp end={calculations.annualSavings} prefix="$" isMoney={true} />
                              </div>
                          </div>
                           <p className="text-xs text-muted-foreground pt-2">Fuel & CO₂ savings are estimates; we validate with logs/noon reports.</p>
                      </CardContent>
                  </Card>
              </div>
          </TabsContent>
          <TabsContent value="advanced" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-8">
                  <Card>
                       <CardHeader><CardTitle>Fleet & Advanced Inputs</CardTitle></CardHeader>
                       <CardContent className="space-y-6">
                          <div className="space-y-2">
                              <Label htmlFor="annual-fuel-adv">Yearly Fuel Consumption (t/year)</Label>
                              <Input id="annual-fuel-adv" type="number" value={annualFuel} onChange={(e) => setAnnualFuel(Number(e.target.value))} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                  <Label htmlFor="fuel-type-adv">Fuel Type</Label>
                                  <Select value={fuelType} onValueChange={handleFuelTypeChange}>
                                      <SelectTrigger id="fuel-type-adv"><SelectValue /></SelectTrigger>
                                      <SelectContent>
                                          {fuelTypes.map(ft => <SelectItem key={ft.name} value={ft.name}>{ft.name}</SelectItem>)}
                                      </SelectContent>
                                  </Select>
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="fuel-price-adv">Fuel Price ($/t)</Label>
                                  <Input id="fuel-price-adv" type="number" value={fuelPrice} onChange={(e) => setFuelPrice(Number(e.target.value))} disabled={fuelType !== 'Custom'} />
                              </div>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="efficiency-gain-adv">Efficiency Gain (%)</Label>
                              <Slider id="efficiency-gain-adv" min={1} max={10} step={0.5} value={[efficiencyGain]} onValueChange={(val) => setEfficiencyGain(val[0])} />
                              <p className="text-center text-sm font-medium">{efficiencyGain.toFixed(1)}%</p>
                          </div>
                          <div className="space-y-2 pt-4 border-t">
                               <Label htmlFor="emission-factor-adv" className="flex items-center">
                                CO₂ factor (t CO₂ per tonne fuel)
                                <InfoIconTooltip blockId="co2-factor" tooltipText="CFO simplification; technical factor varies by fuel." />
                              </Label>
                              <Input id="emission-factor-adv" type="number" value={emissionFactor} onChange={(e) => setEmissionFactor(Number(e.target.value))} />
                          </div>
                      </CardContent>
                  </Card>
                  <div className="space-y-8">
                      <Card>
                          <CardHeader><CardTitle>Annual Savings</CardTitle></CardHeader>
                           <CardContent>
                              <p className="text-4xl font-extrabold text-primary">
                                <CountUp end={calculations.annualSavings} prefix="$" isMoney={true} />
                              </p>
                          </CardContent>
                      </Card>
                      <Card>
                          <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Solution Investment</CardTitle>
                              <CardDescription>All USD; VAT/local taxes excluded.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                               <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="hardware-cost">Hardware (one-off)</Label>
                                  <Input id="hardware-cost" type="number" value={hardwareCost} onChange={e => setHardwareCost(Number(e.target.value))} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="subscription-cost">Subscription (annual)</Label>
                                  <Input id="subscription-cost" type="number" value={subscriptionCost} onChange={e => setSubscriptionCost(Number(e.target.value))} />
                                </div>
                              </div>
                              <p className="text-sm font-medium text-right pt-2">Total Year 1 Cost: {formatMoney(calculations.totalYear1Cost)}</p>
                          </CardContent>
                      </Card>
                  </div>
              </div>
          </TabsContent>
        </Tabs>

        <div className="max-w-6xl mx-auto mt-8">
            <Card>
                <CardHeader><CardTitle>Optional Financials</CardTitle></CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                        <Label htmlFor="discount-rate-slider">Discount Rate</Label>
                        <Slider id="discount-rate-slider" min={0} max={15} step={0.5} value={[discountRate * 100]} onValueChange={(val) => setDiscountRate(val[0] / 100)} />
                        <p className="text-center text-sm font-medium">{(discountRate * 100).toFixed(1)}%</p>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <Card className="text-center">
                            <CardHeader><CardTitle className="text-base">Payback (months)</CardTitle></CardHeader>
                            <CardContent>
                                {calculations.paybackMonths > 0 && calculations.paybackMonths <= 60 ? (
                                    <p className="text-3xl font-bold"><CountUp end={calculations.paybackMonths} suffix=" mo" /></p>
                                ) : (
                                    <p className="text-2xl font-bold text-muted-foreground" title="Increase efficiency % or review inputs">> 60 mo</p>
                                )}
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader><CardTitle className="text-base">5-Year NPV ($)</CardTitle></CardHeader>
                            <CardContent>
                                {calculations.npv > 0 ? (
                                    <p className="text-3xl font-bold"><CountUp end={calculations.npv} prefix="$" isMoney={true} /></p>
                                ) : (
                                    <p className="text-3xl font-bold text-destructive">–</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}

    