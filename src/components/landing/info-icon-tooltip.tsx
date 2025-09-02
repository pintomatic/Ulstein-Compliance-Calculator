'use client';

import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { triggerExplainer } from '../explainer-sidebar';
import { cn } from '@/lib/utils';

interface InfoIconTooltipProps {
  blockId: string;
  tooltipText: string;
  className?: string;
}

export function InfoIconTooltip({ blockId, tooltipText, className }: InfoIconTooltipProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    triggerExplainer(blockId);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-6 w-6 text-muted-foreground hover:text-primary cursor-help', className)}
            onClick={handleClick}
            aria-label={`Learn more about ${tooltipText}`}
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
