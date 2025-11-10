import { Database, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DatabaseItem {
  name: string;
  type: string;
  records: string;
  size: string;
  status: "active" | "syncing" | "error";
}

const databases: DatabaseItem[] = [
  { name: "users", type: "PostgreSQL", records: "12,543", size: "2.4 GB", status: "active" },
  { name: "products", type: "PostgreSQL", records: "8,921", size: "1.8 GB", status: "active" },
  { name: "orders", type: "PostgreSQL", records: "45,231", size: "5.2 GB", status: "syncing" },
  { name: "analytics", type: "PostgreSQL", records: "128,904", size: "12.1 GB", status: "active" },
];

export function DatabaseTable() {
  const statusColors = {
    active: "bg-success text-success-foreground",
    syncing: "bg-warning text-warning-foreground",
    error: "bg-destructive text-destructive-foreground",
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Table Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Records</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {databases.map((db) => (
            <TableRow key={db.name} className="hover:bg-muted/50">
              <TableCell>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" />
                  <span className="font-medium">{db.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{db.type}</TableCell>
              <TableCell className="text-muted-foreground">{db.records}</TableCell>
              <TableCell className="text-muted-foreground">{db.size}</TableCell>
              <TableCell>
                <Badge className={statusColors[db.status]}>{db.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
