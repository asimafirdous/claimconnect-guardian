import { Search, Plus, MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ItemDetailsModal } from "@/components/ItemDetailsModal";

interface HomePageProps {
  onNavigateToReport?: () => void;
  userName: string;
  recentItems?: any[];
  onItemsUpdate?: (items: any[]) => void;
}

const initialMockItems = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    description: "Black iPhone 14 Pro found near library, has a cracked screen protector and blue phone case",
    type: "found",
    location: "University Library",
    date: "2 hours ago",
    image: "/placeholder.svg",
    reporterName: "Sarah Wilson",
    reporterEmail: "sarah.wilson@email.com",
    reporterPhone: "+1 (555) 123-4567",
    category: "electronics",
    additionalDetails: "Found on the second floor near the computer section. Has a distinctive blue case with initials 'J.D.' on the back."
  },
  {
    id: 2,
    title: "Blue Backpack",
    description: "Lost blue backpack with laptop inside, Jansport brand with multiple pockets",
    type: "lost",
    location: "Student Center",
    date: "5 hours ago",
    image: "/placeholder.svg",
    reporterName: "Mike Johnson",
    reporterEmail: "mike.johnson@email.com",
    reporterPhone: "+1 (555) 987-6543",
    category: "accessories",
    additionalDetails: "Contains important documents and a Dell laptop. Has a small tear on the right side pocket."
  },
  {
    id: 3,
    title: "Car Keys",
    description: "Toyota keys found in parking lot, has a red keychain with house keys attached",
    type: "found",
    location: "Parking Lot B",
    date: "1 day ago",
    image: "/placeholder.svg",
    reporterName: "Emma Davis",
    reporterEmail: "emma.davis@email.com",
    category: "keys",
    additionalDetails: "Found near space 45. Has 2 house keys and a small flashlight attached to the keychain."
  }
];

export const HomePage = ({ onNavigateToReport, userName, recentItems, onItemsUpdate }: HomePageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState(recentItems || initialMockItems);
  const { toast } = useToast();

  const handleReportItemClick = () => {
    if (onNavigateToReport) {
      onNavigateToReport();
    } else {
      toast({
        title: "Redirecting to Report Page",
        description: "Opening the report form...",
      });
    }
  };

  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching...",
        description: `Searching for "${searchQuery}"`,
      });
    }
  };

  const showNewItemNotification = (item: any) => {
    toast({
      title: "🔔 New Item Reported!",
      description: `${item.reporterName} just reported a ${item.type} item: ${item.title}`,
    });
  };

  const addNewItem = (newItem: any) => {
    const updatedItems = [newItem, ...items];
    setItems(updatedItems);
    if (onItemsUpdate) {
      onItemsUpdate(updatedItems);
    }
    showNewItemNotification(newItem);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6">
          <h2 className="text-3xl font-bold text-foreground">Welcome {userName}!</h2>
          <p className="text-lg font-medium text-primary italic">
            "What if finding things is as easy as losing them"
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            That's what ClaimConnect does, now finding things has been made easy and quick
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for lost or found items..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="button" onClick={handleReportItemClick}>
            <Plus className="h-4 w-4 mr-2" />
            Report Item
          </Button>
        </form>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Live Updates</span>
          </div>
          <p className="text-sm text-blue-700 mt-1">
            You'll be notified instantly when someone reports a new lost or found item!
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Recent Items</h3>
            <Badge variant="outline" className="text-sm">
              {items.length} items available
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.location}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        By: {item.reporterName}
                      </div>
                    </div>
                    <Badge variant={item.type === "found" ? "default" : "secondary"}>
                      {item.type === "found" ? "Found" : "Lost"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewDetails(item)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items reported yet. Be the first to help!</p>
              <Button className="mt-4" onClick={handleReportItemClick}>
                <Plus className="h-4 w-4 mr-2" />
                Report First Item
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                {items.filter(item => item.type === "found").length}
              </CardTitle>
              <CardDescription>Items Found</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">89</CardTitle>
              <CardDescription>Items Returned</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">234</CardTitle>
              <CardDescription>Active Users</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => {
              const newItem = {
                id: Date.now(),
                title: "Lost Wallet",
                description: "Brown leather wallet lost near cafeteria",
                type: "lost",
                location: "Main Cafeteria",
                date: "Just now",
                image: "/placeholder.svg",
                reporterName: "Alex Thompson",
                reporterEmail: "alex.thompson@email.com",
                category: "accessories"
              };
              addNewItem(newItem);
            }}
          >
            <Bell className="h-4 w-4 mr-2" />
            Demo: Simulate New Item Report
          </Button>
        </div>
      </div>

      <ItemDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        currentUserName={userName}
      />
    </>
  );
};