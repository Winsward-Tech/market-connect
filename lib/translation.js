import axios from "axios";

const GHANA_NLP_API_URL = "https://translation-api.ghananlp.org/v1/translate";
const SUBSCRIPTION_KEY = "b801fcb15dc245b299b806b4c8699dce";

export const SUPPORTED_LANGUAGES = {
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

export async function translateText(text, targetLanguage) {
  try {
    const response = await axios.post(
      GHANA_NLP_API_URL,
      {
        text,
        targetLanguage,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
        },
      }
    );

    return response.data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Failed to translate text");
  }
}
