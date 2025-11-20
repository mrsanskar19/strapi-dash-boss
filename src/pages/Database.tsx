import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

export default function DatabaseOverview() {
  // Example static data for overview - replace with real data from props or API
  const databaseName = "ProjectDB";
  const tablesCount = 12;
  const recordsCount = 23450;
  const lastBackup = "2025-11-18 10:00 AM";

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{databaseName} Overview</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Overview of your database stats and actions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export Database</span>
            </Button>
            <Button className="gap-2 flex-1 sm:flex-none">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Table</span>
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Tables</p>
            <p className="text-3xl font-semibold">{tablesCount}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Records</p>
            <p className="text-3xl font-semibold">{recordsCount.toLocaleString()}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Last Backup</p>
            <p className="text-lg font-medium">{lastBackup}</p>
          </div>
        </div>

        {/* Additional details or actions */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <p className="text-muted-foreground">No recent activity to show.</p>
        </div>
      </div>
    </>
  );
}
