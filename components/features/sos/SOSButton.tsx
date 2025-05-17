"use client";

import { useState } from "react";
import { AlertCircle, CornerLeftUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useSOS } from "@/hooks/useSOS";

export function SOSButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { sendSOSAlert } = useSOS();
  
  const handleSOS = async () => {
    setIsLoading(true);
    
    try {
      await sendSOSAlert();
      
      toast({
        title: "SOS Alert Sent",
        description: "Your emergency contacts have been notified with your location.",
        variant: "default",
      });
      
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Failed to send SOS",
        description: "Please try again or contact emergency services directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // The large primary SOS button
  const SOSTrigger = (
    <Button
      variant="destructive"
      size="lg"
      className={cn(
        "h-16 rounded-full shadow-lg transition-all duration-100 active:scale-95",
        "border-4 border-destructive/20"
      )}
    >
      <span className="flex items-center gap-2">
        <AlertCircle className="h-6 w-6" />
        <span className="font-bold text-lg">SOS</span>
      </span>
    </Button>
  );
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {SOSTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-destructive flex items-center justify-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Emergency SOS Alert
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            This will send your current location to all your emergency contacts and notify them that you need immediate assistance.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-2 p-4 bg-muted rounded-md">
          <h4 className="text-sm font-medium mb-2">The following actions will be taken:</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <CornerLeftUp className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span>Your precise location will be shared</span>
            </li>
            <li className="flex items-start gap-2">
              <CornerLeftUp className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span>Automated calls to your emergency contacts</span>
            </li>
            <li className="flex items-start gap-2">
              <CornerLeftUp className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span>SMS messages with your location details</span>
            </li>
          </ul>
        </div>
        
        <DialogFooter className="sm:justify-between gap-2 flex-col sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="sm:w-1/2"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleSOS}
            disabled={isLoading}
            className="sm:w-1/2"
          >
            {isLoading ? "Sending..." : "Send SOS Alert"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}