import { useState } from "react";
import { Upload, Camera, MapPin, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ChatBox } from "@/components/ChatBox";

interface ReportPageProps {
  onOpenChat?: () => void;
}

export const ReportPage = ({ onOpenChat }: ReportPageProps) => {
  const [reportType, setReportType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    location: "",
    date: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = () => {
    toast({
      title: "File Upload",
      description: "File upload functionality would be implemented here.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportType) {
      toast({
        title: "Error",
        description: "Please select whether you lost or found an item.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.itemName.trim() || !formData.email.trim()) {
      toast({
        title: "Error", 
        description: "Please enter the item name and your email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (reportType === "lost") {
        // For lost items: Report everyone with name and email only
        toast({
          title: "Lost Item Reported Successfully",
          description: `Your lost ${formData.itemName} has been reported. You'll be notified when someone finds a matching item.`,
        });
      } else {
        // For found items: Direct them to contact admin
        toast({
          title: "Found Item Reported",
          description: `Thank you for reporting the found ${formData.itemName}. Please contact admin for verification.`,
        });
        
        // Auto-open chat with admin for found items
        setTimeout(() => {
          setIsChatOpen(true);
        }, 1500);
      }
      
      // Reset form
      setReportType("");
      setCategory("");
      setFormData({
        itemName: "",
        description: "",
        location: "",
        date: "",
        email: "",
        phone: ""
      });
    }, 2000);
  };

  const openAdminChat = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Report an Item</CardTitle>
            <CardDescription>
              Help connect lost items with their owners by reporting lost or found items.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Report Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">What are you reporting?</Label>
                <RadioGroup value={reportType} onValueChange={setReportType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lost" id="lost" />
                    <Label htmlFor="lost">I lost an item</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="found" id="found" />
                    <Label htmlFor="found">I found an item</Label>
                  </div>
                </RadioGroup>
                
                {reportType === "found" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                    <p className="text-sm text-blue-800">
                      <strong>Found an item?</strong> After submitting this report, you'll need to contact our admin team for verification and to coordinate with the rightful owner.
                    </p>
                  </div>
                )}
              </div>

              {/* Item Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name *</Label>
                  <Input 
                    id="itemName" 
                    placeholder="e.g., iPhone, Backpack, Keys" 
                    value={formData.itemName}
                    onChange={(e) => handleInputChange("itemName", e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="documents">Documents</SelectItem>
                      <SelectItem value="keys">Keys</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description including color, brand, size, distinctive features, etc."
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              {/* Location and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder={reportType === "lost" ? "Where did you lose it?" : "Where did you find it?"}
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Date
                  </Label>
                  <Input 
                    type="date" 
                    id="date" 
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
              </div>

              {/* Contact Information - Required fields based on report type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email *</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    placeholder="your@email.com" 
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number {reportType === "found" ? "(Optional)" : "(Optional)"}
                  </Label>
                  <Input 
                    type="tel" 
                    id="phone" 
                    placeholder="(555) 123-4567" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Upload Images</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop images here, or click to browse
                    </p>
                    <Button type="button" variant="outline" size="sm" onClick={handleFileUpload}>
                      <Camera className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </div>
              </div>

              {/* Submit Button and Contact Admin */}
              <div className="space-y-3">
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
                
                {reportType === "found" && (
                  <Button 
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={openAdminChat}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Admin Now
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <ChatBox
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        recipientType="admin"
        itemName={formData.itemName || "reported item"}
      />
    </>
  );
};