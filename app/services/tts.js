const API_URL = "https://translation-api.ghananlp.org/tts/v1";
const SUBSCRIPTION_KEY = "68ff973bba3e42fca7e50e9e4aa78c15"; // Your subscription key

// Cache for storing audio data
const audioCache = new Map();

export const SUPPORTED_LANGUAGES = {
  TW: {
    code: "tw",
    name: "Twi",
    speakers: ["twi_speaker_4", "twi_speaker_5", "twi_speaker_6", "twi_speaker_7", "twi_speaker_8", "twi_speaker_9"]
  },
  EE: {
    code: "ee",
    name: "Ewe",
    speakers: ["ewe_speaker_3", "ewe_speaker_4"]
  }
};

export async function getLanguages() {
  try {
    const response = await fetch(`${API_URL}/languages`, {
      headers: {
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch languages");
    }

    const data = await response.json();
    return data.languages;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
}

export async function getSpeakers() {
  try {
    const response = await fetch(`${API_URL}/speakers`, {
      headers: {
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch speakers");
    }

    const data = await response.json();
    return data.speakers;
  } catch (error) {
    console.error("Error fetching speakers:", error);
    throw error;
  }
}

export async function textToSpeech(text, language, speaker) {
  try {
    // Check cache first
    const cacheKey = `${text}-${language}-${speaker}`;
    if (audioCache.has(cacheKey)) {
      return audioCache.get(cacheKey);
    }

    console.log('Making TTS request with:', {
      text,
      language,
      speaker_id: speaker
    });

    const response = await fetch(`${API_URL}/synthesize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY
      },
      body: JSON.stringify({
        text,
        language,
        speaker_id: speaker
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('TTS API Error:', errorData);
      throw new Error(errorData.message || "Failed to synthesize speech");
    }

    // Check if the response is audio/wav
    const contentType = response.headers.get("content-type");
    if (contentType !== "audio/wav") {
      throw new Error("Invalid response format. Expected audio/wav");
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    // Cache the result
    audioCache.set(cacheKey, audioUrl);

    return audioUrl;
  } catch (error) {
    console.error("Error in text-to-speech:", error);
    throw error;
  }
}

export function getDefaultSpeaker(language) {
  const langCode = language.toLowerCase();
  switch (langCode) {
    case "tw":
      return SUPPORTED_LANGUAGES.TW.speakers[0];
    case "ee":
      return SUPPORTED_LANGUAGES.EE.speakers[0];
    default:
      return SUPPORTED_LANGUAGES.TW.speakers[0];
  }
}

export function getLanguageCode(language) {
  const langCode = language.toLowerCase();
  switch (langCode) {
    case "twi":
      return "tw";
    case "ewe":
      return "ee";
    default:
      return "tw";
  }
}

export function isLanguageSupportedForTTS(language) {
  const langCode = language.toLowerCase();
  return langCode === "tw" || langCode === "ee";
} 