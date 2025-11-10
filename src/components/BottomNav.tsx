import { LayoutDashboard, Server, Database, Code, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Apps", url: "/applications", icon: Server },
  { title: "Database", url: "/database", icon: Database },
  { title: "API", url: "/api", icon: Code },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end={item.url === "/"}
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors min-w-[60px]"
            activeClassName="text-primary bg-primary/10 font-medium"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
