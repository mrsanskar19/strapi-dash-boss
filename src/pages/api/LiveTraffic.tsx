import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    Activity, 
    Globe, 
    Server, 
    Zap, 
    Clock, 
    AlertCircle, 
    Pause, 
    Play,
    Cpu,
    ArrowUpRight,
    ArrowDownRight,
    Terminal
} from 'lucide-react';

// --- Types ---
interface LogEntry {
    id: string;
    method: string;
    path: string;
    status: number;
    latency: string;
    ip: string;
    timestamp: string;
}

interface ServerNode {
    id: string;
    cpu: number;
    memory: number;
    status: 'healthy' | 'warning' | 'critical';
}

// --- Helper: Generate Random Data ---
const generateLog = (): LogEntry => {
    const methods = ["GET", "POST", "PUT", "DELETE"];
    const paths = ["/api/v1/users", "/auth/login", "/api/data/stream", "/images/avatar.png", "/webhook/stripe"];
    const statuses = [200, 200, 200, 201, 204, 400, 401, 404, 500];
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
        id: Math.random().toString(36).substr(2, 9),
        method: methods[Math.floor(Math.random() * methods.length)],
        path: paths[Math.floor(Math.random() * paths.length)],
        status: status,
        latency: Math.floor(Math.random() * 150 + 20) + "ms",
        ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        timestamp: new Date().toLocaleTimeString(),
    };
};

const initialNodes: ServerNode[] = [
    { id: "us-east-1a", cpu: 45, memory: 60, status: 'healthy' },
    { id: "us-east-1b", cpu: 32, memory: 40, status: 'healthy' },
    { id: "us-west-2a", cpu: 88, memory: 70, status: 'warning' },
    { id: "eu-central-1", cpu: 12, memory: 20, status: 'healthy' },
];

export default function LiveTrafficDashboard() {
    const [isLive, setIsLive] = useState(true);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [trafficData, setTrafficData] = useState<number[]>(new Array(30).fill(10)); // 30 data points
    const [nodes, setNodes] = useState<ServerNode[]>(initialNodes);
    
    // Stats
    const [rps, setRps] = useState(1240);
    const [latency, setLatency] = useState(45);
    const [errorRate, setErrorRate] = useState(0.02);

    const scrollRef = useRef<HTMLDivElement>(null);

    // --- The Heartbeat Effect ---
    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            // 1. Update Logs
            const newLog = generateLog();
            setLogs(prev => [newLog, ...prev].slice(0, 50)); // Keep last 50 logs

            // 2. Update Traffic Graph Data
            setTrafficData(prev => {
                const newData = [...prev.slice(1), Math.floor(Math.random() * 80) + 20];
                return newData;
            });

            // 3. Jitter Stats
            setRps(prev => prev + Math.floor(Math.random() * 200 - 100));
            setLatency(prev => Math.abs(prev + Math.floor(Math.random() * 10 - 5)));
            
            // 4. Update Node Health (Random fluctuation)
            setNodes(prev => prev.map(node => ({
                ...node,
                cpu: Math.min(100, Math.max(0, node.cpu + Math.floor(Math.random() * 10 - 5))),
                status: node.cpu > 80 ? 'warning' : 'healthy'
            })));

        }, 1000);

        return () => clearInterval(interval);
    }, [isLive]);

    // Auto-scroll logs (optional, usually preferred to stay at top for newest)
    // useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [logs]);

    // --- Custom SVG Line Chart Logic ---
    const maxVal = 120;
    const points = trafficData.map((val, i) => {
        const x = (i / (trafficData.length - 1)) * 100;
        const y = 100 - ((val / maxVal) * 100);
        return `${x},${y}`;
    }).join(" ");

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 space-y-6 font-sans text-gray-900">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <Activity className="w-8 h-8 text-indigo-600" />
                        Live Traffic Monitor
                    </h1>
                    <p className="text-gray-500 mt-1">Real-time insight into edge network performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex h-3 w-3 relative">
                        {isLive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    </span>
                    <span className="text-sm font-medium text-gray-600 mr-2">{isLive ? "LIVE UPDATES" : "PAUSED"}</span>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsLive(!isLive)}
                        className={isLive ? "border-red-200 hover:bg-red-50 text-red-600" : "border-green-200 hover:bg-green-50 text-green-600"}
                    >
                        {isLive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                        {isLive ? "Pause Stream" : "Resume Stream"}
                    </Button>
                </div>
            </div>

            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard 
                    title="Requests / Sec" 
                    value={rps.toLocaleString()} 
                    icon={Zap} 
                    trend="up" 
                    color="text-indigo-600" 
                />
                <MetricCard 
                    title="Avg Latency" 
                    value={`${latency}ms`} 
                    icon={Clock} 
                    trend={latency > 60 ? "down" : "up"} 
                    color="text-blue-600" 
                    subtext="Global Average"
                />
                <MetricCard 
                    title="Active Users" 
                    value="14,203" 
                    icon={Globe} 
                    trend="up" 
                    color="text-green-600" 
                />
                <MetricCard 
                    title="Error Rate" 
                    value={`${errorRate}%`} 
                    icon={AlertCircle} 
                    trend="down" 
                    color="text-orange-600" 
                    subtext="5xx Errors"
                />
            </div>

            {/* Bottom: Live Logs Terminal */}
            <Card className="bg-gray-950 text-gray-300 border-gray-800 shadow-xl">
                <CardHeader className="border-b border-gray-800 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-green-500" />
                            <CardTitle className="text-sm font-mono text-gray-100">Live Access Logs</CardTitle>
                        </div>
                        <div className="flex gap-2 text-xs text-gray-500 font-mono">
                            <span>tail -f /var/log/nginx/access.log</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="h-64 overflow-y-auto font-mono text-xs p-4 space-y-1 custom-scrollbar" ref={scrollRef}>
                        {logs.map((log, i) => (
                            <div key={log.id} className="flex gap-4 hover:bg-gray-900/50 p-0.5 rounded px-2 animate-in fade-in slide-in-from-left-2 duration-300">
                                <span className="text-gray-500 w-20">{log.timestamp}</span>
                                <span className={`w-12 font-bold ${log.status >= 500 ? 'text-red-500' : log.status >= 400 ? 'text-yellow-500' : 'text-green-500'}`}>
                                    {log.status}
                                </span>
                                <span className="text-blue-400 w-16">{log.method}</span>
                                <span className="text-gray-300 flex-1">{log.path}</span>
                                <span className="text-gray-600 hidden sm:block">{log.ip}</span>
                                <span className="text-purple-400 w-16 text-right">{log.latency}</span>
                            </div>
                        ))}
                        {logs.length === 0 && <div className="text-gray-600 italic">Waiting for traffic...</div>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// --- Small Metric Card Component ---
function MetricCard({ title, value, icon: Icon, trend, color, subtext }: any) {
    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500">{title}</p>
                        <h3 className="text-2xl font-bold mt-1 tracking-tight text-gray-900">{value}</h3>
                        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
                    </div>
                    <div className={`p-2 rounded-lg bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
                        <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                    {trend === 'up' ? (
                        <span className="text-green-600 flex items-center font-medium bg-green-50 px-2 py-0.5 rounded-full">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> +12%
                        </span>
                    ) : (
                        <span className="text-red-600 flex items-center font-medium bg-red-50 px-2 py-0.5 rounded-full">
                            <ArrowDownRight className="w-3 h-3 mr-1" /> -5%
                        </span>
                    )}
                    <span className="text-gray-400 ml-2">from last minute</span>
                </div>
            </CardContent>
        </Card>
    );
}