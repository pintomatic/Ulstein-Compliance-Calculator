import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { MODULE_PRICING_USD, SYMBOL, formatMoney } from '@/lib/currency';
import { InfoIconTooltip } from './info-icon-tooltip';
import { explainerContent } from '@/lib/explainer-content';

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
            Solution Investment
            {explainerData && (
              <InfoIconTooltip
                blockId={explainerData.id}
                tooltipText={explainerData.microcopy}
              />
            )}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            All USD; VAT/local taxes excluded.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6 grid gap-6">
               <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold">Hardware (one-off)</h3>
                  <p className="text-3xl font-bold text-primary">{formatMoney(MODULE_PRICING_USD.hardwareOneOff)}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Subscription (annual)</h3>
                  <p className="text-3xl font-bold text-primary">{formatMoney(MODULE_PRICING_USD.complianceCore)}</p>
                  <p className="text-sm text-muted-foreground">Includes data + ecometer + dashboards.</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Core Features</h3>
                <ul className="mt-2 space-y-2">
                  <TickItem>Compliance Core: MRV/CII/ETS automation.</TickItem>
                  <TickItem>Fuel-Plus Add-on: Design-twin insights & performance analytics.</TickItem>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
