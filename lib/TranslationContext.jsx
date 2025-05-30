"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { translateText } from "./translation";

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [translations, setTranslations] = useState({});

  const setLanguage = useCallback((lang) => {
    setSelectedLanguage(lang);
  }, []);

  const translate = useCallback(
    async (text) => {
      // If the text is already translated and cached, return it
      const cacheKey = `${text}-${selectedLanguage}`;
      if (translations[cacheKey]) {
        return translations[cacheKey];
      }

      // If the selected language is English, return the original text
      if (selectedLanguage === "en") {
        return text;
      }

      try {
        const translatedText = await translateText(text, selectedLanguage);

        // Cache the translation
        setTranslations((prev) => ({
          ...prev,
          [cacheKey]: translatedText,
        }));

        return translatedText;
      } catch (error) {
        console.error("Translation failed:", error);
        return text; // Fallback to original text if translation fails
      }
    },
    [selectedLanguage, translations]
  );

  return (
    <TranslationContext.Provider
      value={{ selectedLanguage, setLanguage, translate }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
