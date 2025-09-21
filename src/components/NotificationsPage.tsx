import { useState } from "react";
import { Eye, EyeOff, Check, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: "match" | "claim" | "admin";
  title: string;
  description: string;
  itemName: string;
  location: string;
  reporterContact: string;
  isRead: boolean;
  timestamp: string;
  urgency: "high" | "medium" | "low";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "match",
    title: "Potential Match Found!",
    description: "Someone found an item matching your lost iPhone 14 Pro",
    itemName: "iPhone 14 Pro",
    location: "University Library",
    reporterContact: "***-***-5678",
    isRead: false,
    timestamp: "2 hours ago",
    urgency: "high"
  },
  {
    id: "2",
    type: "claim",
    title: "Someone Claimed Your Found Item",
    description: "A user has claimed the blue backpack you reported as found",
    itemName: "Blue Backpack",
    location: "Student Center",
    reporterContact: "***-***-9012",
    isRead: false,
    timestamp: "5 hours ago",
    urgency: "medium"
  },
  {
    id: "3",
    type: "admin",
    title: "Admin Verification Required",
    description: "Please provide additional proof of ownership for your claimed item",
    itemName: "Car Keys",
    location: "Parking Lot B",
    reporterContact: "admin@claimconnect.com",
    isRead: true,
    timestamp: "1 day ago",
    urgency: "medium"
  }
];

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const { toast } = useToast();

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    toast({
      title: "Marked as Read",
      description: "Notification has been marked as read.",
    });
  };

  const contactAdmin = (notification: Notification) => {
    toast({
      title: "Contacting Admin",
      description: "Opening secure chat with admin team...",
    });
  };

  const claimItem = (notification: Notification) => {
    toast({
      title: "Claim Initiated",
      description: "Your claim request has been sent to the admin for verification.",
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "match": return "🔍";
      case "claim": return "✋";
      case "admin": return "👨‍💼";
      default: return "📢";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
          <p className="text-muted-foreground">
            {notifications.filter(n => !n.isRead).length} unread notifications
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}
        >
          Mark All as Read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <Card key={notification.id} className={`${!notification.isRead ? 'ring-2 ring-primary/20' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{notification.title}</CardTitle>
                      {!notification.isRead && (
                        <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
                      )}
                    </div>
                    <CardDescription>{notification.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getUrgencyColor(notification.urgency)}>
                    {notification.urgency}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Item: {notification.itemName}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {notification.location}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Contact (Protected):</p>
                  <p className="text-sm text-muted-foreground">{notification.reporterContact}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  {!notification.isRead && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Mark as Read
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {notification.type === "match" && (
                    <Button 
                      size="sm"
                      onClick={() => claimItem(notification)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Claim Item
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => contactAdmin(notification)}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Contact Admin
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No notifications yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};