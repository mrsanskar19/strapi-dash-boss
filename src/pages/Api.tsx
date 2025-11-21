import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ApiOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">API</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your API tokens, endpoint access, and user permissions.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>API Tokens</CardTitle>
            <CardDescription>Manage your API tokens.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/api/tokens" className="mt-4 inline-block">
              <Button>Manage Tokens</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Endpoint Access</CardTitle>
            <CardDescription>Manage access to your API endpoints.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/api/endpoint-access" className="mt-4 inline-block">
              <Button>Manage Access</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Access Manager</CardTitle>
            <CardDescription>Manage user access to your API.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/api/access-manager" className="mt-4 inline-block">
              <Button>Manage Users</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
