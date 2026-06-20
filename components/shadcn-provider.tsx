import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function ShadcnProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <Toaster richColors />
      {children}
    </TooltipProvider>
  );
}
