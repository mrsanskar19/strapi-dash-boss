import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: ReactNode;
  className?:string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        
        <div className="flex-1 flex flex-col">
          {/* Header - hidden on mobile */}
          <header className="hidden md:flex h-16 border-b border-border bg-card items-center px-6 sticky top-0 z-10">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-foreground">Backend Management</h1>
            </div>
            <Button variant="ghost" size="sm" className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </header>
          
          {/* Mobile Header */}
          <header className="md:hidden h-14 border-b border-border bg-card flex items-center justify-center px-4 sticky top-0 z-10">
            <h1 className="text-base font-semibold text-foreground">Backend Management</h1>
          </header>
          
          {/* Main content with bottom padding on mobile for bottom nav */}
          <main className={cn("flex-1 p-4 md:p-6 pb-20 md:pb-6", className)}>
            {children}
          </main>
        </div>
        
        {/* Bottom Navigation - only on mobile */}
        <BottomNav />
      </div>
    </SidebarProvider>
  );
}
