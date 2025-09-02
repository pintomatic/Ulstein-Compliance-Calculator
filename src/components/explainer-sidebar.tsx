'use client';

import { useState, useEffect, useRef } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { trackGtmEvent } from '@/lib/gtm.ts';
import { explainerContent } from '@/lib/explainer-content';
import { cn } from '@/lib/utils';

export function ExplainerSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedBlock, setHighlightedBlock] = useState<string | null>(null);
  const openTimeRef = useRef<number | null>(null);
  const blockViewTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    const sessionState = sessionStorage.getItem('explainer-open');
    if (sessionState === 'true') {
      setIsOpen(true);
    }

    const handleOpenExplainer = (event: Event) => {
      const customEvent = event as CustomEvent<{ blockId: string }>;
      setIsOpen(true);
      setTimeout(() => {
        const blockElement = document.getElementById(`explainer-block-${customEvent.detail.blockId}`);
        blockElement?.focus();
        setAndHighlightBlock(customEvent.detail.blockId);
      }, 100);
    };

    window.addEventListener('open-explainer', handleOpenExplainer);

    return () => {
      window.removeEventListener('open-explainer', handleOpenExplainer);
      Object.values(blockViewTimeouts.current).forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('explainer-open', String(isOpen));
    if (isOpen) {
      openTimeRef.current = Date.now();
      trackGtmEvent({ event: 'explainer_open' });
    } else if (openTimeRef.current) {
      const timeOpen = Date.now() - openTimeRef.current;
      trackGtmEvent({ event: 'explainer_close', time_open_ms: timeOpen });
      openTimeRef.current = null;
    }
  }, [isOpen]);

  const setAndHighlightBlock = (blockId: string) => {
    setHighlightedBlock(blockId);
    if (blockViewTimeouts.current[blockId]) {
      clearTimeout(blockViewTimeouts.current[blockId]);
    }
    blockViewTimeouts.current[blockId] = setTimeout(() => {
      setHighlightedBlock(null);
    }, 2000);

    trackGtmEvent({ event: 'explainer_block_view', block_id: blockId });
  };

  const handleJumpToSection = (sectionId: string, blockId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setAndHighlightBlock(blockId);
    trackGtmEvent({ event: 'explainer_jump_to_section', section_id: sectionId });
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <TooltipProvider>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed right-4 md:right-8 bottom-28 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-40 rounded-full w-12 h-12 shadow-lg"
              aria-label="Toggle Explainer"
              aria-expanded={isOpen}
              onClick={toggleOpen}
            >
              <HelpCircle className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Explainer</p>
          </TooltipContent>
        </Tooltip>
        <SheetContent className="w-full md:w-[480px] p-0 flex flex-col">
          <SheetHeader className="p-6 pb-4 border-b">
            <SheetTitle>Page Explainer</SheetTitle>
            <SheetDescription>What you’re looking at and why it matters.</SheetDescription>
          </SheetHeader>
          <div className="p-4 border-b">
            <h4 className="font-semibold text-sm mb-2">Quick Nav</h4>
            <div className="flex flex-wrap gap-2">
              {explainerContent.map((block) => (
                <Button
                  key={block.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleJumpToSection(block.sectionId, block.id)}
                >
                  {block.navTitle}
                </Button>
              ))}
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-8">
              {explainerContent.map((block) => (
                <div
                  key={block.id}
                  id={`explainer-block-${block.id}`}
                  tabIndex={-1}
                  className={cn(
                    'p-4 rounded-lg outline-none transition-all duration-500',
                    highlightedBlock === block.id ? 'bg-primary/10 ring-2 ring-primary' : ''
                  )}
                >
                  <h3 className="font-bold text-lg mb-2">{block.title}</h3>
                  <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                    {block.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                  {block.link && (
                    <a
                      href={block.link.href}
                      className="text-sm text-primary hover:underline mt-4 inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {block.link.text}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}

// Custom event to open the explainer from other components
export const triggerExplainer = (blockId: string) => {
  window.dispatchEvent(new CustomEvent('open-explainer', { detail: { blockId } }));
};
