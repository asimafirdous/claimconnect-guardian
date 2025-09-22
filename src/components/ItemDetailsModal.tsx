import { useState } from "react";
import { MapPin, Calendar, User, Phone, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ItemData {
  id: number;
  title: string;
  description: string;
  type: "found" | "lost";
  location: string;
  date: string;
  image: string;
  reporterName: string;
  reporterEmail: string;
  reporterPhone?: string;
  category?: string;
  additionalDetails?: string;
}

interface ItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ItemData | null;
  currentUserName: string;
}

export const ItemDetailsModal = ({ isOpen, onClose, item, currentUserName }: ItemDetailsModalProps) => {
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [claimMessage, setClaimMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  if (!item) return null;

  const handleClaimItem = () => {
    if (item.type === "lost") {
      setShowClaimForm(true);
    } else {
      toast({
        title: "Contact Admin Required",
        description: "For found items, please contact the admin to coordinate with the reporter.",
      });
    }
  };

  const submitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!claimMessage.trim()) {
      toast({
        title: "Error",
        description: "Please provide details about why this item belongs to you.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Successfully Notified!",
        description: `Your claim for ${item.title} has been submitted. The reporter and admin have been notified.`,
      });
      
      setShowClaimForm(false);
      setClaimMessage("");
      onClose();
    }, 2000);
  };

  const contactReporter = () => {
    toast({
      title: "Opening Contact",
      description: `Connecting you with ${item.reporterName}...`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-xl">{item.title}</DialogTitle>
              <div className="flex items-center space-x-2">
                <Badge variant={item.type === "found" ? "default" : "secondary"}>
                  {item.type === "found" ? "Found" : "Lost"}
                </Badge>
                <span className="text-sm text-muted-foreground">{item.date}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Item Image</span>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Description</h4>
              <p className="mt-1">{item.description}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Location</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">{item.location}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Date</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">{item.date}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                Reported By
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.reporterName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.reporterEmail}</span>
                </div>
                {item.reporterPhone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{item.reporterPhone}</span>
                  </div>
                )}
              </div>
            </div>

            {item.additionalDetails && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Additional Details
                  </h4>
                  <p className="mt-1 text-sm">{item.additionalDetails}</p>
                </div>
              </>
            )}
          </div>

          {showClaimForm ? (
            <form onSubmit={submitClaim} className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="claim-message">
                  Why do you believe this item belongs to you? *
                </Label>
                <Textarea
                  id="claim-message"
                  placeholder="Please provide specific details that prove this item is yours (e.g., unique features, where you lost it, serial numbers, etc.)"
                  value={claimMessage}
                  onChange={(e) => setClaimMessage(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Submitting..." : "Submit Claim"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowClaimForm(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex space-x-2 pt-4 border-t">
              {item.type === "lost" ? (
                <Button onClick={handleClaimItem} className="flex-1">
                  <Check className="h-4 w-4 mr-2" />
                  Claim This Item
                </Button>
              ) : (
                <Button onClick={contactReporter} className="flex-1">
                  Contact Reporter
                </Button>
              )}
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};