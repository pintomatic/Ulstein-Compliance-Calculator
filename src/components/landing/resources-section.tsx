import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EtsSummaryTool } from '@/components/ets-summary-tool';
import { BookOpen, Download, Video, BrainCircuit } from 'lucide-react';

const resources = [
  {
    title: 'Whitepaper “Navigating EU ETS”',
    count: '1,435 downloads',
    icon: Download,
  },
  {
    title: 'Quick Guide “CII in 2 minutes”',
    count: '892 downloads',
    icon: BookOpen,
  },
  {
    title: 'Webinar “Digital Compliance Future”',
    count: '760 views',
    icon: Video,
  },
];

export function ResourcesSection() {
  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Trusted by 300+ vessels</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Start with our free resources.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex-row items-center gap-4">
                <resource.icon className="w-8 h-8 text-primary" />
                <CardTitle className="text-base">{resource.title}</CardTitle>
              </CardHeader>
              <CardFooter>
                <p className="text-sm font-medium text-muted-foreground">{resource.count}</p>
              </CardFooter>
            </Card>
          ))}
           <Dialog>
            <DialogTrigger asChild>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary border-dashed">
                <CardHeader className="flex-row items-center gap-4">
                    <BrainCircuit className="w-8 h-8 text-primary" />
                    <CardTitle className="text-base">Your Personal ETS Summary</CardTitle>
                </CardHeader>
                <CardFooter>
                    <p className="text-sm font-medium text-primary">Use AI Tool</p>
                </CardFooter>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Personal EU ETS Impact Summary</DialogTitle>
                    <DialogDescription>
                        Enter your fleet details to get an AI-powered summary of how EU ETS changes will impact you.
                    </DialogDescription>
                </DialogHeader>
                <EtsSummaryTool />
            </DialogContent>
           </Dialog>
        </div>
      </div>
    </section>
  );
}
