"use client";

import { useState, useEffect } from "react";
import { OfficialContact, FamilyContact } from "@/types/contacts";

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
  const [officialContacts, setOfficialContacts] = useState<OfficialContact[]>(mockOfficialContacts);
  const [familyContacts, setFamilyContacts] = useState<FamilyContact[]>([]);

  // Simulate loading from localStorage
  useEffect(() => {
    const storedContacts = localStorage.getItem("familyContacts");
    if (storedContacts) {
      try {
        setFamilyContacts(JSON.parse(storedContacts));
      } catch (e) {
        console.error("Failed to parse stored contacts", e);
        setFamilyContacts(mockFamilyContacts);
      }
    } else {
      setFamilyContacts(mockFamilyContacts);
    }
  }, []);

  // Save to localStorage when contacts change
  useEffect(() => {
    localStorage.setItem("familyContacts", JSON.stringify(familyContacts));
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

  return {
    officialContacts,
    familyContacts,
    addFamilyContact,
    removeFamilyContact,
  };
}