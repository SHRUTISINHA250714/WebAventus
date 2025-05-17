"use client";

import { Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageSelector() {
  const { languages, currentLanguage, setLanguage } = useLanguage();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          <Globe className="h-4 w-4 mr-2" />
          {currentLanguage}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={currentLanguage} onValueChange={setLanguage}>
          {languages.map((language) => (
            <DropdownMenuRadioItem key={language.code} value={language.code}>
              <div className="flex items-center justify-between w-full">
                <span>{language.name}</span>
                <span className="text-muted-foreground text-xs">{language.nativeName}</span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}