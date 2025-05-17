"use client";

import { useState, useEffect, createContext, useContext } from "react";

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const supportedLanguages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
];

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const languages = supportedLanguages;
  
  // Load language preference from localStorage on first render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);
  
  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", currentLanguage);
  }, [currentLanguage]);
  
  return {
    currentLanguage,
    setLanguage: setCurrentLanguage,
    languages,
  };
}