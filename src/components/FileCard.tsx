import React, { useState } from 'react';
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
    Share2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Utility: Get Icon & Color based on file type ---
const getFileVisuals = (type) => {
    switch (type.toLowerCase()) {
        case 'image':
        case 'png':
        case 'jpg':
            return { icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-50' };
        case 'video':
        case 'mp4':
            return { icon: Video, color: 'text-pink-600', bg: 'bg-pink-50' };
        case 'audio':
        case 'mp3':
            return { icon: Music, color: 'text-amber-600', bg: 'bg-amber-50' };
        case 'code':
        case 'js':
        case 'tsx':
            return { icon: FileCode, color: 'text-blue-600', bg: 'bg-blue-50' };
        default:
            return { icon: FileText, color: 'text-slate-600', bg: 'bg-slate-50' };
    }
};

/**
 * FileCard Component
 * A rich, interactive card with preview states and quick actions.
 */
export function FileCard({ 
    fileName, 
    fileType, 
    fileSize, 
    uploadDate, 
    thumbnailUrl = null, 
    onView, 
    onDelete,
    onDownload 
}) {
    const { icon: Icon, color, bg } = getFileVisuals(fileType);

    return (
        <div className="group relative w-full max-w-[280px] bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            
            {/* 1. Preview Area */}
            <div className={`relative h-36 w-full ${bg} flex items-center justify-center overflow-hidden`}>
                {thumbnailUrl ? (
                    <img 
                        src={thumbnailUrl} 
                        alt={fileName} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                ) : (
                    <Icon className={`w-12 h-12 ${color} opacity-80 group-hover:scale-110 transition-transform duration-300`} />
                )}

                {/* Overlay Actions (Fade In on Hover) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <button 
                        onClick={onView}
                        className="p-2 bg-white/90 rounded-full hover:bg-white text-slate-900 transition-colors transform hover:scale-105"
                        title="Preview"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={onDownload}
                        className="p-2 bg-white/90 rounded-full hover:bg-white text-blue-600 transition-colors transform hover:scale-105"
                        title="Download"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                </div>

                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm rounded-md shadow-sm text-slate-700">
                        {fileType}
                    </span>
                </div>
            </div>

            {/* 2. File Details */}
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                        <h3 className="font-semibold text-slate-900 truncate" title={fileName}>
                            {fileName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                            <span>{fileSize}</span>
                            <span>•</span>
                            <span>{uploadDate}</span>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700 -mr-2">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={onView}>
                                <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" /> Share
                            </DropdownMenuItem>
                            <div className="h-px bg-slate-100 my-1" />
                            <DropdownMenuItem onClick={onDelete} className="text-red-600 focus:text-red-600 bg-red-50/50 focus:bg-red-50">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}

