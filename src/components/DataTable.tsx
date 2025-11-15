import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination"; // if your shadcn version has one; otherwise simple buttons used
import { Trash2, ChevronDown, Search, Download } from "lucide-react";

// NOTE: Adjust imports paths according to your project shadcn setup. The example assumes components are aliased to '@/components/ui/*'.

type Item = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "pending" | "disabled";
  createdAt: string; // ISO
};

// Mock data generator
function makeMockData(count = 57): Item[] {
  const roles: Item["role"][] = ["admin", "editor", "viewer"];
  const status: Item["status"][] = ["active", "pending", "disabled"];
  return Array.from({ length: count }).map((_, i) => ({
    id: `u_${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: status[i % status.length],
    createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
  }));
}

export function DataTable() {
  const initial = useMemo(() => makeMockData(123), []);
  const [data, setData] = useState<Item[]>(initial);

  // UI state
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<keyof Item | null>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // Derived
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((d) => {
      if (filterRole !== "all" && d.role !== filterRole) return false;
      if (filterStatus !== "all" && d.status !== filterStatus) return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q)
      );
    });
  }, [data, query, filterRole, filterStatus]);

  const sorted = useMemo(() => {
    if (!sortBy) return filtered;
    const s = [...filtered].sort((a, b) => {
      const av = (a as any)[sortBy];
      const bv = (b as any)[sortBy];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "string") return av.localeCompare(bv);
      return av > bv ? 1 : av < bv ? -1 : 0;
    });
    return sortDir === "asc" ? s : s.reverse();
  }, [filtered, sortBy, sortDir]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);

  function toggleSort(column: keyof Item) {
    if (sortBy === column) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
  }

  function toggleSelect(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  function selectAllCurrent() {
    const next: Record<string, boolean> = { ...selected };
    paged.forEach((r) => (next[r.id] = true));
    setSelected(next);
  }

  function clearSelection() {
    setSelected({});
  }

  function bulkDelete() {
    const ids = Object.keys(selected).filter((k) => selected[k]);
    if (!ids.length) return;
    if (!confirm(`Delete ${ids.length} items?`)) return;
    setData((d) => d.filter((r) => !ids.includes(r.id)));
    setSelected({});
  }

  function exportCSV() {
    const rows = ["id,name,email,role,status,createdAt", ...sorted.map((r) => `${r.id},${r.name},${r.email},${r.role},${r.status},${r.createdAt}`)];
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-lg">Users</CardTitle>
            <p className="text-sm text-muted-foreground">Manage users — search, sort, filter and act in bulk.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search name, email or id..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className="w-72"
                // icon={<Search className="mr-2" />}
              />

              <Select onValueChange={(v) => { setFilterRole(v); setPage(1); }}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(v) => { setFilterStatus(v); setPage(1); }}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => { setQuery(""); setFilterRole("all"); setFilterStatus("all"); setSortBy("name"); setSortDir("asc"); setPage(1); }}>
                Reset
              </Button>

              <Button onClick={exportCSV}>
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((row, idx) => (
                  <TableRow key={row.id} className="group">
                    <TableCell>
                      <input type="checkbox" checked={!!selected[row.id]} onChange={() => toggleSelect(row.id)} />
                    </TableCell>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{row.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`capitalize ${row.status === 'active' ? 'bg-green-100 text-green-800' : row.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{row.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="ghost" onClick={() => alert(`Edit ${row.id}`)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => { if (confirm(`Delete ${row.name}?`)) setData((d) => d.filter((x) => x.id !== row.id)); }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={selectAllCurrent}>Select page</Button>
              <Button size="sm" variant="ghost" onClick={clearSelection}>Clear</Button>
              <Button size="sm" variant="destructive" onClick={bulkDelete}><Trash2 className="mr-2 h-4 w-4"/> Delete selected</Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">{sorted.length} results</div>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</Button>
                <div className="px-2">{page} / {pageCount}</div>
                <Button size="sm" variant="outline" onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={page === pageCount}>Next</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
