import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const endpoints = {
  "My App": [
    { id: "endpoint-1", name: "/users", method: "GET", access: "Public" },
    { id: "endpoint-2", name: "/users", method: "POST", access: "Private" },
    { id: "endpoint-3", name: "/posts", method: "GET", access: "Public" },
    { id: "endpoint-4", name: "/posts", method: "POST", access: "Private" },
  ],
  "Analytics Dashboard": [
    { id: "endpoint-5", name: "/analytics/views", method: "GET", access: "Private" },
    { id: "endpoint-6", name: "/analytics/clicks", method: "GET", access: "Private" },
  ],
};

export default function EndpointAccess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Endpoint Access Manager</CardTitle>
        <CardDescription>Manage access to your API endpoints.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <p>Select an application:</p>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select an application" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="My App">My App</SelectItem>
              <SelectItem value="Analytics Dashboard">Analytics Dashboard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Endpoint</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Access</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {endpoints["My App"].map((endpoint) => (
              <TableRow key={endpoint.id}>
                <TableCell>{endpoint.name}</TableCell>
                <TableCell>{endpoint.method}</TableCell>
                <TableCell>{endpoint.access}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Manage</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
