import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Copy, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const apiKeys = [
  { name: "Production API Key", key: "sk_live_xxxxxxxxxxxxxxxx", created: "2024-01-15", lastUsed: "2 hours ago", status: "active" },
  { name: "Development API Key", key: "sk_test_xxxxxxxxxxxxxxxx", created: "2024-01-10", lastUsed: "5 minutes ago", status: "active" },
  { name: "Staging API Key", key: "sk_stag_xxxxxxxxxxxxxxxx", created: "2024-01-05", lastUsed: "1 day ago", status: "active" },
];

const endpoints = [
  { method: "GET", path: "/api/users", description: "Get all users", calls: "1.2M" },
  { method: "POST", path: "/api/users", description: "Create new user", calls: "234K" },
  { method: "GET", path: "/api/products", description: "Get all products", calls: "856K" },
  { method: "PUT", path: "/api/products/:id", description: "Update product", calls: "145K" },
  { method: "DELETE", path: "/api/products/:id", description: "Delete product", calls: "23K" },
];

export default function Api() {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const toggleKeyVisibility = (keyName: string) => {
    setVisibleKeys(prev => {
      const next = new Set(prev);
      if (next.has(keyName)) {
        next.delete(keyName);
      } else {
        next.add(keyName);
      }
      return next;
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">API Management</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage API keys and endpoints</p>
          </div>
          <Button className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            New API Key
          </Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.name} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/50">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{apiKey.name}</span>
                      <Badge className="bg-success text-success-foreground">{apiKey.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-muted-foreground">
                        {visibleKeys.has(apiKey.name) ? apiKey.key : apiKey.key.replace(/x/g, '•')}
                      </code>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => toggleKeyVisibility(apiKey.name)}
                      >
                        {visibleKeys.has(apiKey.name) ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Created {apiKey.created} • Last used {apiKey.lastUsed}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>Available API endpoints and their usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Badge variant={endpoint.method === "GET" ? "default" : endpoint.method === "POST" ? "secondary" : "outline"}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm">{endpoint.path}</code>
                      <span className="text-sm text-muted-foreground">{endpoint.description}</span>
                    </div>
                    <span className="text-sm font-medium">{endpoint.calls} calls</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
