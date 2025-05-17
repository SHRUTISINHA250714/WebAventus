"use client";

import { useState, useEffect } from "react";
import { Incident } from "@/types/incident";

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch("/api/incidents");
        if (!response.ok) {
          throw new Error("Failed to fetch incidents");
        }
        const data = await response.json();
        setIncidents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const addIncident = async (incident: Omit<Incident, "id">) => {
    try {
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incident),
      });

      if (!response.ok) {
        throw new Error("Failed to create incident");
      }

      const newIncident = await response.json();
      setIncidents((prevIncidents) => [newIncident, ...prevIncidents]);
      return newIncident;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  return {
    incidents,
    loading,
    error,
    addIncident,
  };
}
