import { MoreVertical, Server, Activity } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ApplicationCardProps {
  name: string;
  status: "active" | "inactive" | "error";
  requests: string;
  uptime: string;
  lastDeployed: string;
  slug:string;
}

export function ApplicationCard({ name, status, requests, uptime, lastDeployed,slug }: ApplicationCardProps) {
  const statusColors = {
    active: "bg-success text-success-foreground",
    inactive: "bg-muted text-muted-foreground",
    error: "bg-destructive text-destructive-foreground",
  };

  return (
    <Link to={`/applications/${slug}`}>
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <Badge variant="secondary" className={`${statusColors[status]} mt-1`}>
              {status}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Requests</span>
            <span className="font-medium text-foreground">{requests}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Uptime</span>
            <span className="font-medium text-foreground">{uptime}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Deployed</span>
            <span className="font-medium text-foreground">{lastDeployed}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
