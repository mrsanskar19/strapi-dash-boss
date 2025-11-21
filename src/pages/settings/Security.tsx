import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SecuritySettings() {
  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Manage your account's security settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <Label htmlFor="two-factor" className="font-semibold">Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
          </div>
          <Switch id="two-factor" />
        </div>
        <div className="space-y-2">
          <Label>Security Logs</Label>
          <p className="text-sm text-muted-foreground">Review recent security-related activity on your account.</p>
          <Button variant="outline">View Logs</Button>
        </div>
      </CardContent>
    </Card>
  );
}
