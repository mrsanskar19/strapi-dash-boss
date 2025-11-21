import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const applications = [
  { name: "Mainframe Core", role: "Owner", lastAccessed: "2 hours ago" },
  { name: "Data Analytics Pipeline", role: "Admin", lastAccessed: "1 day ago" },
  { name: "Customer Support Portal", role: "Member", lastAccessed: "5 days ago" },
];

export default function ApplicationAccess() {
  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>Application Access</CardTitle>
        <CardDescription>Manage your access to different applications.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Accessed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.name}>
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell><Badge>{app.role}</Badge></TableCell>
                <TableCell>{app.lastAccessed}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Revoke Access</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
