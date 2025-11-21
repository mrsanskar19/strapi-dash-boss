import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const logs = [
  { timestamp: "2023-10-27 10:00:00", level: "info", message: "Server started" },
  { timestamp: "2023-10-27 10:00:05", level: "warning", message: "High CPU usage detected" },
  { timestamp: "2023-10-27 10:00:10", level: "info", message: "New user registered" },
  { timestamp: "2023-10-27 10:00:15", level: "error", message: "Failed to connect to database" },
];

export default function SystemUsage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Usage</CardTitle>
          <CardDescription>Overall system resource consumption.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-semibold">CPU Usage</h3>
            <div className="space-y-2">
              <p className="text-sm font-medium">Current Usage: 68%</p>
              <Progress value={68} />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Memory Usage</h3>
            <div className="space-y-2">
              <p className="text-sm font-medium">Current Usage: 5.2 GB / 8 GB</p>
              <Progress value={65} />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>System Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.level}</TableCell>
                  <TableCell>{log.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
