import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function FileStorage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>File Storage</CardTitle>
          <CardDescription>Your total file storage usage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Total Usage: 8.5 GB / 25 GB</p>
            <Progress value={34} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Cloudinary Integration</CardTitle>
          <CardDescription>Your Cloudinary account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><span className="font-semibold">Cloud Name:</span> your-cloud-name</p>
          <p><span className="font-semibold">API Key:</span> ************</p>
        </CardContent>
      </Card>
    </div>
  );
}
