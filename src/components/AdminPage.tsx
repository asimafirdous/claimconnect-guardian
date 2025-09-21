import { useState } from "react";
import { Users, Package, CheckCircle, AlertTriangle, MessageSquare, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const pendingClaims = [
  {
    id: "1",
    itemName: "iPhone 14 Pro",
    claimant: "John Doe",
    finder: "Jane Smith",
    location: "Library",
    status: "pending_verification",
    submittedAt: "2024-01-15 10:30",
    matchScore: 95
  },
  {
    id: "2",
    itemName: "Blue Backpack",
    claimant: "Mike Johnson",
    finder: "Sarah Wilson",
    location: "Student Center",
    status: "awaiting_proof",
    submittedAt: "2024-01-15 09:15",
    matchScore: 88
  }
];

const userReports = [
  {
    id: "1",
    user: "Alice Brown",
    item: "Lost Wallet",
    type: "lost",
    status: "active",
    reportedAt: "2024-01-14 16:20",
    trustScore: 98
  },
  {
    id: "2",
    user: "Bob Davis",
    item: "Found Keys",
    type: "found",
    status: "claimed",
    reportedAt: "2024-01-14 14:45",
    trustScore: 95
  }
];

export const AdminPage = () => {
  const { toast } = useToast();

  const approveClaim = (claimId: string) => {
    toast({
      title: "Claim Approved",
      description: "The claim has been approved and users will be notified.",
    });
  };

  const rejectClaim = (claimId: string) => {
    toast({
      title: "Claim Rejected",
      description: "The claim has been rejected with feedback sent to the user.",
    });
  };

  const contactUser = (userId: string) => {
    toast({
      title: "Opening Chat",
      description: "Opening secure chat channel with user...",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Admin Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage ClaimConnect platform and user interactions</p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Shield className="h-4 w-4 mr-2" />
          Admin Access
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">234</div>
            <p className="text-xs text-muted-foreground">+18 from yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Processed</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">89</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">94%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="claims" className="space-y-4">
        <TabsList>
          <TabsTrigger value="claims">Pending Claims</TabsTrigger>
          <TabsTrigger value="reports">User Reports</TabsTrigger>
          <TabsTrigger value="matches">Item Matches</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Claims Review</CardTitle>
              <CardDescription>Claims requiring admin verification and approval</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Claimant</TableHead>
                    <TableHead>Finder</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Match Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.itemName}</TableCell>
                      <TableCell>{claim.claimant}</TableCell>
                      <TableCell>{claim.finder}</TableCell>
                      <TableCell>{claim.location}</TableCell>
                      <TableCell>
                        <Badge variant={claim.matchScore > 90 ? "default" : "secondary"}>
                          {claim.matchScore}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{claim.status.replace('_', ' ')}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => approveClaim(claim.id)}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => rejectClaim(claim.id)}
                          >
                            Reject
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => contactUser(claim.claimant)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Reports</CardTitle>
              <CardDescription>All lost and found item reports from users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trust Score</TableHead>
                    <TableHead>Reported At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.user}</TableCell>
                      <TableCell>{report.item}</TableCell>
                      <TableCell>
                        <Badge variant={report.type === "found" ? "default" : "secondary"}>
                          {report.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={report.trustScore > 95 ? "default" : "secondary"}>
                          {report.trustScore}%
                        </Badge>
                      </TableCell>
                      <TableCell>{report.reportedAt}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => contactUser(report.user)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Matches</CardTitle>
              <CardDescription>Potential matches between lost and found items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No pending matches to review</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and trust scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">User management tools coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};