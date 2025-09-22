import { User, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const userItems = [
  {
    id: 1,
    title: "Lost Wallet",
    type: "lost",
    status: "active",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "Found Keys",
    type: "found",
    status: "returned",
    date: "2024-01-10"
  }
];

export const ProfilePage = () => {
  const { toast } = useToast();

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing form would open here.",
    });
  };

  const handleViewItem = (itemId: number, itemTitle: string) => {
    toast({
      title: `Viewing ${itemTitle}`,
      description: "Item details would open in a modal or detailed view.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">John Doe</CardTitle>
                  <CardDescription>Member since January 2024</CardDescription>
                </div>
                <Button variant="outline" onClick={handleEditProfile}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>john.doe@email.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>***-***-1234 (Hidden for privacy)</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>University Campus</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Joined January 15, 2024</span>
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">3</CardTitle>
            <CardDescription>Items Reported</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">2</CardTitle>
            <CardDescription>Items Returned</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">98%</CardTitle>
            <CardDescription>Trust Score</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* My Items */}
      <Card>
        <CardHeader>
          <CardTitle>My Items</CardTitle>
          <CardDescription>Items you've reported as lost or found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userItems.map((item, index) => (
              <div key={item.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Reported on {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={item.type === "found" ? "default" : "secondary"}>
                      {item.type === "found" ? "Found" : "Lost"}
                    </Badge>
                    <Badge variant={item.status === "returned" ? "default" : "outline"}>
                      {item.status === "returned" ? "Returned" : "Active"}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewItem(item.id, item.title)}
                    >
                      View
                    </Button>
                  </div>
                </div>
                {index < userItems.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};