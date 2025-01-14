'use client';
import { Button } from '@/components/ui/button';
import { FloatingActionButton } from "@/components/FloatingActionButton";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button>
        Check your page in every UA or device
      </Button>

      <FloatingActionButton 
        bottomOffset="20px"
        onClick={() => console.log("clicked")}
      />
    </div>
  );
}
