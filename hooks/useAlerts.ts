"use client";

import { useState, useEffect } from "react";
import { Alert } from "@/types/alert";

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "emergency",
    title: "Flash Flood Warning",
    message: "Flash flooding is occurring in eastern parts of the city. Avoid downtown area and stay on higher ground.",
    location: "City-wide",
    timestamp: new Date().toISOString(),
    linkText: "View affected areas",
    linkUrl: "#flood-map",
  },
  {
    id: "2",
    type: "warning",
    title: "Severe Thunderstorm Watch",
    message: "Thunderstorms capable of producing large hail and damaging winds are possible this evening.",
    location: "County-wide",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
];

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Simulate fetching alerts
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setAlerts(mockAlerts);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addAlert = (alert: Omit<Alert, "id">) => {
    const newAlert: Alert = {
      ...alert,
      id: Date.now().toString(),
    };
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return {
    alerts,
    addAlert,
    removeAlert,
  };
}