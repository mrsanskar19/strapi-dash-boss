import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function Database() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Database</h2>
        <p className="text-sm text-muted-foreground mt-1">An overview of your storage and system usage.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Data Storage</CardTitle>
            <CardDescription>4.2 GB / 10 GB</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={42} />
            <Link to="/database/data-storage" className="mt-4 inline-block">
              <Button>View Details</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>File Storage</CardTitle>
            <CardDescription>8.5 GB / 25 GB</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={34} />
            <Link to="/database/file-storage" className="mt-4 inline-block">
              <Button>View Details</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Usage</CardTitle>
            <CardDescription>CPU: 68%, Memory: 65%</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={68} />
            <Link to="/database/system-usage" className="mt-4 inline-block">
              <Button>View Details</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Backups</CardTitle>
            <CardDescription>Manage your database backups.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/database/backups" className="mt-4 inline-block">
              <Button>View Backups</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
