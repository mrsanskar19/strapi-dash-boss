import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "primary" | "success" | "warning" | "danger";
}

export function StatCard({ title, value, icon: Icon, trend, variant = "primary" }: StatCardProps) {
  const variantClasses = {
    primary: "bg-gradient-to-br from-primary/10 to-primary/5 text-primary",
    success: "bg-gradient-to-br from-success/10 to-success/5 text-success",
    warning: "bg-gradient-to-br from-warning/10 to-warning/5 text-warning",
    danger: "bg-gradient-to-br from-destructive/10 to-destructive/5 text-destructive",
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className={`text-sm mt-2 ${trend.isPositive ? "text-success" : "text-destructive"}`}>
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </p>
            )}
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${variantClasses[variant]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
