import { DashboardLayout } from "@/components/DashboardLayout";
import { ApplicationCard } from "@/components/ApplicationCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const applications = [
  { name: "User Service", status: "active" as const, requests: "1.2M", uptime: "99.9%", lastDeployed: "2 hours ago" },
  { name: "Payment API", status: "active" as const, requests: "856K", uptime: "99.8%", lastDeployed: "5 hours ago" },
  { name: "Notification Service", status: "inactive" as const, requests: "0", uptime: "0%", lastDeployed: "1 day ago" },
  { name: "Analytics Engine", status: "active" as const, requests: "2.4M", uptime: "99.95%", lastDeployed: "3 hours ago" },
  { name: "Email Service", status: "active" as const, requests: "543K", uptime: "99.7%", lastDeployed: "1 day ago" },
  { name: "File Storage", status: "active" as const, requests: "1.8M", uptime: "99.99%", lastDeployed: "6 hours ago" },
];

export default function Applications() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Applications</h2>
            <p className="text-muted-foreground mt-1">Manage your backend applications and services</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Application
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <ApplicationCard key={app.name} {...app} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
