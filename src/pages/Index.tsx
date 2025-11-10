import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { ApplicationCard } from "@/components/ApplicationCard";
import { DatabaseTable } from "@/components/DatabaseTable";
import { Server, Database, Activity, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
            <p className="text-muted-foreground mt-1">Monitor and manage your backend infrastructure</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Application
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Applications"
            value={12}
            icon={Server}
            trend={{ value: "+2 this month", isPositive: true }}
            variant="primary"
          />
          <StatCard
            title="Database Tables"
            value={48}
            icon={Database}
            trend={{ value: "+5 this week", isPositive: true }}
            variant="success"
          />
          <StatCard
            title="API Requests"
            value="1.2M"
            icon={Activity}
            trend={{ value: "+12% from last month", isPositive: true }}
            variant="warning"
          />
          <StatCard
            title="Uptime"
            value="99.9%"
            icon={TrendingUp}
            trend={{ value: "Stable", isPositive: true }}
            variant="success"
          />
        </div>

        {/* Applications Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Applications</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ApplicationCard
              name="E-commerce API"
              status="active"
              requests="245K/day"
              uptime="99.9%"
              lastDeployed="2 hours ago"
            />
            <ApplicationCard
              name="Auth Service"
              status="active"
              requests="892K/day"
              uptime="99.8%"
              lastDeployed="1 day ago"
            />
            <ApplicationCard
              name="Analytics Engine"
              status="inactive"
              requests="0/day"
              uptime="0%"
              lastDeployed="5 days ago"
            />
          </div>
        </div>

        {/* Database Tables Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Database Tables</h3>
            <Button variant="ghost" size="sm">Manage All</Button>
          </div>
          <DatabaseTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
