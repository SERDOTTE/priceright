"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { LucideIcon, Loader } from "lucide-react";

interface IconButtonProps {
  Icon: LucideIcon; 
  label: string;
}


export function SubmitButton({ label, Icon }: IconButtonProps ) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={pending} aria-disabled={pending}>
      {pending ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        <>
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
}
