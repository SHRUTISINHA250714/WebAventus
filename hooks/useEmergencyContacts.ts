"use client";

import { useState, useEffect } from "react";
import { OfficialContact, FamilyContact } from "@/types/contacts";

const STORAGE_KEY = "familyContacts";

const mockOfficialContacts: OfficialContact[] = [
  {
    id: "1",
    name: "Emergency Services",
    phone: "911",
    description: "Police, Fire, Medical Emergencies",
  },
  {
    id: "2",
    name: "Poison Control",
    phone: "1-800-222-1222",
    description: "For poison emergencies",
  },
  {
    id: "3",
    name: "Local Hospital",
    phone: "555-123-4567",
    description: "City General Hospital",
  },
  {
    id: "4",
    name: "Fire Department",
    phone: "555-987-6543",
    description: "Non-emergency line",
  },
];

const mockFamilyContacts: FamilyContact[] = [
  {
    id: "1",
    name: "Jane Smith",
    phone: "555-111-2222",
    relationship: "spouse",
  },
  {
    id: "2",
    name: "Michael Johnson",
    phone: "555-333-4444",
    relationship: "parent",
  },
];

export function useEmergencyContacts() {
  // Initialize with mock data
  const [officialContacts] = useState<OfficialContact[]>(mockOfficialContacts);
  const [familyContacts, setFamilyContacts] = useState<FamilyContact[]>(() => {
    // Initialize from localStorage or mock data
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error("Error parsing stored contacts:", e);
          return mockFamilyContacts;
        }
      }
      // If no stored data, save mock data to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockFamilyContacts));
      return mockFamilyContacts;
    }
    return mockFamilyContacts;
  });

  // Save to localStorage whenever contacts change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(familyContacts));
      } catch (error) {
        console.error("Error saving contacts to localStorage:", error);
      }
    }
  }, [familyContacts]);

  const addFamilyContact = (contact: Omit<FamilyContact, "id">) => {
    const newContact: FamilyContact = {
      ...contact,
      id: Date.now().toString(),
    };
    setFamilyContacts((prev) => [...prev, newContact]);
  };

  const removeFamilyContact = (id: string) => {
    setFamilyContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const updateFamilyContact = (
    id: string,
    updatedContact: Partial<FamilyContact>
  ) => {
    setFamilyContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    );
  };

  return {
    officialContacts,
    familyContacts,
    addFamilyContact,
    removeFamilyContact,
    updateFamilyContact,
  };
}
