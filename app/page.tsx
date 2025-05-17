"use client";

import { useEffect, useState } from "react";
import { AlertBanner } from "@/components/AlertBanner";
import { SOSButton } from "@/components/features/sos/SOSButton";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { IncidentList } from "@/components/features/incidents/IncidentList";
import { EmergencyServices } from "@/components/features/emergency/EmergencyServices";
import { useAlerts } from "@/hooks/useAlerts";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { MobileTabs } from "@/components/layout/MobileTabs";
import GestureDetector from "@/app/handgesture/page";
export default function Home() {
  const { alerts } = useAlerts();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <LanguageProvider>
      <DashboardLayout>
        {alerts.length > 0 && <AlertBanner alerts={alerts} />}

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Disaster Management System</h1>
            <SOSButton />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">Recent Incidents</h2>
                <IncidentList limit={5} />
              </div>

              <div className="bg-card rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4">
                  Emergency Preparedness
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-muted rounded-md p-3">
                    <h3 className="font-medium mb-2">Checklist Status</h3>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-chart-1 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-sm mt-2">75% Complete</p>
                  </div>
                  <div className="bg-muted rounded-md p-3">
                    <h3 className="font-medium mb-2">Safety Tips</h3>
                    <p className="text-sm">
                      Access the knowledge base for emergency procedures and
                      safety tips.
                    </p>
                    <a
                      href="/knowledge-base"
                      className="text-sm text-primary hover:underline mt-2 inline-block"
                    >
                      View Knowledge Base →
                    </a>
                  </div>
                  <h1 className="text-2xl font-bold mb-4">
                    Disaster Gesture Detection
                  </h1>
                  <GestureDetector />
                </div>
              </div>
            </div>

            <div>
              <EmergencyServices />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Disaster Management</h1>
            <SOSButton />
          </div>

          <MobileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "dashboard" && (
            <div className="space-y-4">
              <div className="bg-card rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold mb-3">Recent Incidents</h2>
                <IncidentList limit={3} />
              </div>
            </div>
          )}

          {activeTab === "emergency" && <EmergencyServices />}

          {activeTab === "preparedness" && (
            <div className="bg-card rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-3">
                Emergency Preparedness
              </h2>
              <div className="space-y-3">
                <div className="bg-muted rounded-md p-3">
                  <h3 className="font-medium mb-2">Checklist Status</h3>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-chart-1 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-sm mt-2">75% Complete</p>
                </div>
                <div className="bg-muted rounded-md p-3">
                  <h3 className="font-medium mb-2">Safety Tips</h3>
                  <p className="text-sm">
                    Access vital emergency procedures and safety tips.
                  </p>
                  <a
                    href="/knowledge-base"
                    className="text-sm text-primary hover:underline mt-2 inline-block"
                  >
                    View Knowledge Base →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </LanguageProvider>
  );
}
