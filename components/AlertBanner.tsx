"use client";

import { useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertType } from "@/types/alert";

interface AlertBannerProps {
  alerts: Alert[];
}

export function AlertBanner({ alerts }: AlertBannerProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  
  // Only show alerts that haven't been dismissed
  const visibleAlerts = alerts.filter(
    (alert) => !dismissedAlerts.includes(alert.id)
  );
  
  if (visibleAlerts.length === 0) {
    return null;
  }
  
  const dismissAlert = (id: string) => {
    setDismissedAlerts([...dismissedAlerts, id]);
  };
  
  // Function to determine the appropriate color based on alert type
  const getAlertColor = (type: AlertType) => {
    switch (type) {
      case "emergency":
        return "bg-destructive/90 text-destructive-foreground border-destructive/70";
      case "warning":
        return "bg-yellow-500/90 text-white border-yellow-600/70";
      case "info":
        return "bg-blue-500/90 text-white border-blue-600/70";
      default:
        return "bg-blue-500/90 text-white border-blue-600/70";
    }
  };
  
  return (
    <div className="space-y-2 mb-4">
      {visibleAlerts.map((alert) => (
        <div
          key={alert.id}
          className={cn(
            "relative rounded-md px-4 py-3 border shadow-sm animate-in slide-in-from-top duration-300",
            getAlertColor(alert.type)
          )}
        >
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-medium">{alert.title}</div>
              <div className="text-sm mt-1">{alert.message}</div>
              {alert.linkText && alert.linkUrl && (
                <a 
                  href={alert.linkUrl} 
                  className="text-sm mt-1 underline hover:opacity-90 inline-block"
                >
                  {alert.linkText}
                </a>
              )}
              <div className="text-xs mt-1 opacity-90">
                {alert.location} • {new Date(alert.timestamp).toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => dismissAlert(alert.id)}
              className="ml-2 mt-1 opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Dismiss alert"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}