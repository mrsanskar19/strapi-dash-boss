import React, { useState, useMemo } from 'react';
import { 
    Search, 
    Download, 
    Filter, 
    ChevronDown, 
    ArrowUpDown, 
    MoreVertical, 
    Trash2, 
    RefreshCw, 
    Edit,
    CheckSquare,
    User,
    Package,
    Video,
    LayoutGrid,
    List as ListIcon,
    X,
    Calendar,
    Mail,
    Tag,
    Star
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// --- 1. Dynamic Mock Data Generators ---

// User Data Schema
const generateUsers = (count) => Array.from({ length: count }).map((_, i) => ({
    id: `u_${i}`,
    col1: `User ${i + 1}`, // Name
    col2: `user${i + 1}@example.com`, // Email
    col3: ['Admin', 'Editor', 'Viewer'][Math.floor(Math.random() * 3)], // Role
    col4: ['Active', 'Pending', 'Inactive'][Math.floor(Math.random() * 3)], // Status
    col5: new Date(Date.now() - Math.random() * 1e10).toLocaleDateString(), // Last Login
    type: 'user',
    // bio: "Passionate about building great software and collaborative tools."
}));

// Product Data Schema
const generateProducts = (count) => Array.from({ length: count }).map((_, i) => ({
    id: `p_${i}`,
    col1: `Pro Widget ${i + 100}`, // Name
    col2: ['Electronics', 'Home', 'Clothing'][Math.floor(Math.random() * 3)], // Category
    col3: `$${(Math.random() * 100).toFixed(2)}`, // Price
    col4: `p-${Math.floor(Math.random() * 500)}`, 
    col5: (Math.random() * 5).toFixed(1) + ' ★', // Rating
    type: 'product',
    description: "High-quality widget designed for professional use cases."
}));

// Vlog Data Schema
const generateVlogs = (count) => Array.from({ length: count }).map((_, i) => ({
    id: `v_${i}`,
    col1: `Vlog Ep. ${i + 1}: ${['Day in Life', 'Tech Review', 'Tutorial'][Math.floor(Math.random() * 3)]}`, // Title
    col2: `Creator_${Math.floor(Math.random() * 100)}`, // Author
    col3: `${Math.floor(Math.random() * 1000)}k`, // Views
    col4: `${Math.floor(Math.random() * 20)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`, // Duration
    col5: ['Public', 'Private', 'Unlisted'][Math.floor(Math.random() * 3)], // Privacy
    type: 'vlog',
    description: "An in-depth look at the latest trends and daily routines."
}));

export function DataTable() {
    // --- State ---
    const [collectionType, setCollectionType] = useState('users'); // users | products | vlogs
    const [data, setData] = useState(() => generateUsers(50));
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
    
    // Table State
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState(new Set());
    
    // Modal State
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const pageSize = viewMode === 'grid' ? 12 : 10;

    // Sorting
    const [sortBy, setSortBy] = useState("col1");
    const [sortDir, setSortDir] = useState("asc");

    // --- Dynamic Configuration based on Collection Type ---
    const config = useMemo(() => {
        switch(collectionType) {
            case 'products':
                return {
                    title: "Product Inventory",
                    icon: Package,
                    headers: ["Product Name", "Category", "Price", "Stock", "Rating"],
                    filterOptions: ["Electronics", "Home", "Clothing"],
                    filterLabel: "Category"
                };
            case 'vlogs':
                return {
                    title: "Video Content",
                    icon: Video,
                    headers: ["Video Title", "Author", "Views", "Duration", "Status"],
                    filterOptions: ["Public", "Private", "Unlisted"],
                    filterLabel: "Privacy"
                };
            default: // users
                return {
                    title: "User Management",
                    icon: User,
                    headers: ["Full Name", "Email Address", "Role", "Status", "Last Login"],
                    filterOptions: ["Active", "Pending", "Inactive"],
                    filterLabel: "Status"
                };
        }
    }, [collectionType]);

    // --- Switch Data Handler ---
    const handleCollectionChange = (value) => {
        setCollectionType(value);
        setPage(1);
        setSelectedIds(new Set());
        setSearchQuery("");
        setStatusFilter("all");
        // Generate new mock data
        if (value === 'products') setData(generateProducts(50));
        else if (value === 'vlogs') setData(generateVlogs(50));
        else setData(generateUsers(50));
    };

    // --- Derived Data Logic ---
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const searchStr = searchQuery.toLowerCase();
            const matchesSearch = 
                item.col1.toString().toLowerCase().includes(searchStr) || 
                item.col2.toString().toLowerCase().includes(searchStr);
            
            const matchesFilter = statusFilter === "all" || 
                Object.values(item).some(val => val.toString() === statusFilter);

            return matchesSearch && matchesFilter;
        });
    }, [data, searchQuery, statusFilter]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return sortDir === "asc" ? -1 : 1;
            if (a[sortBy] > b[sortBy]) return sortDir === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortBy, sortDir]);

    const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);
    const pageCount = Math.ceil(sortedData.length / pageSize);

    // --- Handlers ---
    const toggleSelect = (id, e) => {
        e.stopPropagation();
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === paginatedData.length) setSelectedIds(new Set());
        else {
            const next = new Set(selectedIds);
            paginatedData.forEach(item => next.add(item.id));
            setSelectedIds(next);
        }
    };

    const toggleSort = (key) => {
        if (sortBy === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
        else {
            setSortBy(key);
            setSortDir("asc");
        }
    };

    const openDetails = (record) => {
        setSelectedRecord(record);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 max-w-[1200px] mx-auto space-y-6 font-sans">
            
            {/* 1. Header & View Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <config.icon className="w-6 h-6 text-indigo-600" />
                        {config.title}
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Manage <span className="font-semibold text-slate-700">{collectionType}</span> records.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Select value={collectionType} onValueChange={handleCollectionChange}>
                        <SelectTrigger className="w-[160px] bg-white h-9 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="users"><div className="flex items-center gap-2"><User className="w-3 h-3"/> Users</div></SelectItem>
                            <SelectItem value="products"><div className="flex items-center gap-2"><Package className="w-3 h-3"/> Products</div></SelectItem>
                            <SelectItem value="vlogs"><div className="flex items-center gap-2"><Video className="w-3 h-3"/> Vlogs</div></SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                            title="List View"
                        >
                            <ListIcon className="h-4 w-4" />
                        </button>
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                            title="Grid View"
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <Card className="border shadow-sm bg-white overflow-hidden">
                <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/40 px-4 py-3">
                    <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                        {/* Search & Filter */}
                        <div className="flex items-center gap-2 flex-1 w-full">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                <Input 
                                    placeholder={`Search ${collectionType}...`} 
                                    className="pl-9 bg-white h-9" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[140px] bg-white h-9 text-xs">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Filter className="w-3 h-3" />
                                        <span>{statusFilter === 'all' ? config.filterLabel : statusFilter}</span>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All {config.filterLabel}s</SelectItem>
                                    {config.filterOptions.map(opt => (
                                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Bulk Actions */}
                        {selectedIds.size > 0 && (
                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                                <span className="text-xs text-slate-500 font-medium">{selectedIds.size} selected</span>
                                <Button variant="destructive" size="sm" className="h-8 px-3 text-xs" onClick={() => { if(confirm('Delete?')) setData(prev => prev.filter(p => !selectedIds.has(p.id))); setSelectedIds(new Set()); }}>
                                    <Trash2 className="w-3 h-3 mr-1.5" /> Delete
                                </Button>
                            </div>
                        )}
                        
                        <Button variant="outline" size="sm" className="h-8 bg-white text-xs ml-auto">
                            <Download className="w-3 h-3 mr-2" /> Export
                        </Button>
                    </div>
                </CardHeader>
                
                <CardContent className="p-0 bg-slate-50/10 min-h-[400px]">
                    {paginatedData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                            <div className="bg-slate-50 p-4 rounded-full mb-3">
                                <Search className="w-8 h-8 opacity-20" />
                            </div>
                            <p>No results found matching your filters.</p>
                            <Button variant="link" onClick={() => { setSearchQuery(""); setStatusFilter("all"); }}>Clear filters</Button>
                        </div>
                    ) : (
                        <>
                            {viewMode === 'list' ? (
                                <Table>
                                    <TableHeader className="bg-slate-50">
                                        <TableRow>
                                            <TableHead className="w-[40px] pl-4">
                                                <Checkbox 
                                                    checked={paginatedData.length > 0 && selectedIds.size === paginatedData.length}
                                                    onCheckedChange={toggleSelectAll}
                                                />
                                            </TableHead>
                                            {/* Dynamic Headers */}
                                            <SortableHead label={config.headers[0]} sortKey="col1" currentSort={sortBy} dir={sortDir} onSort={toggleSort} />
                                            <SortableHead label={config.headers[1]} sortKey="col2" currentSort={sortBy} dir={sortDir} onSort={toggleSort} />
                                            <SortableHead label={config.headers[2]} sortKey="col3" currentSort={sortBy} dir={sortDir} onSort={toggleSort} />
                                            <SortableHead label={config.headers[3]} sortKey="col4" currentSort={sortBy} dir={sortDir} onSort={toggleSort} />
                                            <SortableHead label={config.headers[4]} sortKey="col5" currentSort={sortBy} dir={sortDir} onSort={toggleSort} />
                                            <TableHead className="text-right pr-4">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedData.map((row) => (
                                            <TableRow 
                                                key={row.id} 
                                                className={`cursor-pointer transition-colors ${selectedIds.has(row.id) ? "bg-indigo-50/50 hover:bg-indigo-50" : "hover:bg-slate-50"}`}
                                                onClick={() => openDetails(row)}
                                            >
                                                <TableCell className="pl-4" onClick={(e) => e.stopPropagation()}>
                                                    <Checkbox 
                                                        checked={selectedIds.has(row.id)} 
                                                        onCheckedChange={(c) => toggleSelect(row.id, { stopPropagation: () => {} })}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium text-slate-900">{row.col1}</TableCell>
                                                <TableCell className="text-slate-600">{row.col2}</TableCell>
                                                <TableCell>
                                                    {['Active', 'Admin', 'Public', 'Electronics'].includes(row.col3) ? (
                                                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-normal border-slate-200">
                                                            {row.col3}
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-slate-600">{row.col3}</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {['Active', 'Pending', 'Inactive'].includes(row.col4) ? (
                                                        <StatusBadge status={row.col4} />
                                                    ) : (
                                                        <span className="font-mono text-xs text-slate-600">{row.col4}</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-slate-500">{row.col5}</TableCell>
                                                <TableCell className="text-right pr-4">
                                                    <RowActions />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {paginatedData.map((row) => (
                                        <Card 
                                            key={row.id} 
                                            className={`group cursor-pointer hover:shadow-md transition-all duration-200 border-slate-200 relative ${selectedIds.has(row.id) ? 'ring-2 ring-indigo-500 border-transparent' : 'hover:border-indigo-200'}`}
                                            onClick={() => openDetails(row)}
                                        >
                                            <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
                                                 <Checkbox checked={selectedIds.has(row.id)} onCheckedChange={(c) => toggleSelect(row.id, { stopPropagation: () => {} })} />
                                            </div>
                                            
                                            <CardHeader className="pb-2 pt-4 px-4">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                                        <config.icon className="w-4 h-4" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <CardTitle className="text-sm font-bold text-slate-900 truncate" title={row.col1}>{row.col1}</CardTitle>
                                                        <CardDescription className="text-xs truncate">{row.col2}</CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            
                                            <CardContent className="px-4 pb-3 grid grid-cols-2 gap-2 text-xs">
                                                <div className="space-y-1">
                                                    <span className="text-slate-400">{config.headers[2]}</span>
                                                    <p className="font-medium text-slate-700">{row.col3}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-slate-400">{config.headers[4]}</span>
                                                    <p className="font-medium text-slate-700">{row.col5}</p>
                                                </div>
                                            </CardContent>
                                            
                                            <div className="px-4 pb-3 pt-0">
                                                 <StatusBadge status={row.col4} />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </CardContent>

                <div className="p-3 border-t flex items-center justify-between bg-slate-50/50">
                    <div className="text-xs text-slate-500">
                        Page {page} of {pageCount} • {filteredData.length} records
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={page === pageCount}>Next</Button>
                    </div>
                </div>
            </Card>

            {/* --- Details Modal --- */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <div className="p-2 rounded-full bg-indigo-50 text-indigo-600">
                                <config.icon className="w-5 h-5" />
                            </div>
                            Record Details
                        </DialogTitle>
                        <DialogDescription>
                            Viewing complete information for record <span className="font-mono text-xs bg-slate-100 px-1 rounded">{selectedRecord?.id}</span>
                        </DialogDescription>
                    </DialogHeader>
                    
                    {selectedRecord && (
                        <div className="grid gap-6 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 space-y-1">
                                    <h4 className="text-sm font-medium text-slate-500">{config.headers[0]}</h4>
                                    <p className="text-lg font-semibold text-slate-900">{selectedRecord.col1}</p>
                                </div>
                                
                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium text-slate-500">{config.headers[1]}</h4>
                                    <div className="flex items-center gap-2">
                                        {collectionType === 'users' && <Mail className="w-3 h-3 text-slate-400" />}
                                        <p className="text-sm text-slate-700">{selectedRecord.col2}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium text-slate-500">{config.headers[2]}</h4>
                                    <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                                        {selectedRecord.col3}
                                    </Badge>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium text-slate-500">{config.headers[3]}</h4>
                                    <StatusBadge status={selectedRecord.col4} />
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium text-slate-500">{config.headers[4]}</h4>
                                    <div className="flex items-center gap-2">
                                        {collectionType === 'products' && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                                        <p className="text-sm text-slate-700">{selectedRecord.col5}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-slate-500">Metadata & Description</h4>
                                <div className="bg-slate-50 p-3 rounded-md border border-slate-100 text-sm text-slate-600">
                                    {selectedRecord.description || selectedRecord.bio || "No additional description available for this record."}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

// --- Helper Components ---

function SortableHead({ label, sortKey, currentSort, dir, onSort }) {
    return (
        <TableHead className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => onSort(sortKey)}>
            <div className="flex items-center gap-1">
                {label}
                {currentSort === sortKey && (
                    <ArrowUpDown className={`w-3 h-3 ${dir === 'asc' ? 'opacity-100' : 'opacity-100 rotate-180'}`} />
                )}
            </div>
        </TableHead>
    );
}

function StatusBadge({ status }) {
    const styles = {
        Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
        Pending: "bg-amber-50 text-amber-700 border-amber-200",
        Inactive: "bg-slate-100 text-slate-500 border-slate-200",
        // Additional states
        Public: "bg-blue-50 text-blue-700 border-blue-200",
        Private: "bg-slate-100 text-slate-600 border-slate-200",
    };
    return (
        <Badge variant="outline" className={`${styles[status] || styles.Inactive} font-medium`}>
            {status}
        </Badge>
    );
}

function RowActions() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical className="h-4 w-4 text-slate-400" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem><Edit className="mr-2 h-4 w-4"/> Edit Record</DropdownMenuItem>
                <DropdownMenuItem><RefreshCw className="mr-2 h-4 w-4"/> Sync</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4"/> Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}