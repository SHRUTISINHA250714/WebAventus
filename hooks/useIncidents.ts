"use client";

import { useState, useEffect } from "react";
import { Incident } from "@/types/incident";

const mockIncidents: Incident[] = [
  {
    id: "1",
    title: "Flash Flooding on Main Street",
    description: "Several blocks of Main Street are underwater. Cars are stranded and water level is rising. Local businesses affected.",
    location: "Main Street & 5th Avenue",
    imageUrl: "https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    timestamp: "2023-07-15T14:32:00Z",
    reportedBy: "John Doe",
  },
  {
    id: "2",
    title: "Building Fire in Downtown Area",
    description: "Three-story building on fire. Fire department is on scene. Surrounding buildings are being evacuated as a precaution.",
    location: "123 Center Street",
    imageUrl: "https://images.pexels.com/photos/51951/forest-fire-fire-smoke-conservation-51951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    timestamp: "2023-07-14T19:15:00Z",
    reportedBy: "Jane Smith",
  },
  {
    id: "3",
    title: "Power Outage in North District",
    description: "Widespread power outage affecting approximately 500 homes. Utility company has been notified and is working on repairs.",
    location: "North District",
    imageUrl: "https://images.pexels.com/photos/775313/pexels-photo-775313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    timestamp: "2023-07-13T22:45:00Z",
    reportedBy: "Michael Johnson",
  },
];

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);

  const addIncident = async (incident: Omit<Incident, "id">) => {
    const newIncident: Incident = {
      ...incident,
      id: Date.now().toString(),
    };

    setIncidents((prevIncidents) => [newIncident, ...prevIncidents]);
    return newIncident;
  };

  return {
    incidents,
    addIncident,
  };
}