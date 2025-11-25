import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Cloud, 
  HardDrive, 
  RotateCcw, 
  Download, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Settings,
  Database
} from "lucide-react";

// Mock Data: Backup Providers
const initialProviders = [
  { id: "local", name: "Local Server", icon: HardDrive, connected: true, lastSync: "10 mins ago", color: "text-slate-600" },
  { id: "gdrive", name: "Google Drive", icon: Cloud, connected: true, lastSync: "2 hours ago", color: "text-blue-500" },
  { id: "s3", name: "Amazon S3", icon: Database, connected: false, lastSync: "Never", color: "text-orange-500" },
  { id: "dropbox", name: "Dropbox", icon: Cloud, connected: false, lastSync: "Never", color: "text-indigo-500" },
];

// Mock Data: Backup History
const initialBackups = [
  { id: "bk-104", timestamp: "Today, 10:00 AM", size: "1.2 GB", status: "Completed", type: "Google Drive" },
  { id: "bk-103", timestamp: "Yesterday, 10:00 AM", size: "1.1 GB", status: "Completed", type: "Local Server" },
  { id: "bk-102", timestamp: "Oct 25, 10:00 AM", size: "1.0 GB", status: "Completed", type: "Local Server" },
  { id: "bk-101", timestamp: "Oct 24, 10:00 AM", size: "900 MB", status: "Failed", type: "Amazon S3" },
];

export default function Backups() {
  const [isCreating, setIsCreating] = useState(false);
  const [providers, setProviders] = useState(initialProviders);

  const handleCreateBackup = () => {
    setIsCreating(true);
    // Simulate network request
    setTimeout(() => setIsCreating(false), 2000);
  };

  const toggleProvider = (id: string) => {
    setProviders(providers.map(p => 
      p.id === id ? { ...p, connected: !p.connected } : p
    ));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 md:p-10 text-slate-800">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Backup & Recovery</h2>
          <p className="text-slate-500 mt-1">Manage automated snapshots and disaster recovery protocols.</p>
        </div>
        <Button 
          onClick={handleCreateBackup} 
          disabled={isCreating}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
        >
          {isCreating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
          {isCreating ? "Creating Snapshot..." : "Create New Backup"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Left Column: Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-slate-100 bg-white/80 backdrop-blur-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">Destinations</CardTitle>
              <CardDescription>Configure where backups are stored.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {providers.map((provider) => (
                <div key={provider.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-white transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md bg-white border border-slate-100 shadow-sm ${provider.color}`}>
                      <provider.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{provider.name}</p>
                      <p className="text-xs text-slate-500">
                        {provider.connected ? `Synced: ${provider.lastSync}` : "Not Configured"}
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={provider.connected}
                    onCheckedChange={() => toggleProvider(provider.id)}
                  />
                </div>
              ))}
            </CardContent>
            <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4">
               <Button variant="outline" className="w-full text-xs h-8 border-dashed border-slate-300 text-slate-500 hover:text-blue-600">
                  <Settings className="mr-2 h-3 w-3" /> Advanced Settings
               </Button>
            </CardFooter>
          </Card>

          {/* Schedule Card */}
          <Card className="border-blue-100 bg-blue-50/30">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600 mt-1">
                <RotateCcw className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-900">Auto-Backup Enabled</h4>
                <p className="text-xs text-blue-700 mt-1">
                  System creates a snapshot every day at 00:00 UTC. Next backup in 4 hours.
                </p>
                <Button variant="link" className="p-0 h-auto text-xs text-blue-600 mt-2 font-medium">
                  Change Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: History Table */}
        <div className="lg:col-span-2">
          <Card className="border-slate-100 bg-white/80 backdrop-blur-xl shadow-lg h-full">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <div>
                   <CardTitle className="text-xl text-slate-800">Recent Snapshots</CardTitle>
                   <CardDescription>History of system restoration points.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs">Filter</Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs">Export Log</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-slate-100 bg-slate-50/50">
                    <TableHead className="w-[180px]">Snapshot ID</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialBackups.map((backup) => (
                    <TableRow key={backup.id} className="border-slate-100 hover:bg-slate-50 transition-colors">
                      <TableCell>
                        <div className="font-medium text-slate-700">{backup.id}</div>
                        <div className="text-xs text-slate-500">{backup.timestamp}</div>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-2 text-sm text-slate-600">
                            {backup.type.includes("Google") ? <Cloud className="h-3 w-3" /> : <HardDrive className="h-3 w-3" />}
                            {backup.type}
                         </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-slate-600">{backup.size}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${backup.status === "Completed" 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                              : "bg-red-50 text-red-700 border-red-200"}
                          `}
                        >
                          {backup.status === "Completed" ? (
                            <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Success</div>
                          ) : (
                            <div className="flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Failed</div>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50" title="Download">
                                <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50" title="Restore">
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}