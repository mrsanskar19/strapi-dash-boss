import {
  LayoutDashboard,
  Server,
  Database,
  Code,
  Settings,
  User,
  CreditCard,
  Shield,
  Sliders,
  Bell,
  Menu,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

type MenuItem = {
  title: string;
  url?: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: MenuItem[];
};
const menuItems: MenuItem[] = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Applications", url: "/applications", icon: Server },
  {
    title: "Database",
    icon: Database,
    subItems: [
      { title: "Tables", url: "/database/tables", icon: Database },
      { title: "Queries", url: "/database/queries", icon: Code },
      { title: "Backups", url: "/database/backups", icon: Settings },
    ],
  },
  { title: "API", url: "/api", icon: Code },
  { title: "Endpoints", url: "/endpoints", icon: Code },
  {
    title: "Teams",
    icon: Code,
    subItems: [
      { title: "Team List", url: "/teams/list", icon: Code },
      { title: "Team Settings", url: "/teams/settings", icon: Settings },
    ],
  },
  { title: "File Manager", url: "/files", icon: Database },

  // New top-level menu items
  {
    title: "Profile",
    icon: User,
    subItems: [
      { title: "View Profile", url: "/profile/view", icon: User },
      { title: "Edit Profile", url: "/profile/edit", icon: Sliders },
    ],
  },
  {
    title: "Billing",
    icon: CreditCard,
    subItems: [
      { title: "Payment Methods", url: "/billing/payments", icon: CreditCard },
      { title: "Invoices", url: "/billing/invoices", icon: Code },
      { title: "Subscription", url: "/billing/subscription", icon: Sliders },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    subItems: [
      { title: "General", url: "/settings/general", icon: Sliders },
      { title: "Security", url: "/settings/security", icon: Shield },
      { title: "Preferences", url: "/settings/preferences", icon: Sliders },
      { title: "Notifications", url: "/settings/notifications", icon: Bell },
    ],
  },
];

export function AppSidebar() {
  const { open, setOpen } = useSidebar();
  const location = useLocation();

  // Manage which submenu is expanded
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (title: string) => {
    setExpandedMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Check if any submenu item is active (for parent active state)
  const isActive = (url?: string, subItems?: MenuItem[]) => {
    if (!url && !subItems) return false;
    if (url && location.pathname === url) return true;
    if (subItems) {
      return subItems.some((sub) => location.pathname.startsWith(sub.url || ""));
    }
    return false;
  };

  return (
    <>
      {/* Responsive toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={`${open ? "Collapse" : "Expand"} sidebar`}
        className="fixed top-4 left-4 z-50 p-2 bg-primary rounded-md text-primary-foreground sm:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      <Sidebar
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-border transition-all duration-300 ease-in-out ${
          open ? "w-64" : "w-16"
        }`}
        collapsible="icon"
      >
        <SidebarContent>
          <div className="flex items-center gap-2 px-4 py-6">
            {open ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Server className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-sidebar-foreground text-lg">
                  Backend Hub
                </span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
                <Server className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
          </div>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map(({ title, url, icon: Icon, subItems }) => {
                  const active = isActive(url, subItems);
                  const expanded = expandedMenus[title] || false;

                  return (
                    <SidebarMenuItem key={title}>
                      {/* If submenu, clicking toggles expand */}
                      {subItems ? (
                        <>
                          <SidebarMenuButton
                            onClick={() => toggleSubmenu(title)}
                            aria-expanded={expanded}
                            aria-controls={`submenu-${title.replace(/\s+/g, "")}`}
                            className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg cursor-pointer
                              ${active ? "bg-sidebar-accent text-sidebar-primary font-medium" : ""}
                              hover:bg-sidebar-accent
                              transition-colors`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5 flex-shrink-0" />
                              {open && <span>{title}</span>}
                            </div>
                            {open && (
                              <span>
                                {expanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </span>
                            )}
                          </SidebarMenuButton>
                          {expanded && open && (
                            <SidebarGroupContent
                              id={`submenu-${title.replace(/\s+/g, "")}`}
                              className="pl-10"
                            >
                              <SidebarMenu>
                                {subItems.map(({ title: subTitle, url: subUrl, icon: SubIcon }) => {
                                  const subActive = location.pathname === subUrl;
                                  return (
                                    <SidebarMenuItem key={subTitle}>
                                      <SidebarMenuButton asChild>
                                        <NavLink
                                          to={subUrl || "#"}
                                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors
                                            ${subActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : ""}
                                            hover:bg-sidebar-accent`}
                                          activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                                        >
                                          <SubIcon className="h-4 w-4 flex-shrink-0" />
                                          <span>{subTitle}</span>
                                        </NavLink>
                                      </SidebarMenuButton>
                                    </SidebarMenuItem>
                                  );
                                })}
                              </SidebarMenu>
                            </SidebarGroupContent>
                          )}
                        </>
                      ) : (
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={url || "#"}
                            end={url === "/"}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors
                              ${active ? "bg-sidebar-accent text-sidebar-primary font-medium" : ""}
                              hover:bg-sidebar-accent`}
                            activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                          >
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            {open && <span>{title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
