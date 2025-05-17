"use client";

import { useGeolocation } from "./useGeolocation";
import { useEmergencyContacts } from "./useEmergencyContacts";

export function useSOS() {
  const { location } = useGeolocation();
  const { familyContacts } = useEmergencyContacts();

  const sendSOSAlert = async () => {
    // This would connect to a backend service in a real app
    // For this demo, we'll simulate the behavior with a delay
    
    return new Promise<void>((resolve) => {
      console.log("Sending SOS alert with location:", location);
      console.log("Contacting emergency contacts:", familyContacts);
      
      // Simulate API call delay
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  return {
    sendSOSAlert,
  };
}