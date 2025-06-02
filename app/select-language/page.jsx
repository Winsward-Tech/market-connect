"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";

const languages = [
  {
    label: "Twi",
    code: "twi",
    flag: "/flags/ghana_flag.png",
    audio: "/audio/twi.mp3",
    description: "Select Twi as your language",
  },
  {
    label: "Ewe",
    code: "ewe",
    flag: "/flags/ghana_flag.png",
    audio: "/audio/ewe.mp3",
    description: "Select Ewe as your language",
  },
  {
    label: "Ga",
    code: "ga",
    flag: "/flags/ghana_flag.png",
    audio: "/audio/ga.mp3",
    description: "Select Ga as your language",
  },
  {
    label: "Dagbani",
    code: "dagbani",
    flag: "/flags/ghana_flag.png",
    audio: "/audio/dagbani.mp3",
    description: "Select Dagbani as your language",
  },
  {
    label: "English",
    code: "en",
    flag: "/flags/uk_flag.png",
    audio: "/audio/english.mp3",
    description: "Select English as your language",
  },
];

export default function SelectLanguage() {
  const [selectedLang, setSelectedLang] = useState(null);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
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
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const audio = new Audio(lang.audio);
      setCurrentAudio(audio);

      // Add event listeners
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentAudio(null);
      };
      audio.onerror = (e) => {
        console.error("Audio error:", e);
        setError("Could not play audio. Please check your sound settings.");
        setIsPlaying(false);
        setCurrentAudio(null);
      };

      await audio.play();
    } catch (err) {
      console.error("Error playing audio:", err);
      setError("Could not play audio. Please check your sound settings.");
      setIsPlaying(false);
      setCurrentAudio(null);
    }
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
      setCurrentAudio(null);
    }
  };

  const confirmSelection = () => {
    if (selectedLang) {
      localStorage.setItem("selectedLanguage", selectedLang);
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Go Back</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Choose Your Language
            </h1>
            <p className="text-gray-600">
              Select the language you are most comfortable with
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`flex items-center justify-between w-full p-4 rounded-lg border transition-all ${
                  selectedLang === lang.code
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
                onClick={() => handleSelect(lang)}
                aria-label={lang.description}
              >
                <span className="flex items-center space-x-4">
                  <span className="w-10 h-8 relative">
                    <Image
                      src={lang.flag}
                      alt={`${lang.label} flag`}
                      fill
                      className="object-cover rounded"
                    />
                  </span>
                  <span className="text-lg font-medium">{lang.label}</span>
                </span>
                {isPlaying && currentAudio?.src === lang.audio ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      stopAudio();
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Stop audio"
                  >
                    <VolumeX className="h-6 w-6 text-gray-600" />
                  </button>
                ) : (
                  <span className="p-2 hover:bg-gray-100 rounded-full">
                    <Volume2 className="h-6 w-6 text-gray-600" />
                  </span>
                )}
              </button>
            ))}
          </div>

          <Button
            onClick={confirmSelection}
            className={`w-full py-6 text-lg font-semibold ${
              selectedLang
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!selectedLang}
          >
            {selectedLang ? "Continue" : "Please select a language"}
          </Button>
        </div>
      </div>
    </div>
  );
}
