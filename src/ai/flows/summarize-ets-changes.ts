'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing EU ETS changes based on specific fleet details.
 *
 * - summarizeEtsChanges - A function that summarizes EU ETS changes.
 * - SummarizeEtsChangesInput - The input type for the summarizeEtsChanges function.
 * - SummarizeEtsChangesOutput - The return type for the summarizeEtsChanges function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEtsChangesInputSchema = z.object({
  fleetDetails: z
    .string()
    .describe('Details of the shipping fleet, including number of ships, types, and typical routes.'),
  recentChanges: z
    .string()
    .describe('Recent changes to the EU ETS regulations relevant to shipping companies.'),
});
export type SummarizeEtsChangesInput = z.infer<typeof SummarizeEtsChangesInputSchema>;

const SummarizeEtsChangesOutputSchema = z.object({
  summary: z.string().describe('A summary of how the EU ETS changes impact the specific fleet.'),
});
export type SummarizeEtsChangesOutput = z.infer<typeof SummarizeEtsChangesOutputSchema>;

export async function summarizeEtsChanges(input: SummarizeEtsChangesInput): Promise<SummarizeEtsChangesOutput> {
  return summarizeEtsChangesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeEtsChangesPrompt',
  input: {schema: SummarizeEtsChangesInputSchema},
  output: {schema: SummarizeEtsChangesOutputSchema},
  prompt: `You are an expert in EU ETS regulations for the maritime industry. Given the recent changes to the EU ETS and the details of a specific shipping fleet, provide a concise summary of how these changes will impact the fleet.

Recent EU ETS Changes: {{{recentChanges}}}

Fleet Details: {{{fleetDetails}}}

Summary:`,
});

const summarizeEtsChangesFlow = ai.defineFlow(
  {
    name: 'summarizeEtsChangesFlow',
    inputSchema: SummarizeEtsChangesInputSchema,
    outputSchema: SummarizeEtsChangesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
