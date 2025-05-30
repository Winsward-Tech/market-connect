"use client";

import React from "react";
import { useTranslation } from "@/lib/TranslationContext";
import { SUPPORTED_LANGUAGES } from "@/lib/translation";

export function LanguageSelector() {
  const { selectedLanguage, setLanguage } = useTranslation();

  return (
    <select
      value={selectedLanguage}
      onChange={(e) => setLanguage(e.target.value)}
      className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
