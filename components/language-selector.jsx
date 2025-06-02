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

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    // Here you would typically trigger a language change event or API call
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={currentLanguage === lang.code ? "bg-green-50" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 