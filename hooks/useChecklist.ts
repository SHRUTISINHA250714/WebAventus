"use client";

import React, { useState, useEffect, useCallback, FC } from "react";
import { ChecklistCategory, ChecklistItem } from "@/types/checklist";
import {
  FaTint,
  FaUtensils,
  FaMedkit,
  FaTools,
  FaIdCard,
  FaHome,
  FaShieldAlt,
} from "react-icons/fa";
import { IconType } from "react-icons";

// Store the icon type rather than the rendered element
const mockCategories: ChecklistCategory[] = [
  {
    id: "water",
    name: "Water",
    description: "Water supplies for drinking and sanitation",
    iconName: "FaTint",
  },
  {
    id: "food",
    name: "Food",
    description: "Non-perishable food supplies",
    iconName: "FaUtensils",
  },
  {
    id: "medical",
    name: "Medical",
    description: "First aid supplies and medications",
    iconName: "FaMedkit",
  },
  {
    id: "tools",
    name: "Tools & Supplies",
    description: "Equipment and tools for emergencies",
    iconName: "FaTools",
  },
  {
    id: "documents",
    name: "Documents",
    description: "Important documents and information",
    iconName: "FaIdCard",
  },
  {
    id: "shelter",
    name: "Shelter",
    description: "Shelter and warmth items",
    iconName: "FaHome",
  },
  {
    id: "safety",
    name: "Safety",
    description: "Safety and protection items",
    iconName: "FaShieldAlt",
  },
];

// Map for looking up icon components by name
const iconMap: Record<string, IconType> = {
  FaTint,
  FaUtensils,
  FaMedkit,
  FaTools,
  FaIdCard,
  FaHome,
  FaShieldAlt,
};

// Helper function to render an icon from the icon name
// export function renderCategoryIcon(iconName: string): JSX.Element {
//   const IconComponent = iconMap[iconName];
//   return IconComponent ? <IconComponent className="h-4 w-4" /> : <></>;
// }

const mockItems: ChecklistItem[] = [
  {
    id: "water-1",
    categoryId: "water",
    name: "Bottled Water",
    description: "One gallon per person per day for at least 3 days",
    checked: true,
    quantity: "3 gallons/person",
  },
  {
    id: "water-2",
    categoryId: "water",
    name: "Water Purification Tablets",
    description: "For treating potentially contaminated water",
    checked: false,
    quantity: "1 bottle",
  },
  {
    id: "water-3",
    categoryId: "water",
    name: "Water Storage Containers",
    description: "Clean containers for storing water",
    checked: false,
    quantity: "2-3 containers",
  },
  {
    id: "food-1",
    categoryId: "food",
    name: "Canned Foods",
    description: "Canned meat, fruits, vegetables, and soups",
    checked: true,
    quantity: "3-day supply",
  },
  {
    id: "food-2",
    categoryId: "food",
    name: "Dry Foods",
    description: "Rice, pasta, cereal, crackers",
    checked: false,
    quantity: "3-day supply",
  },
  {
    id: "food-3",
    categoryId: "food",
    name: "High-Energy Foods",
    description: "Peanut butter, nuts, granola bars, dried fruits",
    checked: false,
    quantity: "3-day supply",
  },
  {
    id: "food-4",
    categoryId: "food",
    name: "Can Opener",
    description: "Manual can opener for canned foods",
    checked: true,
  },
  {
    id: "medical-1",
    categoryId: "medical",
    name: "First Aid Kit",
    description: "Comprehensive kit with bandages, antiseptics, etc.",
    checked: true,
    quantity: "1 kit",
  },
  {
    id: "medical-2",
    categoryId: "medical",
    name: "Prescription Medications",
    description: "At least a 7-day supply of required medications",
    checked: false,
    quantity: "7-day supply",
  },
  {
    id: "medical-3",
    categoryId: "medical",
    name: "Over-the-counter Medications",
    description: "Pain relievers, anti-diarrhea medication, etc.",
    checked: true,
  },
  {
    id: "medical-4",
    categoryId: "medical",
    name: "Medical Equipment",
    description:
      "Any necessary equipment like inhalers, glucose monitors, etc.",
    checked: false,
  },
  {
    id: "tools-1",
    categoryId: "tools",
    name: "Flashlight",
    description: "Battery-powered or hand-crank flashlight",
    checked: true,
    quantity: "1 per person",
  },
  {
    id: "tools-2",
    categoryId: "tools",
    name: "Extra Batteries",
    description: "For flashlights and other devices",
    checked: false,
  },
  {
    id: "tools-3",
    categoryId: "tools",
    name: "Radio",
    description: "Battery-powered or hand-crank radio",
    checked: false,
    quantity: "1",
  },
  {
    id: "tools-4",
    categoryId: "tools",
    name: "Multi-tool or Knife",
    description: "For various emergency uses",
    checked: true,
    quantity: "1",
  },
  {
    id: "documents-1",
    categoryId: "documents",
    name: "Personal Identification",
    description: "IDs, driver's licenses, passports, birth certificates",
    checked: false,
  },
  {
    id: "documents-2",
    categoryId: "documents",
    name: "Insurance Documents",
    description: "Health, home, auto insurance information",
    checked: false,
  },
  {
    id: "documents-3",
    categoryId: "documents",
    name: "Emergency Contact List",
    description: "List of family contacts and emergency services",
    checked: true,
  },
  {
    id: "documents-4",
    categoryId: "documents",
    name: "Medical Information",
    description: "Medical records, prescriptions, allergies",
    checked: false,
  },
  {
    id: "shelter-1",
    categoryId: "shelter",
    name: "Blankets or Sleeping Bags",
    description: "For warmth and shelter",
    checked: true,
    quantity: "1 per person",
  },
  {
    id: "shelter-2",
    categoryId: "shelter",
    name: "Change of Clothes",
    description: "Complete set of clothing appropriate for the season",
    checked: false,
    quantity: "1-2 sets per person",
  },
  {
    id: "shelter-3",
    categoryId: "shelter",
    name: "Rain Gear",
    description: "Ponchos, raincoats, umbrella",
    checked: false,
  },
  {
    id: "safety-1",
    categoryId: "safety",
    name: "Fire Extinguisher",
    description: "Small canister ABC type",
    checked: false,
    quantity: "1",
  },
  {
    id: "safety-2",
    categoryId: "safety",
    name: "Whistle",
    description: "To signal for help",
    checked: true,
    quantity: "1 per person",
  },
  {
    id: "safety-3",
    categoryId: "safety",
    name: "Dust Masks",
    description: "To filter contaminated air",
    checked: false,
    quantity: "1 pack",
  },
];

export function useChecklist() {
  const [categories] = useState<ChecklistCategory[]>(mockCategories);
  const [items, setItems] = useState<ChecklistItem[]>(mockItems);

  // Load saved checklist from localStorage when component mounts
  useEffect(() => {
    loadProgress();
  }, []);

  // Save changes to localStorage whenever items change
  useEffect(() => {
    saveProgress();
  }, [items]);

  const loadProgress = useCallback(() => {
    const savedItems = localStorage.getItem("checklist");
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        console.error("Failed to parse saved checklist", e);
      }
    }
  }, []);

  const saveProgress = useCallback(() => {
    localStorage.setItem("checklist", JSON.stringify(items));
  }, [items]);

  const toggleItem = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return {
    categories,
    items,
    toggleItem,
    saveProgress,
    loadProgress,
    // renderCategoryIcon,
  };
}
