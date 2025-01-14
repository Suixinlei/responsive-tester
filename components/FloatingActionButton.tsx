'use client';
import { Plus } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps extends ButtonProps {
  bottomOffset?: string;
}

export function FloatingActionButton({
  bottomOffset = "0px",
  className,
  ...props
}: FloatingActionButtonProps) {
  return (
    <Button
      size="icon"
      className={cn(
        "fixed right-5 rounded-full shadow-lg hover:shadow-xl",
        "bg-primary hover:bg-primary/90 active:bg-primary/80",
        className
      )}
      style={{
        bottom: `calc(20px + ${bottomOffset})`
      }}
      {...props}
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
}