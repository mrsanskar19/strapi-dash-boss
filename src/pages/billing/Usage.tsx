import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Usage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Usage</h2>
        <p className="text-sm text-muted-foreground mt-1">Track your resource usage across all applications.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>App Usage</CardTitle>
            <CardDescription>1 of 1 App used</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={100} />
            <p className="text-sm text-muted-foreground mt-2">You have reached your limit. Upgrade your plan to create more applications.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Usage</CardTitle>
            <CardDescription>50MB of 100MB used</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={50} />
            <p className="text-sm text-muted-foreground mt-2">50% of your database storage is currently being used.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Requests</CardTitle>
            <CardDescription>50,000 of 100,000 requests used</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={50} />
            <p className="text-sm text-muted-foreground mt-2">50% of your monthly API requests have been used.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage History</CardTitle>
          <CardDescription>View your usage history for the last 30 days.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for a chart or detailed usage breakdown */}
          <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Usage chart coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
