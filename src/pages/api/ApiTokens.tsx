import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const tokens = [
  { id: "token-1", name: "My App", token: "**************", created_at: "2023-10-27 10:00:00", last_used: "2023-10-27 10:00:00", status: "Active" },
  { id: "token-2", name: "Analytics Dashboard", token: "**************", created_at: "2023-10-26 10:00:00", last_used: "2023-10-26 10:00:00", status: "Active" },
  { id: "token-3", name: "Old Integration", token: "**************", created_at: "2023-01-01 10:00:00", last_used: "2023-01-15 10:00:00", status: "Revoked" },
];

export default function ApiTokens() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>API Tokens</CardTitle>
          <CardDescription>Manage your API tokens.</CardDescription>
        </div>
        <Button>Create Token</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map((token) => (
              <TableRow key={token.id}>
                <TableCell>{token.name}</TableCell>
                <TableCell>{token.token}</TableCell>
                <TableCell>{token.created_at}</TableCell>
                <TableCell>{token.last_used}</TableCell>
                <TableCell>
                  <Badge variant={token.status === "Active" ? "default" : "destructive"}>
                    {token.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Revoke</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
