"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "tw", name: "Twi" },
  { code: "ew", name: "Ewe" },
  { code: "ga", name: "Ga" },
  { code: "da", name: "Dagbani" },
];

export default function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const handleLanguageChange = (code) => {
    setCurrentLanguage(code);
    // In a real app, this would change the app's language
  };

  const getCurrentLanguageName = () => {
    return (
      languages.find((lang) => lang.code === currentLanguage)?.name || "English"
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{getCurrentLanguageName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={currentLanguage === language.code ? "bg-green-100" : ""}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
