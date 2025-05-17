"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebarElement = document.getElementById("sidebar");
      const navButton = document.getElementById("nav-toggle");

      if (
        sidebarElement &&
        !sidebarElement.contains(event.target as Node) &&
        navButton &&
        !navButton.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar for desktop */}
      <Sidebar isOpen={isSidebarOpen} className="hidden md:block" />
      
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      
      {/* Mobile sidebar */}
      <Sidebar isOpen={isSidebarOpen} className="fixed top-0 left-0 z-50 md:hidden" />
      
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile nav */}
        <MobileNav onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Main content */}
        <main className={cn("flex-1 p-4 md:p-6", isSidebarOpen ? "md:ml-64" : "")}>
          {children}
        </main>
      </div>
    </div>
  );
}