"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const languages = [
  {
    label: "Twi",
    code: "twi",
    flag: "/flags/ghana_flag.png",
    audio: "/audio/twi.mp3",
  },
  {
    label: "Ewe",
    code: "ewe",
    flag: "/flags/ghana_flag.png",
    audio: "/audio/ewe.mp3",
  },
  {
    label: "Ga",
    code: "ga",
    flag: "/flags/ghana_flag.png",
    audio: "/audio/ga.mp3",
  },
  {
    label: "Dagbani",
    code: "dagbani",
    flag: "/flags/ghana_flag.png",
    audio: "/audio/dagbani.mp3",
  },
  {
    label: "English",
    code: "en",
    flag: "/flags/uk_flag.png",
    audio: "/audio/english.mp3",
  },
];

export default function SelectLanguage() {
  const [selectedLang, setSelectedLang] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang) {
      setSelectedLang(savedLang);
    }
  }, []);

  const handleSelect = async (lang) => {
    setSelectedLang(lang.code);
    setError("");

    try {
      const audio = new Audio(lang.audio);
      await audio.play();
    } catch (err) {
      console.error("Error playing audio:", err);
      setError("Could not play audio. Please check your sound settings.");
    }
  };

  const confirmSelection = () => {
    if (selectedLang) {
      localStorage.setItem("selectedLanguage", selectedLang);
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 space-y-6">
        <button onClick={() => router.back()} className="text-sm text-gray-500">
          ← Back
        </button>
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Select Language
        </h2>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`flex items-center justify-between w-full p-4 rounded-lg border ${
                selectedLang === lang.code
                  ? "border-green-600 bg-green-100"
                  : "border-gray-200"
              }`}
              onClick={() => handleSelect(lang)}
            >
              <span className="flex items-center space-x-3">
                <span className="w-8 h-6 relative">
                  <Image
                    src={lang.flag}
                    alt={`${lang.label} flag`}
                    fill
                    className="object-cover rounded"
                  />
                </span>
                <span className="text-lg font-medium">{lang.label}</span>
              </span>
              <span className="text-xl">🔊</span>
            </button>
          ))}
        </div>

        <button
          onClick={confirmSelection}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            selectedLang
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!selectedLang}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
}
