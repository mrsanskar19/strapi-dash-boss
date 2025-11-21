import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function NotificationsSettings() {
  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose how you want to be notified.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="font-semibold">Email Notifications</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="security-alerts" />
            <Label htmlFor="security-alerts">Security Alerts</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="new-features" />
            <Label htmlFor="new-features">New Features</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="marketing" />
            <Label htmlFor="marketing">Marketing & Promotions</Label>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="font-semibold">Push Notifications</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="push-mentions" />
            <Label htmlFor="push-mentions">Mentions</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="push-direct-messages" />
            <Label htmlFor="push-direct-messages">Direct Messages</Label>
          </div>
        </div>
        <Button>Save Notifications</Button>
      </CardContent>
    </Card>
  );
}
