import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tableData = [
  { name: "users", size: "1.5 GB" },
  { name: "posts", size: "1.2 GB" },
  { name: "comments", size: "800 MB" },
  { name: "products", size: "700 MB" },
];

export default function DataStorage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Storage</CardTitle>
          <CardDescription>Your total database storage usage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Total Usage: 4.2 GB / 10 GB</p>
            <Progress value={42} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Storage by Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Table Name</TableHead>
                <TableHead className="text-right">Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((table) => (
                <TableRow key={table.name}>
                  <TableCell>{table.name}</TableCell>
                  <TableCell className="text-right">{table.size}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
