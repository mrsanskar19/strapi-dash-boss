import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
    Copy, 
    Trash2, 
    Plus, 
    Shield, 
    Search, 
    Key, 
    MoreHorizontal, 
    Check 
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const tokens = [
  { id: "t1", name: "Prod App", token: "sk_live_...8921", permissions: ["Read", "Write"], last_used: "2 mins ago", status: "Active" },
  { id: "t2", name: "Analytics Bot", token: "sk_test_...1129", permissions: ["Read-Only"], last_used: "4 days ago", status: "Active" },
  { id: "t3", name: "Legacy V1", token: "sk_live_...9942", permissions: ["Admin"], last_used: "1 year ago", status: "Revoked" },
];

export default function ApiTokens() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
                <Key className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
                <CardTitle>API Access Tokens</CardTitle>
                <CardDescription>Manage keys for external integrations.</CardDescription>
            </div>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" /> Generate New Token
          </Button>
        </div>
        
        {/* Filter Bar */}
        <div className="pt-4">
            <div className="relative max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tokens..." className="pl-8" />
            </div>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead>Name</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map((token) => (
              <TableRow key={token.id} className="group">
                <TableCell className="font-medium">{token.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground">
                      {token.token}
                    </code>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCopy(token.id, token.token)}
                    >
                        {copiedId === token.id ? 
                            <Check className="h-3 w-3 text-green-600" /> : 
                            <Copy className="h-3 w-3 text-gray-500" />
                        }
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                    <div className="flex gap-1">
                        {token.permissions.map(p => (
                            <Badge key={p} variant="secondary" className="text-xs font-normal">
                                {p}
                            </Badge>
                        ))}
                    </div>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">{token.last_used}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`${
                        token.status === "Active" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${token.status === "Active" ? "bg-green-500" : "bg-red-500"}`} />
                    {token.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" /> Edit Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Revoke Token
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}