import { Home, User, FileText, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notificationCount?: number;
}

export const Navigation = ({ activeTab, onTabChange, notificationCount = 0 }: NavigationProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "report", label: "Report Item", icon: FileText },
    { id: "notifications", label: "Notifications", icon: Bell, count: notificationCount },
  ];

  const handleAdminClick = () => {
    onTabChange("admin");
  };

  return (
    <nav className="bg-card border-b border-border px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/favicon.png" 
            alt="ClaimConnect Logo" 
            className="h-8 w-8" 
          />
          <h1 className="text-2xl font-bold text-primary">ClaimConnect</h1>
        </div>

        <div className="flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                onClick={() => onTabChange(item.id)}
                className="relative"
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.label}
                {item.count && item.count > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {item.count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        <Button 
          variant={activeTab === "admin" ? "default" : "outline"} 
          size="sm"
          onClick={handleAdminClick}
        >
          <Settings className="h-4 w-4 mr-2" />
          Admin
        </Button>
      </div>
    </nav>
  );
};