'use client';

import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { trackGtmEvent } from '@/lib/gtm';

type InfoIconTooltipProps = {
  blockId: string;
  tooltipText: string;
};

export function InfoIconTooltip({ blockId, tooltipText }: InfoIconTooltipProps) {
  const handleOpen = () => {
    trackGtmEvent({ event: 'explainer_block_view', block_id: blockId });
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger
          asChild
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const event = new CustomEvent('open-explainer', { detail: { blockId } });
            window.dispatchEvent(event);
            handleOpen();
          }}
          aria-label={`More information about ${blockId.replace(/-/g, ' ')}`}
        >
          <button className="text-primary hover:text-accent transition-colors">
            <Info className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" align="center" className="max-w-xs text-center">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
