import { DashboardLayout } from "@/components/DashboardLayout";
import { DatabaseTable } from "@/components/DatabaseTable";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Database() {
  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Database</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage your database tables and records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button className="gap-2 flex-1 sm:flex-none">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Table</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="tables" className="space-y-4 md:space-y-6">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="tables" className="flex-1 sm:flex-none">Tables</TabsTrigger>
            <TabsTrigger value="queries" className="flex-1 sm:flex-none">Queries</TabsTrigger>
            <TabsTrigger value="backups" className="flex-1 sm:flex-none">Backups</TabsTrigger>
          </TabsList>

          <TabsContent value="tables" className="space-y-4">
            <DatabaseTable />
          </TabsContent>

          <TabsContent value="queries" className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">Query builder coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="backups" className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">Backup management coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
