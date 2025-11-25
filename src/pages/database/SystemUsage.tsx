import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Activity, Cpu, Zap, Terminal, AlertCircle, Clock, Server } from "lucide-react";

// Types for our data
type LogLevel = "info" | "warning" | "error" | "success";

interface LogEntry {
  id: number;
  timestamp: string;
  level: LogLevel;
  message: string;
}

// Helper to generate mock live data
const generateRandomMetric = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const LogBadge = ({ level }: { level: LogLevel }) => {
  const styles = {
    info: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
    warning: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
    error: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
    success: "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
  };
  return <Badge variant="outline" className={`${styles[level]} uppercase text-[10px] w-16 justify-center`}>{level}</Badge>;
};

export default function SystemUsage() {
  // State for Real-time metrics
  const [cpu, setCpu] = useState(45);
  const [memory, setMemory] = useState(52); // Percentage
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, timestamp: new Date().toLocaleTimeString(), level: "info", message: "System monitoring initialized" },
    { id: 2, timestamp: new Date().toLocaleTimeString(), level: "success", message: "Database connection established" },
  ]);

  // Ref for auto-scrolling logs
  const scrollRef = useRef<HTMLDivElement>(null);

  // SIMULATION: Update Metrics every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate fluctuation
      setCpu((prev) => {
        const change = generateRandomMetric(-15, 15);
        const newVal = prev + change;
        return Math.min(Math.max(newVal, 10), 95); // Clamp between 10% and 95%
      });

      setMemory((prev) => {
        const change = generateRandomMetric(-5, 5);
        const newVal = prev + change;
        return Math.min(Math.max(newVal, 30), 99);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // SIMULATION: Inject random logs every 5 seconds
  useEffect(() => {
    const messages = [
      { level: "info", text: "Health check passed" },
      { level: "info", text: "Garbage collection completed" },
      { level: "warning", text: "High latency on API /v1/users" },
      { level: "success", text: "Backup snapshot saved" },
      { level: "error", text: "Timeout waiting for external service" },
      { level: "info", text: "User session authenticated" },
    ];

    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const newLog: LogEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        level: randomMsg.level as LogLevel,
        message: randomMsg.text,
      };

      setLogs((prev) => {
        const newLogs = [...prev, newLog];
        // Keep only last 50 logs
        return newLogs.slice(-50);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom of logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Dynamic Color helpers
  const getProgressColor = (value: number) => {
    if (value < 50) return "bg-emerald-500";
    if (value < 80) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 md:p-10 text-slate-800">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">System Health</h2>
          <p className="text-slate-500 mt-1">Live monitoring of server resources and application logs.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Updates Active
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* CPU Card */}
        <Card className="border-slate-100 bg-white/80 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">CPU Load</CardTitle>
                <Cpu className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-900">{cpu}%</div>
                <p className="text-xs text-slate-500 mb-4">4 Cores Active</p>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 ease-out ${getProgressColor(cpu)}`} 
                        style={{ width: `${cpu}%` }} 
                    />
                </div>
            </CardContent>
        </Card>

        {/* Memory Card */}
        <Card className="border-slate-100 bg-white/80 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Memory Usage</CardTitle>
                <Zap className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-900">{((memory / 100) * 8).toFixed(1)} GB <span className="text-sm font-normal text-slate-400">/ 8 GB</span></div>
                <p className="text-xs text-slate-500 mb-4">{memory}% Allocated</p>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 ease-out ${getProgressColor(memory)}`} 
                        style={{ width: `${memory}%` }} 
                    />
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Logs Section */}
      <Card className="border-slate-100 bg-white shadow-lg overflow-hidden flex flex-col h-[500px]">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-200 rounded-md">
                    <Terminal className="h-4 w-4 text-slate-600" />
                </div>
                <div>
                    <CardTitle className="text-lg font-semibold text-slate-800">System Logs</CardTitle>
                    <CardDescription>Real-time server events stream.</CardDescription>
                </div>
            </div>
            <Server className="h-5 w-5 text-slate-300" />
          </div>
        </CardHeader>
        
        {/* Scrollable Log Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-0 scroll-smooth">
            <Table>
                <TableHeader className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                    <TableRow className="border-slate-100 hover:bg-slate-50">
                        <TableHead className="w-[180px] text-slate-500 pl-6">
                            <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> Timestamp</div>
                        </TableHead>
                        <TableHead className="w-[120px] text-slate-500">Level</TableHead>
                        <TableHead className="text-slate-500">Message</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {logs.map((log) => (
                        <TableRow key={log.id} className="border-slate-50 hover:bg-blue-50/30 transition-colors">
                            <TableCell className="font-mono text-xs text-slate-500 pl-6">{log.timestamp}</TableCell>
                            <TableCell>
                                <LogBadge level={log.level} />
                            </TableCell>
                            <TableCell className="font-medium text-slate-700 text-sm">{log.message}</TableCell>
                        </TableRow>
                    ))}
                    {/* Dummy row to ensure scrolling shows the last item clearly */}
                    <TableRow><TableCell colSpan={3} className="h-4 border-0"></TableCell></TableRow>
                </TableBody>
            </Table>
        </div>
      </Card>
    </div>
  );
}