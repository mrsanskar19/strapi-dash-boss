import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cloud, Image as ImageIcon, FileVideo, FileText, Settings, Plus, CheckCircle2, ShieldAlert } from "lucide-react";

// Mock Data: Storage Breakdown
const usageData = [
  { type: "Images", size: "4.5 GB", color: "bg-blue-500", icon: ImageIcon },
  { type: "Videos", size: "3.2 GB", color: "bg-purple-500", icon: FileVideo },
  { type: "Documents", size: "800 MB", color: "bg-slate-500", icon: FileText },
];

// Mock Data: Providers
const providers = [
  {
    id: "cloudinary",
    name: "Cloudinary",
    status: "connected",
    usage: "45%",
    details: { cloudName: "demo_app_v2", region: "auto" }
  },
  {
    id: "aws",
    name: "AWS S3",
    status: "connected",
    usage: "12%",
    details: { bucket: "prod-assets-bucket", region: "us-east-1" }
  },
  {
    id: "cloudflare",
    name: "Cloudflare R2",
    status: "disconnected",
    description: "Zero egress fees object storage."
  },
  {
    id: "gcp",
    name: "Google Cloud",
    status: "disconnected",
    description: "High performance object storage."
  }
];

export default function FileStorage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 md:p-10 text-slate-800">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">File Storage & CDN</h2>
          <p className="text-slate-500 mt-1">Manage content delivery networks and object storage buckets.</p>
        </div>
        <Button className="bg-slate-900 text-white hover:bg-slate-800">
            <Plus className="mr-2 h-4 w-4" /> Add New Provider
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Left Column: Usage Statistics */}
        <div className="lg:col-span-1 space-y-6">
            {/* Total Usage Card */}
            <Card className="border-slate-100 bg-white/80 backdrop-blur-xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-800">Storage Overview</CardTitle>
                    <CardDescription>Total aggregated space across all buckets.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Main Circular-ish Progress */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-slate-700">Total Used</span>
                            <span className="text-blue-600">8.5 GB / 25 GB</span>
                        </div>
                        <Progress value={34} className="h-3" />
                    </div>

                    {/* Breakdown List */}
                    <div className="space-y-3 pt-2">
                        {usageData.map((item) => (
                            <div key={item.type} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-md ${item.color} bg-opacity-10`}>
                                        <item.icon className={`h-4 w-4 ${item.color.replace('bg-', 'text-')}`} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">{item.type}</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900">{item.size}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4">
                    <p className="text-xs text-slate-500">Auto-scaling enabled on AWS S3 buckets.</p>
                </CardFooter>
            </Card>
        </div>

        {/* Right Column: Cloud Integrations Grid */}
        <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 px-1">Active Integrations</h3>
            <div className="grid gap-4 md:grid-cols-2">
                
                {providers.map((provider) => (
                    <Card 
                        key={provider.id} 
                        className={`transition-all duration-300 border ${
                            provider.status === 'connected' 
                            ? 'border-slate-200 bg-white shadow-md hover:shadow-lg hover:border-blue-200' 
                            : 'border-dashed border-slate-300 bg-slate-50/50 opacity-80 hover:opacity-100'
                        }`}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 rounded-lg ${provider.status === 'connected' ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-500'}`}>
                                        <Cloud className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-semibold">{provider.name}</CardTitle>
                                        <Badge variant={provider.status === 'connected' ? "default" : "outline"} className={`mt-1 text-[10px] px-2 py-0 h-5 ${provider.status === 'connected' ? "bg-green-100 text-green-700 hover:bg-green-100 border-0" : "text-slate-500"}`}>
                                            {provider.status === 'connected' ? "Active" : "Not Configured"}
                                        </Badge>
                                    </div>
                                </div>
                                {provider.status === 'connected' && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </CardHeader>

                        <CardContent className="pb-4">
                            {provider.status === 'connected' ? (
                                <div className="space-y-3">
                                    <div className="text-xs space-y-1 bg-slate-50 p-3 rounded border border-slate-100">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Resource</span>
                                            <span className="font-mono text-slate-700">{provider.details?.cloudName || provider.details?.bucket}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Region</span>
                                            <span className="font-mono text-slate-700">{provider.details?.region}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                         <div className="flex justify-between text-xs text-slate-500">
                                            <span>Quota Usage</span>
                                            <span>{provider.usage}</span>
                                         </div>
                                         <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: provider.usage }}></div>
                                         </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-2">
                                    <p className="text-sm text-slate-500 mb-4">{provider.description}</p>
                                    <Button variant="outline" className="w-full text-xs h-8 border-slate-300 hover:text-blue-600 hover:border-blue-300">
                                        Connect {provider.name}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}

            </div>

            {/* Alert / Warning Section */}
            <Card className="mt-6 border-amber-200 bg-amber-50/50">
                <CardContent className="flex items-center gap-4 p-4">
                    <ShieldAlert className="h-5 w-5 text-amber-600" />
                    <div>
                        <p className="text-sm font-medium text-amber-800">Storage Alert</p>
                        <p className="text-xs text-amber-600">Your AWS S3 free tier limit is approaching (85%). Consider archiving old assets.</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto border-amber-300 text-amber-700 hover:bg-amber-100 bg-transparent">
                        View Pricing
                    </Button>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}