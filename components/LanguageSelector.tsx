import React from "react";
import { useTranslation } from "@/lib/TranslationContext";
import { Language } from "@/lib/translation";

const languageNames: Record<Language, string> = {
  en: "English",
  ak: "Akan",
  ee: "Ewe",
  tw: "Twi",
  ga: "Ga",
  dag: "Dagbani",
  gur: "Gurune",
  kpo: "Kposo",
  nzema: "Nzema",
  frafra: "Frafra",
  gonja: "Gonja",
  kasem: "Kasem",
  nawuri: "Nawuri",
  nchumuru: "Nchumuru",
  sisaala: "Sisaala",
  tampulma: "Tampulma",
  vagla: "Vagla",
  wala: "Wala",
  wasa: "Wasa",
  yobe: "Yobe",
};

export function LanguageSelector() {
  const { selectedLanguage, setLanguage } = useTranslation();

  return (
    <select
      value={selectedLanguage}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {Object.entries(languageNames).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
