import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const backups = [
  { id: "backup-1", timestamp: "2023-10-27 10:00:00", size: "1.2 GB", status: "Completed" },
  { id: "backup-2", timestamp: "2023-10-26 10:00:00", size: "1.1 GB", status: "Completed" },
  { id: "backup-3", timestamp: "2023-10-25 10:00:00", size: "1.0 GB", status: "Completed" },
  { id: "backup-4", timestamp: "2023-10-24 10:00:00", size: "900 MB", status: "Failed" },
];

export default function Backups() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Database Backups</CardTitle>
          <CardDescription>Manage your database backups.</CardDescription>
        </div>
        <Button>Create Backup</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {backups.map((backup) => (
              <TableRow key={backup.id}>
                <TableCell>{backup.timestamp}</TableCell>
                <TableCell>{backup.size}</TableCell>
                <TableCell>
                  <Badge variant={backup.status === "Completed" ? "default" : "destructive"}>
                    {backup.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Restore</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
