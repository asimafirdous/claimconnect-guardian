import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/components/HomePage";
import { ProfilePage } from "@/components/ProfilePage";
import { ReportPage } from "@/components/ReportPage";
import { NotificationsPage } from "@/components/NotificationsPage";
import { AdminPage } from "@/components/AdminPage";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [notificationCount] = useState(3); // Mock notification count

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "profile":
        return <ProfilePage />;
      case "report":
        return <ReportPage />;
      case "notifications":
        return <NotificationsPage />;
      case "admin":
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === "admin") {
      // In real app, check admin permissions
      setActiveTab(tab);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        notificationCount={notificationCount}
      />
      <main>
        {activeTab === "admin" ? <AdminPage /> : renderContent()}
      </main>
    </div>
  );
};

export default Index;
