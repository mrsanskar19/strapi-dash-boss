import React, { useState } from 'react';
import { 
    Building2, 
    Users, 
    CreditCard, 
    LayoutGrid, 
    Settings, 
    Save, 
    Trash2, 
    Plus, 
    MoreHorizontal,
    CheckCircle2,
    AlertCircle,
    Download,
    Slack,
    Github,
    Trello,
    Mail,
    ShieldCheck,
    Globe
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    // Mock save handler
    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans text-slate-900">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
                        <p className="text-slate-500 mt-2">Manage your workspace, team members, and billing preferences.</p>
                    </div>
                    <Button onClick={handleSave} disabled={isLoading} className="bg-slate-900 hover:bg-slate-800">
                        {isLoading ? (
                            <>
                                <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></span>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" /> Save Changes
                            </>
                        )}
                    </Button>
                </div>

                {/* Main Tabs */}
                <Tabs defaultValue="general" className="w-full">
                    <div className="flex overflow-auto pb-2 mb-6">
                        <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-white p-1 text-slate-500 border border-slate-200 w-full md:w-auto">
                            <TabsTrigger value="general" className="px-6 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900"><Building2 className="w-4 h-4 mr-2" /> General</TabsTrigger>
                            <TabsTrigger value="team" className="px-6 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900"><Users className="w-4 h-4 mr-2" /> Team</TabsTrigger>
                            <TabsTrigger value="billing" className="px-6 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900"><CreditCard className="w-4 h-4 mr-2" /> Billing</TabsTrigger>
                            <TabsTrigger value="integrations" className="px-6 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900"><LayoutGrid className="w-4 h-4 mr-2" /> Integrations</TabsTrigger>
                        </TabsList>
                    </div>

                    {/* --- GENERAL TAB --- */}
                    <TabsContent value="general" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Workspace Details</CardTitle>
                                        <CardDescription>Used to identify your workspace in the dashboard.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="ws-name">Workspace Name</Label>
                                            <Input id="ws-name" defaultValue="Acme Corp Design" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="ws-slug">URL Slug</Label>
                                                <div className="flex items-center border rounded-md px-3 bg-slate-50 text-slate-500">
                                                    <span className="text-sm">acme.app/</span>
                                                    <input className="flex-1 bg-transparent border-none focus:ring-0 p-2 text-slate-900 text-sm outline-none" defaultValue="design-team" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Region</Label>
                                                <Select defaultValue="us-east">
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="us-east">US East (N. Virginia)</SelectItem>
                                                        <SelectItem value="eu-west">EU West (Ireland)</SelectItem>
                                                        <SelectItem value="ap-south">Asia Pacific (Mumbai)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="border-red-100">
                                    <CardHeader>
                                        <CardTitle className="text-red-600">Danger Zone</CardTitle>
                                        <CardDescription>Irreversible actions for this workspace.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border border-red-100 rounded-lg bg-red-50/30">
                                            <div>
                                                <p className="font-medium text-slate-900">Delete Workspace</p>
                                                <p className="text-sm text-slate-500">Permanently remove all data, members, and projects.</p>
                                            </div>
                                            <Button variant="destructive" size="sm">Delete</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar Info */}
                            <Card className="h-fit">
                                <CardHeader>
                                    <CardTitle>Workspace ID</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 bg-slate-100 p-2 rounded border border-slate-200 font-mono text-sm text-slate-600">
                                        <span className="truncate">ws_892100192812</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2">Used when interacting with the API.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* --- TEAM TAB --- */}
                    <TabsContent value="team" className="space-y-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Team Members</CardTitle>
                                    <CardDescription>Manage who has access to this workspace.</CardDescription>
                                </div>
                                <Button className="bg-indigo-600 hover:bg-indigo-700">
                                    <Plus className="w-4 h-4 mr-2" /> Invite Member
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { name: "Alice Johnson", email: "alice@acme.com", role: "Owner", status: "Active", img: "https://i.pravatar.cc/150?u=a" },
                                            { name: "Bob Smith", email: "bob@acme.com", role: "Editor", status: "Active", img: "https://i.pravatar.cc/150?u=b" },
                                            { name: "Charlie Day", email: "charlie@acme.com", role: "Viewer", status: "Pending", img: null },
                                        ].map((member, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage src={member.img} />
                                                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{member.name}</div>
                                                        <div className="text-xs text-slate-500">{member.email}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Select defaultValue={member.role.toLowerCase()}>
                                                        <SelectTrigger className="w-32 h-8">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="owner">Owner</SelectItem>
                                                            <SelectItem value="editor">Editor</SelectItem>
                                                            <SelectItem value="viewer">Viewer</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={member.status === 'Active' ? 'default' : 'secondary'} className={member.status === 'Active' ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}>
                                                        {member.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm" className="text-slate-400"><MoreHorizontal className="w-4 h-4" /></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* --- BILLING TAB --- */}
                    <TabsContent value="billing" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Plan Info */}
                            <Card className="md:col-span-2 bg-slate-900 text-white border-none">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl">Business Plan</CardTitle>
                                            <CardDescription className="text-slate-400">Billed annually ($39/seat)</CardDescription>
                                        </div>
                                        <Badge className="bg-indigo-500 hover:bg-indigo-600">Active</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-slate-400 mb-1">Seats Used</p>
                                            <p className="text-2xl font-bold">8 <span className="text-sm font-normal text-slate-500">/ 20</span></p>
                                            <div className="w-full bg-slate-800 h-1.5 mt-2 rounded-full overflow-hidden">
                                                <div className="bg-green-500 h-full w-[40%]"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 mb-1">Storage</p>
                                            <p className="text-2xl font-bold">142 GB <span className="text-sm font-normal text-slate-500">/ 1 TB</span></p>
                                            <div className="w-full bg-slate-800 h-1.5 mt-2 rounded-full overflow-hidden">
                                                <div className="bg-blue-500 h-full w-[14%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="border-t border-slate-800 pt-4">
                                    <Button variant="link" className="text-white p-0 h-auto">Manage Subscription &rarr;</Button>
                                </CardFooter>
                            </Card>

                            {/* Payment Method */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Method</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3 border p-3 rounded-lg">
                                        <div className="bg-slate-100 p-2 rounded">
                                            <CreditCard className="w-5 h-5 text-slate-700" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">Mastercard •••• 4242</p>
                                            <p className="text-xs text-slate-500">Expires 12/25</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full">Update Card</Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Invoices */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Invoice History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Invoice</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { date: "Oct 01, 2023", amount: "$312.00", status: "Paid" },
                                            { date: "Sep 01, 2023", amount: "$312.00", status: "Paid" },
                                            { date: "Aug 01, 2023", amount: "$290.00", status: "Paid" },
                                        ].map((inv, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{inv.date}</TableCell>
                                                <TableCell>{inv.amount}</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="bg-green-50 text-green-700 font-normal"><CheckCircle2 className="w-3 h-3 mr-1" /> {inv.status}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50"><Download className="w-4 h-4" /></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* --- INTEGRATIONS TAB --- */}
                    <TabsContent value="integrations" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: "Slack", desc: "Receive alerts in your channels", icon: Slack, connected: true, color: "text-purple-500" },
                                { name: "GitHub", desc: "Sync commits and PRs", icon: Github, connected: true, color: "text-slate-900" },
                                { name: "Trello", desc: "Create cards from issues", icon: Trello, connected: false, color: "text-blue-600" },
                                { name: "Email", desc: "Daily digest reports", icon: Mail, connected: true, color: "text-orange-500" },
                            ].map((app, i) => (
                                <Card key={i} className="flex flex-row items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white p-3 rounded-lg border shadow-sm">
                                            <app.icon className={`w-6 h-6 ${app.color}`} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{app.name}</h4>
                                            <p className="text-sm text-slate-500">{app.desc}</p>
                                        </div>
                                    </div>
                                    <Switch defaultChecked={app.connected} />
                                </Card>
                            ))}
                        </div>
                        
                        <Card className="bg-indigo-50 border-indigo-100">
                            <CardHeader>
                                <CardTitle className="text-indigo-900 flex items-center gap-2">
                                    <Globe className="w-5 h-5" /> Webhooks
                                </CardTitle>
                                <CardDescription className="text-indigo-600">Send real-time data to your external services.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between bg-white p-3 rounded border border-indigo-100">
                                        <div className="flex flex-col">
                                            <span className="font-mono text-sm">https://api.mysite.com/hooks/catch</span>
                                            <span className="text-xs text-slate-400">Events: push, deploy</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Active</Badge>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="w-4 h-4" /></Button>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-100">Add Webhook Endpoint</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}