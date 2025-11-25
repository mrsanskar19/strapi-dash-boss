import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Activity, 
  CreditCard, 
  Key, 
  BarChart3, 
  ShieldAlert, 
  FileText, 
  Plus, 
  CheckCircle2, 
  ArrowUpRight,
  Globe,
  Zap,
  Server
} from "lucide-react";

// Mock Data: Applications
const applications = [
  { id: 1, name: "Production Web App", keyPrefix: "pk_live_8a...", requests: "1.2M", status: "active", usage: 78 },
  { id: 2, name: "Mobile App (iOS)", keyPrefix: "pk_live_9b...", requests: "850K", status: "active", usage: 45 },
  { id: 3, name: "Staging Environment", keyPrefix: "pk_test_2c...", requests: "15K", status: "idle", usage: 5 },
  { id: 4, name: "Legacy Integration", keyPrefix: "pk_live_1d...", requests: "0", status: "revoked", usage: 0 },
];

// Mock Data: Recent Logs
const recentLogs = [
  { method: "POST", path: "/v1/payments/intent", status: 200, latency: "45ms", time: "just now" },
  { method: "GET", path: "/v1/users/current", status: 200, latency: "12ms", time: "2s ago" },
  { method: "POST", path: "/v1/webhooks/stripe", status: 400, latency: "8ms", time: "5s ago" },
  { method: "GET", path: "/v1/products", status: 200, latency: "150ms", time: "12s ago" },
];

export default function ApiOverview() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 md:p-10 text-slate-800">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">API Developer Console</h2>
          <p className="text-slate-500 mt-1">Monitor usage, manage access keys, and track system performance.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="bg-white hover:bg-slate-50">
                <FileText className="mr-2 h-4 w-4" /> Documentation
            </Button>
            <Button className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg">
                <Plus className="mr-2 h-4 w-4" /> Create New Key
            </Button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Total Requests */}
        <Card className="border-slate-100 bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Requests (24h)</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">2.4M</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +12.5% from yesterday
            </p>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card className="border-slate-100 bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">99.98%</div>
            <p className="text-xs text-slate-500 mt-1">Operational</p>
          </CardContent>
        </Card>

        {/* Avg Latency */}
        <Card className="border-slate-100 bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Avg Latency</CardTitle>
            <Zap className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">45ms</div>
            <p className="text-xs text-slate-500 mt-1">Global average</p>
          </CardContent>
        </Card>

        {/* Rate Limit Usage */}
        <Card className="border-slate-100 bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition-all">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Rate Limit</CardTitle>
            <ShieldAlert className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">68%</div>
            <Progress value={68} className="h-1.5 mt-2 bg-slate-100" indicatorClassName="bg-indigo-500" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Main Column: Applications List */}
        <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-100 bg-white shadow-lg">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-semibold text-slate-800">Applications</CardTitle>
                            <CardDescription>Manage access keys per application.</CardDescription>
                        </div>
                        <Globe className="h-5 w-5 text-slate-400" />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                        {applications.map((app) => (
                            <div key={app.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${app.status === 'active' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                                        <Key className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900 text-sm">{app.name}</h4>
                                        <code className="text-xs text-slate-500 font-mono bg-slate-100 px-1 py-0.5 rounded border border-slate-200">{app.keyPrefix}</code>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden sm:block">
                                        <div className="text-xs text-slate-500">Requests</div>
                                        <div className="font-semibold text-slate-700 text-sm">{app.requests}</div>
                                    </div>
                                    <Badge variant={app.status === 'active' ? 'default' : 'secondary'} className={app.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-slate-100 text-slate-500'}>
                                        {app.status}
                                    </Badge>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="bg-slate-50/30 border-t border-slate-100 p-4">
                    <Button variant="outline" className="w-full text-xs text-slate-500 border-dashed border-slate-300">
                        View All Applications
                    </Button>
                </CardFooter>
            </Card>

            {/* Live Logs Preview */}
            <Card className="border-slate-100 bg-slate-900 text-slate-300 shadow-lg overflow-hidden">
                <CardHeader className="pb-2 border-b border-slate-800">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                            <Server className="h-4 w-4" /> Live Traffic
                        </CardTitle>
                        <Badge variant="outline" className="text-[10px] border-slate-700 text-green-400">Connected</Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0 font-mono text-xs">
                    <div className="max-h-[200px] overflow-hidden relative">
                         {/* Gradient fade at bottom */}
                         <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
                         
                         {recentLogs.map((log, i) => (
                             <div key={i} className="flex items-center gap-3 p-2 border-b border-slate-800/50 px-4 hover:bg-slate-800/50 transition-colors">
                                 <span className="w-16 text-slate-500">{log.time}</span>
                                 <span className={`w-12 font-bold ${log.method === 'GET' ? 'text-blue-400' : 'text-purple-400'}`}>{log.method}</span>
                                 <span className={`px-1.5 py-0.5 rounded text-[10px] ${log.status === 200 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>{log.status}</span>
                                 <span className="flex-1 truncate text-slate-300">{log.path}</span>
                                 <span className="text-slate-600 w-12 text-right">{log.latency}</span>
                             </div>
                         ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Account & Limits */}
        <div className="lg:col-span-1 space-y-6">
            
            {/* Plan Details */}
            <Card className="border-slate-100 bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <CreditCard className="h-5 w-5 text-indigo-200" /> Plan Details
                    </CardTitle>
                    <CardDescription className="text-indigo-100">Pro Developer Tier</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-indigo-100">Monthly Quota</span>
                            <span className="font-bold">2.4M / 5M</span>
                        </div>
                        <Progress value={48} className="h-2 bg-indigo-900/50" indicatorClassName="bg-white" />
                    </div>
                    <div className="pt-2 flex flex-col gap-2">
                        <div className="flex justify-between text-sm border-b border-indigo-500/30 pb-2">
                            <span className="text-indigo-200">Renewal</span>
                            <span>Nov 30, 2025</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-indigo-200">Overage</span>
                            <span>$0.00</span>
                        </div>
                    </div>
                    <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 mt-2 font-semibold">
                        Manage Billing
                    </Button>
                </CardContent>
            </Card>

            {/* Quick Links / Resources */}
            <Card className="border-slate-100 bg-white/80 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base text-slate-800">Resources</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                    <Link to="#" className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg group">
                        <span className="text-sm text-slate-600 group-hover:text-blue-600">API Reference</span>
                        <ArrowUpRight className="h-3 w-3 text-slate-400" />
                    </Link>
                    <Link to="#" className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg group">
                        <span className="text-sm text-slate-600 group-hover:text-blue-600">Status Page</span>
                        <ArrowUpRight className="h-3 w-3 text-slate-400" />
                    </Link>
                    <Link to="#" className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg group">
                        <span className="text-sm text-slate-600 group-hover:text-blue-600">Support</span>
                        <ArrowUpRight className="h-3 w-3 text-slate-400" />
                    </Link>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}