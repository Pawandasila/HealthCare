"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart2,
  Users,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  PersonStanding,
  ChevronDown,
  Baby,
  Activity,
  Calendar,
  User,
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const pathname = usePathname();

  const [pregnancyOpen, setPregnancyOpen] = React.useState(false);
  const [childOpen, setChildOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 mr-2"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                size={16}
                className="absolute left-2 top-2.5 text-gray-500"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">Appointment Reminder</span>
                    <span className="text-sm text-gray-500">
                      Your next checkup is tomorrow at 2:00 PM
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">New Message</span>
                    <span className="text-sm text-gray-500">
                      Dr. Smith sent you a message
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <span className="text-blue-600">View all notifications</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium cursor-pointer">
                  US
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <aside
        className={`fixed left-0 top-0 mt-14 bg-white w-64 h-[93%] shadow-md transition-transform duration-300 z-10 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="py-4 flex-grow overflow-y-auto">
          <div className="px-4 mb-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              MAIN NAVIGATION
            </h2>
          </div>

          <nav className="space-y-1 px-2">
            <Link
              href="/dashboard"
              className={`flex items-center px-4 py-3 rounded-md hover:bg-blue-50 hover:text-blue-600 group ${
                isActive("/dashboard")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-900"
              }`}
            >
              <Home
                className={`mr-3 ${
                  isActive("/dashboard")
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-blue-600"
                }`}
                size={20}
              />
              <span className="font-medium">Home</span>
            </Link>
          </nav>

          <div className="px-4 mb-4 mt-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Pregnenncy
            </h2>
          </div>

          <nav className="space-y-1 px-2">
            <Collapsible
              open={pregnancyOpen}
              onOpenChange={setPregnancyOpen}
              className="w-full"
            >
              <CollapsibleTrigger className="w-full">
                <div
                  className={`flex items-center justify-between px-4 py-3 rounded-md hover:bg-blue-50 hover:text-blue-600 cursor-pointer group ${
                    isActive("/pregnancy")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-900"
                  }`}
                >
                  <div className="flex items-center">
                    <PersonStanding
                      className={`mr-3 ${
                        isActive("/pregnancy")
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      }`}
                      size={20}
                    />
                    <span className="font-medium">Pregnancy</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-200 ${
                      pregnancyOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pl-10 pr-2 space-y-1 mt-1">
                  <Link
                    href="/dashboard/pregnancy"
                    className={`flex items-center px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 group ${
                      isActive("/dashboard/pregnancy")
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    <Activity
                      className={`mr-3 ${
                        isActive("/dashboard/pregnancy")
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      }`}
                      size={16}
                    />
                    <span className="font-medium text-sm">consult</span>
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Child Dropdown */}
            <Collapsible
              open={childOpen}
              onOpenChange={setChildOpen}
              className="w-full"
            >
              <CollapsibleTrigger className="w-full">
                <div
                  className={`flex items-center justify-between px-4 py-3 rounded-md hover:bg-blue-50 hover:text-blue-600 cursor-pointer group ${
                    isActive("/child")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-900"
                  }`}
                >
                  <div className="flex items-center">
                    <Baby
                      className={`mr-3 ${
                        isActive("/child")
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      }`}
                      size={20}
                    />
                    <span className="font-medium">Child</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-200 ${
                      childOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pl-10 pr-2 space-y-1 mt-1">
                  <Link
                    href="/child/health"
                    className={`flex items-center px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 group ${
                      isActive("/child/health")
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    <Activity
                      className={`mr-3 ${
                        isActive("/child/health")
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      }`}
                      size={16}
                    />
                    <span className="font-medium text-sm">consult</span>
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </div>

        {/* Sidebar Footer with Profile */}
        <div className="border-t border-gray-200 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-100">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  US
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    User Smith
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    user@example.com
                  </p>
                </div>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <main
        className={`transition-all duration-300 pt-14 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div>{children}</div>
      </main>
    </div>
  );
}
