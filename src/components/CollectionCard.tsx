
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge"
import { Link } from "react-router-dom";
import { FileText,MoreVertical,Server } from "lucide-react";

interface CollectionCardProps {
    name: string;
    status: "active" | "inactive" | "error";
    requests: string;
    lastDeployed: string;
    slug:string;
    CollectionSlug:string;
    variant?:string;
  }
  

export function CollectionCard({name, CollectionSlug,status, requests, lastDeployed,slug,variant="default" }: CollectionCardProps) {
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
        default:"bg-gradient-to-br from-purple-500/10 to-purple-500/5 text-purple-600"
      };
  return (
    <Link to={`/app/${slug}/${CollectionSlug}`}>
    <Card className={`transition-all duration-200 hover:shadow-lg ${variantClasses[variant]}`}>
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
            <span className="text-muted-foreground">Last Deployed</span>
            <span className="font-medium text-foreground">{lastDeployed}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}