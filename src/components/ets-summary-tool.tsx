'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { summarizeEtsChanges } from '@/ai/flows/summarize-ets-changes';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  fleetDetails: z.string().min(10, "Please provide more details about your fleet."),
  recentChanges: z.string().min(10, "Please provide some details on recent changes."),
});

type FormValues = z.infer<typeof formSchema>;

export function EtsSummaryTool() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fleetDetails: 'e.g., 5 container ships, 2 bulk carriers, mainly operating between Europe and Asia.',
      recentChanges: 'e.g., Phase-in of shipping emissions, surrender of allowances for 40% of emissions in 2024.',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeEtsChanges(data);
      setSummary(result.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate summary. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fleetDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fleet Details</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your fleet..." {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recentChanges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recent EU ETS Changes</FormLabel>
                <FormControl>
                  <Textarea placeholder="What recent changes concern you?" {...field} rows={4} />
                </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Summary
          </Button>
        </form>
      </Form>

      {(isLoading || summary) && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Your Summary:</h3>
          <Card>
            <CardContent className="p-4">
              {isLoading ? (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating your personalized summary...</span>
                </div>
              ) : (
                <p className="text-sm whitespace-pre-wrap">{summary}</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
