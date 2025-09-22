import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/components/HomePage";
import { ProfilePage } from "@/components/ProfilePage";
import { ReportPage } from "@/components/ReportPage";
import { NotificationsPage } from "@/components/NotificationsPage";
import { AdminPage } from "@/components/AdminPage";
import { AuthSystem } from "@/components/AuthSystem";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [notificationCount, setNotificationCount] = useState(3);
  const [user, setUser] = useState<UserData | null>(null);
  const [recentItems, setRecentItems] = useState<any[]>([]);

  const handleAuthSuccess = (userData: UserData) => {
    setUser(userData);
  };

  const handleItemsUpdate = (items: any[]) => {
    setRecentItems(items);
    setNotificationCount(prev => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomePage 
            onNavigateToReport={() => setActiveTab("report")}
            userName={user?.name || "User"}
            recentItems={recentItems}
            onItemsUpdate={handleItemsUpdate}
          />
        );
      case "profile":
        return <ProfilePage />;
      case "report":
        return <ReportPage />;
      case "notifications":
        return <NotificationsPage />;
      case "admin":
        return <AdminPage />;
      default:
        return (
          <HomePage 
            onNavigateToReport={() => setActiveTab("report")}
            userName={user?.name || "User"}
            recentItems={recentItems}
            onItemsUpdate={handleItemsUpdate}
          />
        );
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (!user) {
    return <AuthSystem onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        notificationCount={notificationCount}
      />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;