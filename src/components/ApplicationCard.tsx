import { MoreVertical, Server, Activity } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface AppProps{
  id:string;
  name:string;
  slug:string;
  description:string;
  isActive:boolean;
  collections:string[];
  updatedAt:string;
}

interface ApplicationCardProps {
  app:AppProps;
  veriant?:string;
}

export function ApplicationCard({ app,veriant="default" }: ApplicationCardProps) {
  const statusColors = {
    active: "bg-success text-success-foreground",
    inactive: "bg-muted text-muted-foreground",
    error: "bg-destructive text-destructive-foreground",
  };

  const variantClasses = {
    primary: "bg-gradient-to-br from-primary/10 to-primary/5 text-primary",
    success: "bg-gradient-to-br from-success/10 to-success/5 text-success",
    warning: "bg-gradient-to-br from-warning/10 to-warning/5 text-warning",
    danger: "bg-gradient-to-br from-destructive/10 to-destructive/5 text-destructive",
    default:"bg-gradient-to-br from-gray-500/10 to-gray-500/5 text-gray-700"
  };
  return (
    <Link to={`/app/${app?.slug || "testing-slug"}`}>
    <Card className={`transition-all duration-200 hover:shadow-lg ${variantClasses[veriant]}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{app?.name || "Testing Name"}</h3>
            <p>ID: {app?.id ? (app.id.length > 18 ? app.id.substring(0, 18) + "..." : app.id) : "id-instring"}</p>
          </div>
        </div>
       
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <Badge variant="secondary" className={`${statusColors[app?.isActive ? "active" : "inactive"]} mt-1`}>
              {app?.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Collections</span>
            <span className="font-medium text-foreground">{app?.collections.length || "0"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Update</span>
            <span className="font-medium text-foreground">{app?.updatedAt || "1hr ago"}</span>
            
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
