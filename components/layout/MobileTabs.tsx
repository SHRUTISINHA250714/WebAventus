"use client";

import { Home, AlertTriangle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MobileTabs({ activeTab, setActiveTab }: MobileTabsProps) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "emergency", label: "Emergency", icon: AlertTriangle },
    { id: "preparedness", label: "Preparedness", icon: Shield },
  ];

  return (
    <div className="flex border-b border-border mb-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex flex-col items-center py-2 px-1 text-xs",
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4 mb-1" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}