
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppViewSidebar } from "@/components/AppSidebar";
import { AppViewBottomNav } from "@/components/BottomNav";
import { cn } from "@/lib/utils"
import { Outlet,useParams } from "react-router-dom";
import { Tracker } from "./Tracker";
import { NotificationPanel } from "./NotificationPanel";

interface DashboardLayoutProps {
  className?:string;
}

export function AppLayout({ className }: DashboardLayoutProps) {
  const { slug } = useParams();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <AppViewSidebar app={slug} />
        </div>
        
        <div className="flex-1 flex flex-col">
          {/* Header - hidden on mobile */}
          <header className="hidden md:flex h-16 bg-card items-center px-6 sticky top-0 z-10">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              {/* <h1 className="text-lg font-semibold text-foreground">Backend Management</h1> */}
              <Tracker/>
            </div>
            <div className="flex items-center gap-4">
              <NotificationPanel />
            </div>
          </header>
          
          {/* Mobile Header */}
          <header className="md:hidden h-14 bg-card flex items-center justify-between px-4 sticky top-0 z-10">
            <h1 className="text-base font-semibold text-foreground">Backend Management</h1>
            <NotificationPanel />
          </header>
          
          {/* Main content with bottom padding on mobile for bottom nav */}
          <main className={cn("flex-1 p-4 md:p-6 pb-20 md:pb-6", className)}>
            <Outlet/>
          </main>
        </div>
        
        {/* Bottom Navigation - only on mobile */}
        <AppViewBottomNav />
      </div>
    </SidebarProvider>
  );
}
