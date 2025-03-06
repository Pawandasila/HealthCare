"use client"
import React from "react";
import Link from "next/link";
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
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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

            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              US
            </div>
          </div>
        </div>
      </header>

      <aside
        className={`fixed left-0 top-0 mt-14 bg-white w-64 h-full shadow-md transition-transform duration-300 z-10 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="py-4">
          <nav className="space-y-1 px-2">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-3 text-gray-900 rounded-md hover:bg-blue-50 hover:text-blue-600 group"
            >
              <Home
                className="mr-3 text-gray-500 group-hover:text-blue-600"
                size={20}
              />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              href="/pregnancy"
              className="flex items-center px-4 py-3 text-gray-900 rounded-md hover:bg-blue-50 hover:text-blue-600 group"
            >
              <PersonStanding
                className="mr-3 text-gray-500 group-hover:text-blue-600"
                size={20}
              />
              <span className="font-medium">Pregnancy</span>
            </Link>
            <Link
              href="/child"
              className="flex items-center px-4 py-3 text-gray-900 rounded-md hover:bg-blue-50 hover:text-blue-600 group"
            >
              <Home
                className="mr-3 text-gray-500 group-hover:text-blue-600"
                size={20}
              />
              <span className="font-medium">Child</span>
            </Link>
            
            

            <div className="pt-4 mt-4 border-t border-gray-200">
              <button className="flex items-center px-4 py-3 text-gray-900 rounded-md hover:bg-blue-50 hover:text-blue-600 w-full text-left group">
                <LogOut
                  className="mr-3 text-gray-500 group-hover:text-blue-600"
                  size={20}
                />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      <main
        className={`transition-all duration-300 pt-14 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div >{children}</div>
      </main>
    </div>
  );
}
