import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const backups = [
  { id: "backup-001", date: "2023-10-26 10:00:00", size: "1.2 GB", status: "Completed" },
  { id: "backup-002", date: "2023-10-25 10:00:00", size: "1.1 GB", status: "Completed" },
  { id: "backup-003", date: "2023-10-24 10:00:00", size: "1.0 GB", status: "Completed" },
];

export default function Backup() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Database Backups</CardTitle>
          <CardDescription>Create and manage your database backups.</CardDescription>
        </div>
        <Button>Create New Backup</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Backup ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {backups.map((backup) => (
              <TableRow key={backup.id}>
                <TableCell>{backup.id}</TableCell>
                <TableCell>{backup.date}</TableCell>
                <TableCell>{backup.size}</TableCell>
                <TableCell>{backup.status}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2">Restore</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
