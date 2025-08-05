"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  PersonStanding,
  ChevronDown,
  Baby,
  Activity,
  User,
  X
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useAxios from "../hooks/UseAxios";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [pregnancyOpen, setPregnancyOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);

  // Auto-expand collapsibles based on current route
  useEffect(() => {
    if (pathname.includes('/dashboard/pregnancy') || pathname.includes('/dashboard/child') || pathname.includes('/dashboard/general')) {
      setPregnancyOpen(true);
    }
    if (pathname.includes('/dashboard/medication')) {
      setChildOpen(true);
    }
  }, [pathname]);

  // Close collapsibles when sidebar is minimized on desktop
  useEffect(() => {
    if (!sidebarOpen && !isMobile) {
      setPregnancyOpen(false);
      setChildOpen(false);
    }
  }, [sidebarOpen, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar on mobile when navigating
  const handleNavigation = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const isActive = (path: string) => {
    // Exact match for dashboard home
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

  // Enhanced path matching for medication routes
  const isMedicationActive = () => {
    return pathname.includes('/dashboard/medication');
  };

  // Enhanced path matching for consult routes  
  const isConsultActive = () => {
    return pathname.includes('/dashboard/pregnancy') || 
           pathname.includes('/dashboard/child') || 
           pathname.includes('/dashboard/general');
  };
  
  const [userInfo, setUserInfo] = useState<any>(null);
  const api = useAxios();
  
  const getUserInfo = async () => {
    const res = await api.get("/userInfo/");
    if (res.status == 200) {
      setUserInfo(res.data);
    }
  };
  
  useEffect(() => {
    getUserInfo();
    
    // Check if screen is mobile on initial load
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile, open on desktop
      setSidebarOpen(window.innerWidth >= 768);
    };
    
    // Run check on mount
    checkIfMobile();
    
    // Add event listener for resize
    window.addEventListener("resize", checkIfMobile);
    
    // Clean up event listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleLogout = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem("accessToken");
    router.push("/auth/login");
  };

  // Function to close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20" 
          onClick={handleOverlayClick}
        ></div>
      )}

      <header className="bg-card/80 backdrop-blur-xl shadow-sm border-b border-border/50 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl hover:bg-muted/50 mr-2 transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              {sidebarOpen && isMobile ? <X size={20} className="text-foreground" /> : <Menu size={20} className="text-foreground" />}
            </button>
            <h1 className="text-xl font-semibold truncate text-foreground">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-2 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-32 lg:w-64 text-foreground placeholder:text-muted-foreground transition-all"
              />
              <Search
                size={16}
                className="absolute left-2 top-2.5 text-muted-foreground"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-xl hover:bg-muted/50 relative transition-colors">
                  <Bell size={20} className="text-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 bg-card border-border/50">
                <DropdownMenuLabel className="text-foreground">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <div className="p-4 text-center">
                  <div className="flex flex-col items-center justify-center py-6">
                    <Bell size={32} className="text-muted-foreground mb-2 opacity-50" />
                    <span className="text-sm text-muted-foreground">No new notifications</span>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-medium cursor-pointer shadow-lg hover:shadow-xl transition-shadow">
                  {userInfo ? 
                    (userInfo.first_name?.[0] || "") + (userInfo.last_name?.[0] || "") : 
                    "?"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border/50">
                <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="cursor-pointer focus:bg-muted/50">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer focus:bg-muted/50">
                  <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="cursor-pointer focus:bg-muted/50" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4 text-destructive" />
                  <span className="text-destructive">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <aside
        className={`fixed left-0 top-0 mt-14 bg-card/80 backdrop-blur-xl h-[calc(100vh-56px)] shadow-lg border-r border-border/50 transition-all duration-300 z-30 flex flex-col w-64 md:w-64 ${
          sidebarOpen 
            ? "translate-x-0" 
            : "-translate-x-full md:translate-x-0 md:w-20"
        }`}
      >
        <div className="py-4 flex-grow overflow-y-auto custom-scrollbar">
          <div className={`px-4 mb-4 ${!sidebarOpen && !isMobile ? "text-center" : ""}`}>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              {sidebarOpen || isMobile ? "MAIN NAVIGATION" : "MENU"}
            </h2>
          </div>

          <nav className="space-y-1 px-2">
            <Link
              href="/dashboard"
              className={`flex items-center px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary group transition-all duration-200 ${
                pathname === "/dashboard"
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-foreground"
              } ${!sidebarOpen && !isMobile ? "justify-center" : ""}`}
              onClick={handleNavigation}
            >
              <Home
                className={`${
                  pathname === "/dashboard"
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary"
                } ${sidebarOpen || isMobile ? "mr-3" : ""} transition-colors`}
                size={20}
              />
              {(sidebarOpen || isMobile) && <span className="font-medium">Home</span>}
            </Link>
          </nav>

          <div className={`px-4 mb-4 mt-6 ${!sidebarOpen && !isMobile ? "text-center" : ""}`}>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              {sidebarOpen || isMobile ? "General Care" : "CARE"}
            </h2>
          </div>

          <nav className="space-y-1 px-2">
            <Collapsible
              open={pregnancyOpen && (sidebarOpen || isMobile)}
              onOpenChange={(open) => {
                if (sidebarOpen || isMobile) {
                  setPregnancyOpen(open);
                }
              }}
              className="w-full"
            >
              <CollapsibleTrigger className="w-full" asChild>
                <div
                  className={`flex items-center px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary cursor-pointer group transition-all duration-200 ${
                    isConsultActive()
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-foreground"
                  } ${!sidebarOpen && !isMobile ? "justify-center" : "justify-between"}`}
                  onClick={() => {
                    if (!sidebarOpen && !isMobile) {
                      // On minimized sidebar, navigate to first item
                      router.push('/dashboard/pregnancy');
                    }
                  }}
                >
                  <div className={`flex items-center ${!sidebarOpen && !isMobile ? "flex-col" : ""}`}>
                    <PersonStanding
                      className={`${
                        isConsultActive()
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : "mb-1"} transition-colors`}
                      size={20}
                    />
                    {(sidebarOpen || isMobile) ? (
                      <span className="font-medium">Consult</span>
                    ) : (
                      <span className="text-xs text-center">Consult</span>
                    )}
                  </div>
                  {(sidebarOpen || isMobile) && (
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform duration-200 text-muted-foreground ${
                        pregnancyOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-up-2 data-[state=open]:slide-down-2">
                <div className={`space-y-1 mt-1 ${(sidebarOpen || isMobile) ? "pl-10 pr-2" : "px-2"}`}>
                  <Link
                    href="/dashboard/pregnancy"
                    className={`flex items-center px-4 py-2 rounded-xl hover:bg-primary/10 hover:text-primary group transition-all duration-200 ${
                      isActive("/dashboard/pregnancy")
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-foreground"
                    } ${!sidebarOpen && !isMobile ? "justify-center" : ""}`}
                    onClick={handleNavigation}
                  >
                    <Activity
                      className={`${
                        isActive("/dashboard/pregnancy")
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : ""} transition-colors`}
                      size={16}
                    />
                    {(sidebarOpen || isMobile) && <span className="font-medium text-sm">Pregnancy</span>}
                  </Link>
                  <Link
                    href="/dashboard/child"
                    className={`flex items-center px-4 py-2 rounded-xl hover:bg-primary/10 hover:text-primary group transition-all duration-200 ${
                      isActive("/dashboard/child")
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-foreground"
                    } ${!sidebarOpen && !isMobile ? "justify-center" : ""}`}
                    onClick={handleNavigation}
                  >
                    <Activity
                      className={`${
                        isActive("/dashboard/child")
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : ""} transition-colors`}
                      size={16}
                    />
                    {(sidebarOpen || isMobile) && <span className="font-medium text-sm">Child</span>}
                  </Link>
                  <Link
                    href="/dashboard/general"
                    className={`flex items-center px-4 py-2 rounded-xl hover:bg-primary/10 hover:text-primary group transition-all duration-200 ${
                      isActive("/dashboard/general")
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-foreground"
                    } ${!sidebarOpen && !isMobile ? "justify-center" : ""}`}
                    onClick={handleNavigation}
                  >
                    <Activity
                      className={`${
                        isActive("/dashboard/general")
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : ""} transition-colors`}
                      size={16}
                    />
                    {(sidebarOpen || isMobile) && <span className="font-medium text-sm">General</span>}
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={childOpen && (sidebarOpen || isMobile)}
              onOpenChange={(open) => {
                if (sidebarOpen || isMobile) {
                  setChildOpen(open);
                }
              }}
              className="w-full"
            >
              <CollapsibleTrigger className="w-full" asChild>
                <div
                  className={`flex items-center px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary cursor-pointer group transition-all duration-200 ${
                    isMedicationActive()
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-foreground"
                  } ${!sidebarOpen && !isMobile ? "justify-center" : "justify-between"}`}
                  onClick={() => {
                    if (!sidebarOpen && !isMobile) {
                      // On minimized sidebar, navigate to first item
                      router.push('/dashboard/medication/prescription');
                    }
                  }}
                >
                  <div className={`flex items-center ${!sidebarOpen && !isMobile ? "flex-col" : ""}`}>
                    <Baby
                      className={`${
                        isMedicationActive()
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : "mb-1"} transition-colors`}
                      size={20}
                    />
                    {(sidebarOpen || isMobile) ? (
                      <span className="font-medium">Medication</span>
                    ) : (
                      <span className="text-xs text-center">Meds</span>
                    )}
                  </div>
                  {(sidebarOpen || isMobile) && (
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform duration-200 text-muted-foreground ${
                        childOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-up-2 data-[state=open]:slide-down-2">
                <div className={`space-y-1 mt-1 ${(sidebarOpen || isMobile) ? "pl-10 pr-2" : "px-2"}`}>
                  <Link
                    href="/dashboard/medication/prescription"
                    className={`flex items-center px-4 py-2 rounded-xl hover:bg-primary/10 hover:text-primary group transition-all duration-200 ${
                      isActive("/dashboard/medication/prescription")
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-foreground"
                    } ${!sidebarOpen && !isMobile ? "justify-center" : ""}`}
                    onClick={handleNavigation}
                  >
                    <Activity
                      className={`${
                        isActive("/dashboard/medication/prescription")
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : ""} transition-colors`}
                      size={16}
                    />
                    {(sidebarOpen || isMobile) && <span className="font-medium text-sm">Prescription</span>}
                  </Link>
                  <Link
                    href="/dashboard/medication/substitute"
                    className={`flex items-center px-4 py-2 rounded-xl hover:bg-primary/10 hover:text-primary group transition-all duration-200 ${
                      isActive("/dashboard/medication/substitute")
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-foreground"
                    } ${!sidebarOpen && !isMobile ? "justify-center" : ""}`}
                    onClick={handleNavigation}
                  >
                    <Activity
                      className={`${
                        isActive("/dashboard/medication/substitute")
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : ""} transition-colors`}
                      size={16}
                    />
                    {(sidebarOpen || isMobile) && (
                      <span className="font-medium text-sm">Substitute Medication</span>
                    )}
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </div>

        {/* Sidebar Footer with Profile */}
        {(sidebarOpen || isMobile) && (
          <div className="border-t border-border/50 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-primary/10 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-medium shadow-lg">
                    {userInfo ? 
                      (userInfo.first_name?.[0] || "") + (userInfo.last_name?.[0] || "") : 
                      "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {userInfo ? 
                        `${userInfo.first_name || ""} ${userInfo.last_name || ""}`.trim() || "Loading..." : 
                        "Loading..."}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {userInfo?.email || "Loading email..."}
                    </p>
                  </div>
                  <ChevronDown size={16} className="text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border/50">
                <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="cursor-pointer focus:bg-muted/50">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer focus:bg-muted/50">
                  <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="cursor-pointer focus:bg-muted/50" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4 text-destructive" />
                  <span className="text-destructive">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </aside>

      {/* Main content area */}
      <main
        className={`transition-all duration-300 pt-14 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}