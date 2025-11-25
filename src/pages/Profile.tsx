import React, { useState } from 'react';
import { 
    User, 
    Lock, 
    Bell, 
    CreditCard, 
    Shield, 
    Smartphone, 
    Globe, 
    Mail, 
    Github, 
    LogOut,
    Camera,
    CheckCircle2,
    AlertCircle,
    History,
    Key
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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

export default function UserProfile() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Page Header */}
                <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Shadcn Developer</h1>
                            <div className="flex items-center gap-2 mt-2 text-slate-500">
                                <span className="flex items-center gap-1 text-sm"><Mail className="w-4 h-4" /> shadcn@example.com</span>
                                <span className="text-slate-300">•</span>
                                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">PRO Plan</Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline">View Public Profile</Button>
                        <Button onClick={handleSave} disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-4 mb-8 h-auto p-1 bg-white border border-slate-200 rounded-lg">
                        <TabsTrigger value="general" className="px-6 py-2.5 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">
                            General
                        </TabsTrigger>
                        <TabsTrigger value="security" className="px-6 py-2.5 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">
                            Security
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="px-6 py-2.5 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger value="billing" className="px-6 py-2.5 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">
                            Billing
                        </TabsTrigger>
                    </TabsList>

                    {/* --- GENERAL TAB --- */}
                    <TabsContent value="general" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Personal Info Form */}
                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>Update your photo and personal details here.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input id="firstName" defaultValue="Shadcn" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last name</Label>
                                            <Input id="lastName" defaultValue="Developer" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email address</Label>
                                        <div className="flex">
                                            <Input id="email" defaultValue="shadcn@example.com" disabled className="bg-slate-50" />
                                            <Button variant="ghost" className="ml-2 text-indigo-600">Change</Button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username</Label>
                                        <div className="flex items-center border rounded-md px-3 bg-slate-50 text-slate-500">
                                            <span>myapp.com/</span>
                                            <input 
                                                className="flex-1 bg-transparent border-none focus:ring-0 p-2 text-slate-900 outline-none" 
                                                defaultValue="shadcn"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea 
                                            id="bio" 
                                            placeholder="Tell us a little about yourself" 
                                            className="resize-none" 
                                            defaultValue="I'm a Product Designer based in Melbourne, Australia. I specialise in UI/UX design, brand strategy, and Webflow development."
                                        />
                                        <p className="text-xs text-slate-500 text-right">240 characters left</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Sidebar Details */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Role</Label>
                                            <Input defaultValue="Senior Developer" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Timezone</Label>
                                            <Select defaultValue="est">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select timezone" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="est">Eastern Time (US & Canada)</SelectItem>
                                                    <SelectItem value="pst">Pacific Time (US & Canada)</SelectItem>
                                                    <SelectItem value="gmt">Greenwich Mean Time</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Language</Label>
                                            <Select defaultValue="en">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="en">English (US)</SelectItem>
                                                    <SelectItem value="fr">French</SelectItem>
                                                    <SelectItem value="de">German</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* --- SECURITY TAB --- */}
                    <TabsContent value="security" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>Change your password to keep your account secure.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 max-w-lg">
                                <div className="space-y-2">
                                    <Label htmlFor="current">Current Password</Label>
                                    <Input id="current" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new">New Password</Label>
                                    <Input id="new" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm">Confirm Password</Label>
                                    <Input id="confirm" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50 border-t p-4 flex justify-end rounded-b-lg">
                                <Button>Update Password</Button>
                            </CardFooter>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-green-600" /> Multi-Factor Authentication
                                    </CardTitle>
                                    <CardDescription>Add an extra layer of security to your account.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50">
                                        <div className="space-y-0.5">
                                            <div className="font-medium text-slate-900">Authenticator App</div>
                                            <div className="text-sm text-slate-500">Use an app like Authy or Google Authenticator.</div>
                                        </div>
                                        <Switch />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-blue-600" /> Social Accounts
                                    </CardTitle>
                                    <CardDescription>Connect social accounts for easier login.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Github className="w-5 h-5" />
                                            <span className="font-medium">GitHub</span>
                                        </div>
                                        <Button variant="outline" size="sm" className="text-green-600 border-green-200 bg-green-50">Connected</Button>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">G</div>
                                            <span className="font-medium">Google</span>
                                        </div>
                                        <Button variant="outline" size="sm">Connect</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Active Sessions</CardTitle>
                                <CardDescription>Manage devices where you're currently logged in.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-green-50 rounded-full">
                                                <Smartphone className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">iPhone 14 Pro</p>
                                                <p className="text-sm text-slate-500">San Francisco, US • Active now</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-green-600 border-green-200">Current Device</Badge>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-slate-100 rounded-full">
                                                <Globe className="w-5 h-5 text-slate-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">Macbook Pro (Chrome)</p>
                                                <p className="text-sm text-slate-500">London, UK • Last active 2 hours ago</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">Revoke</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* --- NOTIFICATIONS TAB --- */}
                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>Email Notifications</CardTitle>
                                <CardDescription>Choose what you want to be notified about.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="security-emails" className="flex flex-col space-y-1">
                                        <span>Security Emails</span>
                                        <span className="font-normal text-slate-500 text-xs">Receive emails about your account activity and security.</span>
                                    </Label>
                                    <Switch id="security-emails" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                                        <span>Marketing Emails</span>
                                        <span className="font-normal text-slate-500 text-xs">Receive emails about new products, features, and more.</span>
                                    </Label>
                                    <Switch id="marketing-emails" />
                                </div>
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="updates" className="flex flex-col space-y-1">
                                        <span>Product Updates</span>
                                        <span className="font-normal text-slate-500 text-xs">Get notified when we launch new features.</span>
                                    </Label>
                                    <Switch id="updates" defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* --- BILLING TAB --- */}
                    <TabsContent value="billing" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-slate-900 text-white border-none">
                                <CardHeader>
                                    <CardTitle>Current Plan</CardTitle>
                                    <CardDescription className="text-slate-400">You are currently on the Pro plan</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-3xl font-bold">$29<span className="text-lg font-normal text-slate-400">/mo</span></div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle2 className="w-4 h-4 text-green-400" /> Unlimited Projects
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle2 className="w-4 h-4 text-green-400" /> Priority Support
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle2 className="w-4 h-4 text-green-400" /> Advanced Analytics
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full bg-white text-slate-900 hover:bg-slate-200">Manage Subscription</Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Method</CardTitle>
                                    <CardDescription>Update your billing details.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <CreditCard className="w-6 h-6 text-slate-600" />
                                            <div>
                                                <p className="font-medium">Visa ending in 4242</p>
                                                <p className="text-sm text-slate-500">Expires 12/2024</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                        <Card className="border-red-100 bg-red-50/50">
                            <CardHeader>
                                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                                <CardDescription>Irreversible actions for your account.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-slate-900">Delete Account</p>
                                        <p className="text-sm text-slate-500">Permanently remove your account and all of its contents.</p>
                                    </div>
                                    <Button variant="destructive">Delete Account</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}