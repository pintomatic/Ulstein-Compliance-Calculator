import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';

const logos = [
  { name: 'Ulstein', component: Icons.ulstein },
  { name: 'DNV', component: Icons.dnv },
  { name: 'Maritime CleanTech', component: Icons.maritimeCleanTech },
];

export function TrustStripSection() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12">
          {logos.map(({ name, component: Logo }) => (
            <div key={name} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Logo className="h-8 md:h-10 text-muted-foreground" />
            </div>
          ))}
          <Badge variant="secondary" className="px-4 py-2 text-sm">ISO 27001 Ready</Badge>
        </div>
      </div>
    </section>
  );
}
