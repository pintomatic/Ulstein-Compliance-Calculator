import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function PageFooter() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-background">ULSTEIN <span className="text-primary">Digital Solutions</span></h3>
            <p className="text-sm">Built on 100+ years of Norwegian maritime engineering excellence.</p>
          </div>
          <div className="space-y-2">
             <h3 className="font-bold text-lg text-background">Contact</h3>
             <p className="text-sm">Phone: +47 70 00 00 00 (CET 08-17)</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-background">Legal</h3>
            <div className="flex space-x-4 text-sm">
                <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary">API Documentation</Link>
                <Link href="#" className="hover:text-primary">Support</Link>
            </div>
          </div>
        </div>
        <Separator className="my-6 bg-background/20" />
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>Data remains your property.</p>
          <p>© Ulstein Digital 2025</p>
        </div>
      </div>
    </footer>
  );
}
