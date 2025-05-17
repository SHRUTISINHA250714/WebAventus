"use client";

import { useIncidents } from "@/hooks/useIncidents";
import {
  MessageSquareWarning,
  LocateFixed,
  User,
  Clock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface IncidentListProps {
  limit?: number;
}

export function IncidentList({ limit }: IncidentListProps) {
  const { incidents, loading, error } = useIncidents();

  // Limit the number of incidents if a limit is provided
  const displayedIncidents = limit ? incidents.slice(0, limit) : incidents;

  if (loading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-2" />
        <p className="text-muted-foreground">Loading incidents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <MessageSquareWarning className="h-10 w-10 text-destructive mx-auto mb-2" />
        <h3 className="text-lg font-medium mb-1">Error Loading Incidents</h3>
        <p className="text-sm text-muted-foreground mb-3 max-w-md mx-auto">
          {error}
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (displayedIncidents.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquareWarning className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
        <h3 className="text-lg font-medium mb-1">No Incidents Reported</h3>
        <p className="text-sm text-muted-foreground mb-3 max-w-md mx-auto">
          There are currently no reported incidents in your area. Stay safe and
          be prepared!
        </p>
        <Button variant="outline">Report an Incident</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayedIncidents.map((incident) => (
        <div
          key={incident.id}
          className="border border-border rounded-md overflow-hidden bg-card"
        >
          {incident.imageUrl && (
            <div className="h-40 relative">
              <img
                src={incident.imageUrl}
                alt={incident.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="flex items-center text-white">
                  <LocateFixed className="h-4 w-4 mr-1" />
                  <span className="text-xs">{`${incident.latitude}, ${incident.longitude}`}</span>
                </div>
              </div>
            </div>
          )}

          <div className="p-3">
            <h3 className="font-semibold">{incident.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {incident.description}
            </p>

            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <div className="flex items-center">
                <User className="h-3.5 w-3.5 mr-1" />
                <span>{incident.reportedBy}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{new Date(incident.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {limit && incidents.length > limit && (
        <div className="text-center mt-4">
          <Button variant="link" className="text-primary">
            View All Incidents ({incidents.length})
          </Button>
        </div>
      )}
    </div>
  );
}
