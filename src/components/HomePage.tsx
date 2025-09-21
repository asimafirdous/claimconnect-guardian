import { Search, Plus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockItems = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    description: "Black iPhone 14 Pro found near library",
    type: "found",
    location: "University Library",
    date: "2 hours ago",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Blue Backpack",
    description: "Lost blue backpack with laptop inside",
    type: "lost",
    location: "Student Center",
    date: "5 hours ago",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Car Keys",
    description: "Toyota keys found in parking lot",
    type: "found",
    location: "Parking Lot B",
    date: "1 day ago",
    image: "/placeholder.svg"
  }
];

export const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Welcome to ClaimConnect</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect lost items with their owners. Report lost items or help others by reporting found items.
        </p>
      </div>

      {/* Search and Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search for lost or found items..." 
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Report Item
        </Button>
      </div>

      {/* Recent Items */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Recent Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {item.location}
                    </div>
                  </div>
                  <Badge variant={item.type === "found" ? "default" : "secondary"}>
                    {item.type === "found" ? "Found" : "Lost"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">156</CardTitle>
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
    </div>
  );
};