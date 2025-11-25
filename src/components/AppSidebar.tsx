import {
  LayoutDashboard,
  Server,
  Database,
  Code,
  Settings,
  User,
  CreditCard,
  Sliders,
  Menu,
  ChevronDown,
  ChevronRight,
  Play,
  HelpCircle,
  File,
  Activity,
  Save,
  Key,
  Shield,
  UserCog,
  Bell,
  MoreHorizontal,
  LogOut
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

type MenuItem = {
  title: string;
  url?: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: MenuItem[];
};
const menuItems: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Playground", url: "/playground", icon: Play },
  { title: "Applications", url: "/applications", icon: Server },
  {
    title: "Database",
    icon: Database,
    subItems: [
      { title: "Overview", url: "/database", icon: LayoutDashboard },
      { title: "Data Storage", url: "/database/data-storage", icon: Database },
      { title: "File Storage", url: "/database/file-storage", icon: File },
      { title: "System Usage", url: "/database/system-usage", icon: Activity },
      { title: "Backups", url: "/database/backups", icon: Save },
    ],
  },
  {
    title: "API",
    icon: Code,
    subItems: [
      { title: "Overview", url: "/api", icon: LayoutDashboard },
      { title: "API Tokens", url: "/api/tokens", icon: Key },
      { title: "Service Keys", url: "/api/service-keys", icon: Shield },
      { title: "Live Traffic", url: "/api/live-traffic", icon: UserCog },
    ]
  },
  { title: "File Manager", url: "/files", icon: File },
  {
    title: "Profile",
    icon: User,
    subItems: [
      { title: "View Profile", url: "/profile", icon: User },
      { title:"Notifications", url: "/profile/notifications",icon:User },
      { title: "Edit Profile", url: "/profile/edit", icon: Sliders },
    ],
  },
  {
    title: "Billing",
    icon: CreditCard,
    subItems: [
      { title: "Overview", url: "/billing", icon: CreditCard },
      { title: "Payment Methods", url: "/billing/payment-methods", icon: CreditCard },
      { title: "Invoices", url: "/billing/invoices", icon: Code },
      { title: "Usage", url: "/billing/usage", icon: Sliders },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    subItems: [
      { title: "General", url: "/settings/general", icon: Sliders },
      { title: "Security", url: "/settings/security", icon: Shield },
      { title: "Access", url: "/settings/application-access", icon: Shield },
      { title: "Preferences", url: "/settings/preferences", icon: Sliders },
      { title: "Password", url: "/settings/password", icon: Sliders },
      { title: "Notifications", url: "/settings/notifications", icon: Bell },
    ],
  },
];

export function AppSidebar() {
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  const { user, logout } = useAuth(); // Assuming useAuth provides user info and logout function

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (title: string) => {
    setExpandedMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

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
      <button
        onClick={() => setOpen(!open)}
        aria-label={`${open ? "Collapse" : "Expand"} sidebar`}
        className="fixed top-4 left-4 z-50 p-2 bg-primary rounded-md text-primary-foreground sm:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      <Sidebar
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-white transition-all duration-300 ease-in-out ${
          open ? "w-64" : "w-16"
        }`}
        collapsible="icon"
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0 bg-white text-black">
          <div className="flex items-center gap-2 px-4 py-6">
            {open ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Server className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-lg">
                  Backend Hub
                </span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
                <Server className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto bg-white text-black">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map(({ title, url, icon: Icon, subItems }) => {
                    const active = isActive(url, subItems);
                    const expanded = expandedMenus[title] || false;

                    return (
                      <SidebarMenuItem key={title}>
                        {subItems ? (
                          <>
                            <SidebarMenuButton
                              onClick={() => toggleSubmenu(title)}
                              aria-expanded={expanded}
                              aria-controls={`submenu-${title.replace(/\s+/g, "")}`}
                              className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-colors`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                {open && <span>{title}</span>}
                              </div>
                              {open && (
                                <span>
                                  {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                </span>
                              )}
                            </SidebarMenuButton>
                            {expanded && open && (
                              <SidebarGroupContent id={`submenu-${title.replace(/\s+/g, "")}`} className="pl-10">
                                <SidebarMenu>
                                  {subItems.map(({ title: subTitle, url: subUrl, icon: SubIcon }) => {
                                    const subActive = location.pathname === subUrl;
                                    return (
                                      <SidebarMenuItem key={subTitle}>
                                        <SidebarMenuButton asChild>
                                          <NavLink
                                            to={subUrl || "#"}
                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors`}
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
                              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors`}
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
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 bg-white text-black">
          <div className={`p-4 ${open ? 'flex items-center gap-4' : ''}`}>
            <img 
              src={'https://via.placeholder.com/40'}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            {open && (
              <div className="flex-grow">
                <p className="font-semibold text-sm">{user?.name || 'Guest User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'guest@example.com'}</p>
              </div>
            )}
             {open && (
              <div className="relative">
                <button 
                  className="p-2 rounded-md hover:bg-muted"
                  onClick={() => { // Replace with a dropdown menu logic
                    logout();
                  }}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Sidebar>
    </>
  );
}




const AppItems: MenuItem[] = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  {
    title: "Collections",
    icon: Database,
    url:"/collections"
  },
  {
    title: "API",
    icon: Code,
    subItems: [
      { title: "Overview", url: "/api", icon: LayoutDashboard },
      { title: "API Tokens", url: "/api/tokens", icon: Key },
      { title: "Endpoint Access", url: "/api/endpoint-access", icon: Shield },
      { title: "Access Manager", url: "/api/access-manager", icon: UserCog },
    ]
  },
  { title: "Endpoints", icon: Code,
    subItems:[
      { title: "Endpoints",url:"/enpoints",icon:Key},
      { title: "Servies Endpoint",url:"/enpoints-servies",icon:Key},
      { title: "Auth Endpoints",url:"/enpoints-auth",icon:Key},
    ]
   },
  {
    title: "Teams",
    icon: Code,
    subItems: [
      { title: "Team List", url: "/teams/list", icon: Code },
      { title: "Team Settings", url: "/teams/settings", icon: Settings },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    subItems: [
      { title: "General", url: "/settings/general", icon: Sliders },
      { title: "Security", url: "/settings/security", icon: Shield },
      { title: "Access", url: "/settings/application-access", icon: Shield },
      { title: "Preferences", url: "/settings/preferences", icon: Sliders },
      { title: "Password", url: "/settings/password", icon: Sliders },
      { title: "Notifications", url: "/settings/notifications", icon: Bell },
    ],
  },
];

export function AppViewSidebar({app}:{app:string}) {
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  const { user, logout } = useAuth(); // Assuming useAuth provides user info and logout function

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (title: string) => {
    setExpandedMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

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
      <button
        onClick={() => setOpen(!open)}
        aria-label={`${open ? "Collapse" : "Expand"} sidebar`}
        className="fixed top-4 left-4 z-50 p-2 rounded-md sm:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      <Sidebar
        className={`fixed inset-y-0 bg-white text-black left-0 z-40 flex flex-col transition-all duration-300 ease-in-out ${
          open ? "w-64" : "w-16"
        }`}
        collapsible="icon"
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0 bg-white text-black">
          <div className="flex items-center gap-2 px-4 py-6">
            <Link to={`/dashboard`}>
            {open ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Server className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-lg">
                  Back to main Dashboard
                </span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
                <Server className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
            </Link>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto bg-white">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {AppItems.map(({ title, url, icon: Icon, subItems }) => {
                    const active = isActive(url, subItems);
                    const expanded = expandedMenus[title] || false;

                    return (
                      <SidebarMenuItem key={title}>
                        {subItems ? (
                          <>
                            <SidebarMenuButton
                              onClick={() => toggleSubmenu(title)}
                              aria-expanded={expanded}
                              aria-controls={`submenu-${title.replace(/\s+/g, "")}`}
                              className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-colors`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                {open && <span>{title}</span>}
                              </div>
                              {open && (
                                <span>
                                  {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                </span>
                              )}
                            </SidebarMenuButton>
                            {expanded && open && (
                              <SidebarGroupContent id={`submenu-${title.replace(/\s+/g, "")}`} className="pl-10">
                                <SidebarMenu>
                                  {subItems.map(({ title: subTitle, url: subUrl, icon: SubIcon }) => {
                                    const subActive = location.pathname === subUrl;
                                    return (
                                      <SidebarMenuItem key={subTitle}>
                                        <SidebarMenuButton asChild>
                                          <NavLink
                                            to={`/app/${app}${subUrl}` || "#"}
                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                                              subActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : ""
                                            } hover:bg-sidebar-accent`}
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
                              to={`/app/${app}${url}` || "#"}
                              end={url === "/"}
                              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors`}
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
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 bg-white text-black">
          <div className={`p-4 ${open ? 'flex items-center gap-4' : ''}`}>
            <img 
              src={'https://via.placeholder.com/40'}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            {open && (
              <div className="flex-grow">
                <p className="font-semibold text-sm">{user?.name || 'Guest User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'guest@example.com'}</p>
              </div>
            )}
             {open && (
              <div className="relative">
                <button 
                  className="p-2 rounded-md hover:bg-muted"
                  onClick={() => { // Replace with a dropdown menu logic
                    logout();
                  }}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Sidebar>
    </>
  );
}
