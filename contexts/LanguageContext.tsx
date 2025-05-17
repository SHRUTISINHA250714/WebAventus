"use client";

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from "react";
import { Language } from "@/hooks/useLanguage";

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  languages: Language[];
}

const defaultLanguages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
];

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  setLanguage: () => {},
  languages: defaultLanguages,
});

export const useLanguageContext = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  
  useEffect(() => {
    // Load language preference from localStorage on first render
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);
  
  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", currentLanguage);
  }, [currentLanguage]);
  
  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
  };
  
  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        setLanguage, 
        languages: defaultLanguages 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}