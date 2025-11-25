import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Database, Server, Edit2, Plus, Wifi, AlertCircle, HardDrive } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock Data (Removed 'comments' as requested)
const tableData = [
  { name: "public.users", size: "1.5 GB", rows: "1.2M" },
  { name: "public.posts", size: "1.2 GB", rows: "850K" },
  { name: "public.products", size: "700 MB", rows: "45K" },
  { name: "public.logs", size: "500 MB", rows: "2.1M" },
];

export default function DataStorage() {
  // State to simulate if a DB connection exists
  const [hasConnection, setHasConnection] = useState(true);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 md:p-10 text-slate-800">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Storage & Configuration</h2>
          <p className="text-slate-500 mt-1">Manage database connections and storage allocation.</p>
        </div>
        {/* Toggle for Demo Purposes */}
        <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setHasConnection(!hasConnection)}
            className="text-xs text-slate-400 border-dashed border-slate-300"
        >
            {hasConnection ? "Simulate: No DB Found" : "Simulate: DB Connected"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Left Column: Usage & Config */}
        <div className="lg:col-span-1 space-y-6">
            {/* 1. Total Usage Card */}
            <Card className="border-slate-100 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-slate-800">Total Usage</CardTitle>
                    <HardDrive className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>4.2 GB used of 10 GB quota</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-[42%] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                </div>
                <p className="text-right text-xs font-medium text-blue-600 mt-2">42% Used</p>
                </CardContent>
            </Card>

            {/* 2. Database Configuration Card (Dynamic State) */}
            <Card className={`border-slate-100 shadow-lg transition-all duration-300 ${!hasConnection ? 'border-dashed border-2 border-slate-300 bg-slate-50/50' : 'bg-white/80 backdrop-blur-xl'}`}>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-slate-800">Configuration</CardTitle>
                        <Server className={`h-5 w-5 ${hasConnection ? 'text-green-500' : 'text-slate-400'}`} />
                    </div>
                    <CardDescription>
                        {hasConnection ? "Current active connection details." : "No active database connection detected."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {hasConnection ? (
                        // STATE A: Connected - Show Details
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm font-medium text-slate-700">Status</span>
                                </div>
                                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Connected</Badge>
                            </div>
                            
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500">Host</span>
                                    <span className="font-mono text-slate-800">aws-us-east-1.rds.com</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500">Port</span>
                                    <span className="font-mono text-slate-800">5432</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500">Database</span>
                                    <span className="font-mono text-slate-800">production_db_v2</span>
                                </div>
                                <div className="flex justify-between pb-1">
                                    <span className="text-slate-500">User</span>
                                    <span className="font-mono text-slate-800">admin_main</span>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full mt-4 border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50">
                                <Edit2 className="mr-2 h-4 w-4" /> Edit Configuration
                            </Button>
                        </div>
                    ) : (
                        // STATE B: Not Connected - Show Add New
                        <div className="text-center py-6 space-y-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-2">
                                <AlertCircle className="h-6 w-6 text-slate-400" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-slate-900">Missing Configuration</p>
                                <p className="text-xs text-slate-500 max-w-[200px] mx-auto">Connect to a generic PostgreSQL or MySQL instance to start.</p>
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-md hover:shadow-blue-200/50">
                                <Plus className="mr-2 h-4 w-4" /> Add New Connection
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Tables Data */}
        <div className="lg:col-span-2">
            <Card className="h-full border-slate-100 bg-white/80 backdrop-blur-xl shadow-lg overflow-hidden">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl text-slate-800">Storage by Table</CardTitle>
                            <CardDescription>Breakdown of size per database table.</CardDescription>
                        </div>
                        <Database className="h-5 w-5 text-indigo-400" />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {hasConnection ? (
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-slate-100">
                                    <TableHead className="w-[200px]">Table Name</TableHead>
                                    <TableHead className="text-center">Row Count</TableHead>
                                    <TableHead className="text-right">Size</TableHead>
                                    <TableHead className="text-right">Allocation</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tableData.map((table) => (
                                    <TableRow key={table.name} className="hover:bg-blue-50/50 transition-colors cursor-pointer border-slate-100">
                                        <TableCell className="font-medium text-slate-700">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                                                {table.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center text-slate-500 font-mono text-xs">{table.rows}</TableCell>
                                        <TableCell className="text-right font-bold text-slate-700">{table.size}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="w-24 ml-auto h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-400" style={{ width: '60%' }}></div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        // Empty Table State
                        <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
                            <Wifi className="h-10 w-10 mb-3 opacity-20" />
                            <p>No data available.</p>
                            <p className="text-sm">Please connect a database first.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}