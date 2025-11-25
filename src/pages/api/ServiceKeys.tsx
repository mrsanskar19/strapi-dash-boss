import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { 
    Server, 
    Key, 
    Copy, 
    Eye, 
    EyeOff, 
    RefreshCw, 
    ShieldAlert, 
    Plus,
    Terminal
} from 'lucide-react';

// Mock Data
const initialKeys = [
    { id: 1, service: "Email Microservice", prefix: "sk_live_", secret: "8921...x829", role: "Write Access", lastUsed: "Just now", status: "active" },
    { id: 2, service: "Upload Worker", prefix: "sk_test_", secret: "1129...a992", role: "Read Only", lastUsed: "5h ago", status: "active" },
    { id: 3, service: "Legacy Auth", prefix: "sk_live_", secret: "9942...b112", role: "Admin", lastUsed: "20 days ago", status: "revoked" },
];

export default function ServiceKeys() {
    const [keys, setKeys] = useState(initialKeys);
    const [showSecret, setShowSecret] = useState<number | null>(null);

    // Toggle Secret Visibility
    const toggleSecret = (id: number) => {
        if (showSecret === id) {
            setShowSecret(null);
        } else {
            // Simulate an API call to fetch the full secret
            setShowSecret(id);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            
            {/* 1. Page Header & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                    <h1 className="text-2xl font-bold tracking-tight">Service API Keys</h1>
                    <p className="text-gray-500">Manage server-side credentials for your backend services.</p>
                </div>
                <Card className="bg-slate-900 text-white border-0">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Active Services</p>
                            <p className="text-2xl font-bold">2 / 3</p>
                        </div>
                        <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center">
                            <Server className="h-5 w-5 text-blue-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 2. Main List */}
            <Card>
                <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-gray-500" /> 
                        Registered Keys
                    </CardTitle>
                    
                    {/* Create Key Modal Trigger */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Plus className="w-4 h-4 mr-2" /> Register Service
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Service Key</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Service Name</Label>
                                    <Input placeholder="e.g. Payment Gateway" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Environment</Label>
                                    <Select defaultValue="prod">
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="prod">Production</SelectItem>
                                            <SelectItem value="test">Test / Staging</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Generate Key</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="divide-y">
                        {keys.map((key) => (
                            <div key={key.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                {/* Left: Icon & Service Info */}
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${key.status === 'active' ? 'bg-green-50' : 'bg-gray-100'}`}>
                                        <Key className={`w-5 h-5 ${key.status === 'active' ? 'text-green-600' : 'text-gray-400'}`} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-gray-900">{key.service}</p>
                                            <Badge variant="secondary" className="text-xs font-normal text-gray-500">
                                                {key.role}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">
                                                {showSecret === key.id ? "sk_live_99a8...11z" : key.prefix + "••••••••••••"}
                                            </code>
                                            <button onClick={() => toggleSecret(key.id)} className="text-gray-400 hover:text-gray-600">
                                                {showSecret === key.id ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                            </button>
                                            <button className="text-gray-400 hover:text-gray-600" onClick={() => navigator.clipboard.writeText(key.secret)}>
                                                <Copy className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Stats & Actions */}
                                <div className="flex items-center gap-6 text-sm">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-gray-500">Last used</p>
                                        <p className="font-medium">{key.lastUsed}</p>
                                    </div>
                                    
                                    {key.status === 'active' ? (
                                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">
                                            <ShieldAlert className="w-4 h-4 mr-2" /> Revoke
                                        </Button>
                                    ) : (
                                        <Button variant="ghost" size="sm" disabled>
                                            Revoked
                                        </Button>
                                    )}
                                    
                                    <Button variant="ghost" size="icon" className="text-gray-400">
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}