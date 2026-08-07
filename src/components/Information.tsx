
import { Info } from 'lucide-react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "./ui/hover-card"

interface InformationProps {
  detail: string;
  className?: string;
}

export default function Information({ detail, className }: InformationProps) {
  return (
    <div className={"inline"}>
      <HoverCard>
        <HoverCardTrigger delay={200} closeDelay={100}>
          <button 
            type="button" 
            className="inline-flex items-center justify-center rounded-full p-0.5 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="More information"
          >
            <Info className="size-4 text-muted-foreground" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto max-w-80 text-muted-foreground whitespace-normal wrap-break-word text-xs font-light">
          {detail}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}