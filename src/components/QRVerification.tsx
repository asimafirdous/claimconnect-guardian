import { useState } from "react";
import { QrCode, Camera, Check, X, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface QRVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  claimantName: string;
  onVerificationComplete: (success: boolean) => void;
}

export const QRVerification = ({ 
  isOpen, 
  onClose, 
  itemName, 
  claimantName, 
  onVerificationComplete 
}: QRVerificationProps) => {
  const [step, setStep] = useState<'generate' | 'scan' | 'result'>('generate');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Mock QR code data - in real app, this would be generated based on item details
  const qrData = {
    itemId: "ITM-" + Date.now().toString().slice(-6),
    itemName,
    verificationCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    timestamp: new Date().toISOString()
  };

  const generateQR = () => {
    setQrGenerated(true);
    toast({
      title: "QR Code Generated",
      description: "QR code has been generated for item verification.",
    });
  };

  const simulateScan = () => {
    setStep('scan');
    // Simulate scanning process
    setTimeout(() => {
      const isValid = Math.random() > 0.3; // 70% success rate for demo
      setVerificationResult(isValid);
      setStep('result');
      
      if (isValid) {
        toast({
          title: "Verification Successful",
          description: "Item ownership has been verified successfully.",
        });
      } else {
        toast({
          title: "Verification Failed", 
          description: "QR code verification failed. Please try again.",
          variant: "destructive"
        });
      }
    }, 3000);
  };

  const completeVerification = () => {
    onVerificationComplete(verificationResult || false);
    onClose();
    setStep('generate');
    setQrGenerated(false);
    setVerificationResult(null);
  };

  const renderGenerateStep = () => (
    <div className="space-y-4">
      <div className="text-center space-y-4">
        <div className="mx-auto w-32 h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
          {qrGenerated ? (
            <div className="text-center">
              <QrCode className="h-16 w-16 mx-auto text-primary mb-2" />
              <div className="text-xs space-y-1">
                <p className="font-mono text-primary">{qrData.verificationCode}</p>
                <p className="text-muted-foreground">Verification Code</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <QrCode className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">QR Code will appear here</p>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Item: {itemName}</h3>
          <p className="text-sm text-muted-foreground">Claimant: {claimantName}</p>
          <Badge variant="outline">ID: {qrData.itemId}</Badge>
        </div>
      </div>

      <div className="space-y-3">
        {!qrGenerated ? (
          <Button onClick={generateQR} className="w-full">
            <QrCode className="h-4 w-4 mr-2" />
            Generate Verification QR
          </Button>
        ) : (
          <>
            <Button onClick={simulateScan} className="w-full">
              <Scan className="h-4 w-4 mr-2" />
              Start Verification Scan
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Ask the claimant to present their proof of ownership
            </p>
          </>
        )}
      </div>
    </div>
  );

  const renderScanStep = () => (
    <div className="space-y-4 text-center">
      <div className="mx-auto w-32 h-32 border-2 border-primary rounded-lg flex items-center justify-center bg-primary/5">
        <Camera className="h-16 w-16 text-primary animate-pulse" />
      </div>
      <div className="space-y-2">
        <h3 className="font-medium">Scanning in progress...</h3>
        <p className="text-sm text-muted-foreground">
          Please ensure the claimant's proof is clearly visible
        </p>
        <div className="flex justify-center">
          <Badge variant="outline" className="animate-pulse">
            Verifying ownership
          </Badge>
        </div>
      </div>
    </div>
  );

  const renderResultStep = () => (
    <div className="space-y-4 text-center">
      <div className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center ${
        verificationResult ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
      }`}>
        {verificationResult ? (
          <Check className="h-16 w-16" />
        ) : (
          <X className="h-16 w-16" />
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium">
          Verification {verificationResult ? 'Successful' : 'Failed'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {verificationResult 
            ? 'The claimant has been verified as the rightful owner.'
            : 'Unable to verify ownership. Please request additional proof.'
          }
        </p>
        <Badge variant={verificationResult ? 'default' : 'destructive'}>
          {verificationResult ? 'APPROVED' : 'REJECTED'}
        </Badge>
      </div>

      <Button onClick={completeVerification} className="w-full">
        Complete Verification
      </Button>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <QrCode className="h-5 w-5" />
            <span>QR Verification System</span>
          </DialogTitle>
          <DialogDescription>
            Use QR-based verification to confirm item ownership
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {step === 'generate' && renderGenerateStep()}
          {step === 'scan' && renderScanStep()}
          {step === 'result' && renderResultStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};