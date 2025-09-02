import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { InfoIconTooltip } from './info-icon-tooltip';
import { explainerContent } from '@/lib/explainer-content';
import { MODULE_PRICING_USD, SYMBOL } from '@/lib/currency';

const TickItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center gap-2">
    <Check className="h-4 w-4 text-primary" />
    <span className="text-muted-foreground">{children}</span>
  </li>
);

export function PricingSection() {
  const explainerData = explainerContent.find(b => b.id === 'pricing');

  return (
    <section id="pricing" className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl flex items-center justify-center gap-2">
            Pricing Snapshot
            {explainerData && (
              <InfoIconTooltip
                blockId={explainerData.id}
                tooltipText={explainerData.microcopy}
              />
            )}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Transparent pricing for full compliance and optimization. All figures in USD.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Compliance Core</CardTitle>
              <CardDescription>Essential tools for regulatory adherence.</CardDescription>
              <p className="text-4xl font-bold pt-4">{SYMBOL}{MODULE_PRICING_USD.complianceCore / 1000}k<span className="text-lg font-normal text-muted-foreground"> /vessel-year</span></p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <TickItem>MRV auto-reporting</TickItem>
                <TickItem>CII calculations</TickItem>
                <TickItem>ETS monitoring</TickItem>
              </ul>
            </CardContent>
            <CardFooter>
              <Badge variant="outline">Fleet 10+ discount: –10% on SaaS fees</Badge>
            </CardFooter>
          </Card>
          
          <Card className="border-primary border-2 flex flex-col relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
            <CardHeader>
              <CardTitle>Fuel-Plus</CardTitle>
              <CardDescription>Unlock significant fuel savings and performance.</CardDescription>
               <p className="text-4xl font-bold pt-4">+{SYMBOL}{MODULE_PRICING_USD.fuelPlusAddOn / 1000}k<span className="text-lg font-normal text-muted-foreground"> /vessel-year</span></p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <TickItem>Design-twin insights</TickItem>
                <TickItem>Fuel optimisation</TickItem>
                <TickItem>Performance analytics</TickItem>
              </ul>
            </CardContent>
          </Card>

          <Card className="flex flex-col md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>One-off Hardware</CardTitle>
              <CardDescription>BLUE BOX™ data collection unit.</CardDescription>
              <p className="text-4xl font-bold pt-4">{SYMBOL}{MODULE_PRICING_USD.hardwareOneOff / 1000}k</p>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground">Approximately {SYMBOL}{Math.round(MODULE_PRICING_USD.hardwareOneOff / 5 / 1000)}k per year amortised over 5 years.</p>
            </CardContent>
            <CardFooter>
                 <p className="text-xs text-muted-foreground">Prices exclude VAT and local taxes.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
