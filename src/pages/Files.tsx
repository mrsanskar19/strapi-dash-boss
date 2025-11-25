import React, { useState, useMemo } from 'react';
import { 
    FileText, 
    Image as ImageIcon, 
    Music, 
    Video, 
    MoreVertical, 
    Eye, 
    Trash2, 
    Download, 
    FileCode,
    Share2,
    Search,
    Filter,
    Plus,
    HardDrive,
    PieChart,
    Files as FilesIcon,
    Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- 1. REUSED FILE CARD COMPONENT (Internal for this single-file demo) ---
const getFileVisuals = (type) => {
    switch (type.toLowerCase()) {
        case 'image': case 'png': case 'jpg':
            return { icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-50' };
        case 'video': case 'mp4':
            return { icon: Video, color: 'text-pink-600', bg: 'bg-pink-50' };
        case 'audio': case 'mp3':
            return { icon: Music, color: 'text-amber-600', bg: 'bg-amber-50' };
        case 'code': case 'js': case 'tsx':
            return { icon: FileCode, color: 'text-blue-600', bg: 'bg-blue-50' };
        default:
            return { icon: FileText, color: 'text-slate-600', bg: 'bg-slate-50' };
    }
};

function FileCard({ fileName, fileType, fileSize, uploadDate, thumbnailUrl, onView, onDelete, onDownload }) {
    const { icon: Icon, color, bg } = getFileVisuals(fileType);
    return (
        <div className="group relative w-full bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
            <div className={`relative h-36 w-full ${bg} flex items-center justify-center overflow-hidden`}>
                {thumbnailUrl ? (
                    <img src={thumbnailUrl} alt={fileName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                    <Icon className={`w-12 h-12 ${color} opacity-80 group-hover:scale-110 transition-transform duration-300`} />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <button onClick={onView} className="p-2 bg-white/90 rounded-full hover:bg-white text-slate-900 transition-colors transform hover:scale-105" title="Preview"><Eye className="w-4 h-4" /></button>
                    <button onClick={onDownload} className="p-2 bg-white/90 rounded-full hover:bg-white text-blue-600 transition-colors transform hover:scale-105" title="Download"><Download className="w-4 h-4" /></button>
                </div>
                <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm rounded-md shadow-sm text-slate-700">{fileType}</span>
                </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                        <h3 className="font-semibold text-slate-900 truncate text-sm" title={fileName}>{fileName}</h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                            <span>{fileSize}</span>
                            <span>•</span>
                            <span>{uploadDate}</span>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700 -mr-2"><MoreVertical className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={onView}><Eye className="mr-2 h-4 w-4" /> View</DropdownMenuItem>
                            <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /> Share</DropdownMenuItem>
                            <div className="h-px bg-slate-100 my-1" />
                            <DropdownMenuItem onClick={onDelete} className="text-red-600 focus:text-red-600 bg-red-50/50 focus:bg-red-50"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}

// --- 2. MAIN DASHBOARD COMPONENT ---
const FilesDashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    // Mock Data
    const allFiles = [
        { id: 1, name: "Project_Proposal_v2.pdf", type: "PDF", size: "2.4 MB", date: "2m ago", category: "docs" },
        { id: 2, name: "Dashboard_Mockup.png", type: "Image", size: "4.1 MB", date: "1h ago", category: "media", thumb: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400" },
        { id: 3, name: "App.tsx", type: "Code", size: "12 KB", date: "3h ago", category: "docs" },
        { id: 4, name: "Launch_Event.mp4", type: "Video", size: "124 MB", date: "1d ago", category: "media" },
        { id: 5, name: "Q3_Financials.xlsx", type: "Excel", size: "1.2 MB", date: "2d ago", category: "docs" },
        { id: 6, name: "User_Flow_Diagram.png", type: "Image", size: "2.8 MB", date: "3d ago", category: "media", thumb: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=400" },
        { id: 7, name: "Backend_API.js", type: "Code", size: "45 KB", date: "5d ago", category: "docs" },
        { id: 8, name: "Interview_Recording.mp3", type: "Audio", size: "45 MB", date: "1w ago", category: "media" },
    ];

    // Filter Logic
    const filteredFiles = useMemo(() => {
        return allFiles.filter(file => {
            const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTab = activeTab === 'all' ? true : file.category === activeTab;
            return matchesSearch && matchesTab;
        });
    }, [searchQuery, activeTab]);

    // Stats Logic
    const totalSize = "179.5 MB"; // Calculated or Mocked
    const storageUsed = 45; // Percentage

    return (
        <div className="min-h-screen font-sans text-slate-900">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">File Manager</h1>
                    <p className="text-slate-500 mt-1">Manage your assets and documents.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white">
                        <Filter className="w-4 h-4 mr-2 text-slate-500" /> Filters
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
                        <Plus className="w-4 h-4 mr-2" /> Upload New
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-sm border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Storage</CardTitle>
                        <HardDrive className="w-4 h-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">4.2 GB <span className="text-sm font-normal text-slate-400">/ 10 GB</span></div>
                        <Progress value={storageUsed} className="h-2 mt-3 bg-slate-100" />
                        <p className="text-xs text-slate-500 mt-2">{storageUsed}% used</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Files</CardTitle>
                        <FilesIcon className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{allFiles.length}</div>
                        <div className="flex gap-2 mt-3">
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                                {allFiles.filter(f => f.category === 'docs').length} Docs
                            </Badge>
                            <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                                {allFiles.filter(f => f.category === 'media').length} Media
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Recent Activity</CardTitle>
                        <Clock className="w-4 h-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">Just now</div>
                        <p className="text-xs text-slate-500 mt-1">Uploaded "Project_Proposal_v2.pdf"</p>
                        <div className="mt-3 flex items-center text-xs text-green-600 bg-green-50 w-fit px-2 py-1 rounded-full">
                            +3 Files this week
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area */}
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                    <TabsList className="bg-white border border-slate-200 p-1 h-auto">
                        <TabsTrigger value="all" className="px-4 py-2 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">All Files</TabsTrigger>
                        <TabsTrigger value="docs" className="px-4 py-2 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">Documents</TabsTrigger>
                        <TabsTrigger value="media" className="px-4 py-2 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">Media</TabsTrigger>
                    </TabsList>

                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="Search files..." 
                            className="pl-8 bg-white border-slate-200 focus:ring-indigo-500" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid Content */}
                <TabsContent value="all" className="mt-0">
                    <FileGrid files={filteredFiles} />
                </TabsContent>
                <TabsContent value="docs" className="mt-0">
                    <FileGrid files={filteredFiles} />
                </TabsContent>
                <TabsContent value="media" className="mt-0">
                    <FileGrid files={filteredFiles} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

// Helper Component for Grid Layout
const FileGrid = ({ files }) => {
    if (files.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No files found</h3>
                <p className="text-slate-500">Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {files.map(file => (
                <FileCard 
                    key={file.id}
                    fileName={file.name}
                    fileType={file.type}
                    fileSize={file.size}
                    uploadDate={file.date}
                    thumbnailUrl={file.thumb}
                    onView={() => alert(`Viewing ${file.name}`)}
                    onDelete={() => alert(`Deleting ${file.name}`)}
                    onDownload={() => alert(`Downloading ${file.name}`)}
                />
            ))}
        </div>
    );
};

export default FilesDashboard;