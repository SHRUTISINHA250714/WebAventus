"use client";

import Link from "next/link";
import { Menu, AlertTriangle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileNavProps {
  onMenuToggle: () => void;
}

export function MobileNav({ onMenuToggle }: MobileNavProps) {
  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
      <Button
        id="nav-toggle"
        variant="ghost"
        size="icon"
        onClick={onMenuToggle}
        className="mr-2"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      
      <Link href="/" className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <span className="font-bold">Emergency Response</span>
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>No new notifications</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}