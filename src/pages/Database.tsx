import { DashboardLayout } from "@/components/DashboardLayout";
import { DatabaseTable } from "@/components/DatabaseTable";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Database() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Database</h2>
            <p className="text-muted-foreground mt-1">Manage your database tables and records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Table
            </Button>
          </div>
        </div>

        <Tabs defaultValue="tables" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="queries">Queries</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
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
