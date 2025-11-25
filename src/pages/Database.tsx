import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Database, HardDrive, Cpu, Save } from "lucide-react";

const metrics = [
  {
    id: "storage",
    title: "Data Storage",
    used: "4.2 GB",
    total: "10 GB",
    value: 42,
    icon: Database,
    barColor: "bg-gradient-to-r from-blue-500 to-cyan-400",
    link: "/database/data-storage",
  },
  {
    id: "files",
    title: "File Storage",
    used: "8.5 GB",
    total: "25 GB",
    value: 34,
    icon: HardDrive,
    barColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    link: "/database/file-storage",
  },
  {
    id: "system",
    title: "System Usage",
    used: "CPU: 68%",
    total: "Mem: 65%",
    value: 68,
    icon: Cpu,
    barColor: "bg-gradient-to-r from-orange-500 to-red-500",
    link: "/database/system-usage",
  },
];

export default function DatabaseDashboard() {
  return (
    // Full Page Container: Adaptive Gradient Background
    <div className="min-h-screen w-full md:p-10 transition-colors duration-300">
      
      {/* Header */}
      <div className="mb-8 space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-slate-400">
          Database Overview
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Real-time monitoring of storage, system resources, and backups.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {metrics.map((item) => (
          <Card 
            key={item.id} 
            className="border shadow-lg transition-all duration-300 hover:shadow-xl
              border-gray-200 bg-white/60 backdrop-blur-lg
              dark:border-slate-800 dark:bg-slate-900/50"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-lg font-medium text-foreground">
                  {item.title}
                </CardTitle>
                <CardDescription>
                  {item.used} <span className="opacity-70">/ {item.total}</span>
                </CardDescription>
              </div>
              <div className="p-2 rounded-lg bg-secondary text-primary">
                <item.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              {/* Progress Bar Track */}
              <div className="h-3 w-full rounded-full overflow-hidden mt-2 bg-secondary">
                {/* Gradient Fill */}
                <div 
                  className={`h-full ${item.barColor} transition-all duration-500`} 
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <Link to={item.link} className="mt-6 inline-block w-full">
                <Button variant="outline" className="w-full border-input hover:bg-accent hover:text-accent-foreground">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}

        {/* Backup Card */}
        <Card className="border shadow-lg backdrop-blur-lg
          border-indigo-100 bg-indigo-50/50 
          dark:border-slate-800 dark:bg-gradient-to-br dark:from-indigo-900/20 dark:to-purple-900/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium text-foreground">Backups</CardTitle>
              <Save className="h-5 w-5 text-indigo-500" />
            </div>
            <CardDescription>Last backup: 2 hours ago</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-3 w-full rounded-full overflow-hidden mt-2 bg-secondary">
                <div className="h-full w-full bg-indigo-500/40 animate-pulse" />
            </div>
            <Link to="/database/backups" className="mt-6 inline-block w-full">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-0 dark:hover:bg-indigo-500">
                Manage Backups
              </Button>
            </Link>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}