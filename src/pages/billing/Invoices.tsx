import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Invoices() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Invoices</h2>
        <p className="text-sm text-muted-foreground mt-1">View and download your past invoices.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV-003</TableCell>
                <TableCell>2024-07-15</TableCell>
                <TableCell><Badge variant="success">Paid</Badge></TableCell>
                <TableCell>$25.00</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Download</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV-002</TableCell>
                <TableCell>2024-06-15</TableCell>
                <TableCell><Badge variant="success">Paid</Badge></TableCell>
                <TableCell>$25.00</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Download</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV-001</TableCell>
                <TableCell>2024-05-15</TableCell>
                <TableCell><Badge variant="success">Paid</Badge></TableCell>
                <TableCell>$25.00</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Download</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
