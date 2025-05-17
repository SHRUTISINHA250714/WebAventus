"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  AlertTriangle,
  MessageSquare,
  PhoneCall,
  CheckSquare,
  BookOpen,
  HelpCircle,
  Settings,
  Users,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  className?: string;
}

export function Sidebar({ isOpen, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      id="sidebar"
      className={cn(
        "w-64 bg-card border-r border-border h-screen transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        className
      )}
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <h1 className="font-bold text-lg">Emergency Response</h1>
        </div>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          <li>
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === "/"
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted"
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/incident-reporting"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === "/incident-reporting"
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted"
              )}
            >
              <AlertTriangle className="h-4 w-4" />
              Report Incident
            </Link>
          </li>
          <li>
            <Link
              href="/chatbot"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === "/chatbot"
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted"
              )}
            >
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </Link>
          </li>
          <li>
            <Link
              href="/emergency-contacts"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === "/emergency-contacts"
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted"
              )}
            >
              <PhoneCall className="h-4 w-4" />
              Emergency Contacts
            </Link>
          </li>
          <li>
            <Link
              href="/checklist"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === "/checklist"
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted"
              )}
            >
              <CheckSquare className="h-4 w-4" />
              Preparedness Checklist
            </Link>
          </li>
          {/* <li>
            <Link
              href="/knowledge-base"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === "/knowledge-base"
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted"
              )}
            >
              <BookOpen className="h-4 w-4" />
              Knowledge Base
            </Link>
          </li> */}
          <li>
            <Link
              href="/family-contacts"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === "/family-contacts"
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted"
              )}
            >
              <Users className="h-4 w-4" />
              Family Contacts
            </Link>
          </li>
        </ul>

        <div className="mt-6 pt-4 border-t border-border">
          <ul className="space-y-1">
            <li>
              <Link
                href="/settings"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  pathname === "/settings"
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted"
                )}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="/help"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  pathname === "/help"
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted"
                )}
              >
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
