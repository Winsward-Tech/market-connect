const GHANA_NLP_API_URL = 'https://translation-api.ghananlp.org/v1/translate';
const SUBSCRIPTION_KEY = '68ff973bba3e42fca7e50e9e4aa78c15';

// Supported language codes
export const SUPPORTED_LANGUAGES = {
  ENGLISH: 'en',
  TWI: 'tw',
  GA: 'gaa',
  EWE: 'ee',
  FANTE: 'fat',
  DAGBANI: 'dag'
};

// Language pairs for translation
export const LANGUAGE_PAIRS = {
  ENGLISH_TO_TWI: 'en-tw',
  ENGLISH_TO_GA: 'en-gaa',
  ENGLISH_TO_EWE: 'en-ee',
  ENGLISH_TO_FANTE: 'en-fat',
  ENGLISH_TO_DAGBANI: 'en-dag'
};

/**
 * Translate text using GhanaNLP Translation API
 * @param {string} text - The text to translate
 * @param {string} langPair - The language pair (e.g., 'en-tw' for English to Twi)
 * @returns {Promise<string>} - The translated text
 */
export const translateText = async (text, langPair) => {
  try {
    // Validate input length
    if (text.length > 1000) {
      throw new Error('Input text exceeds maximum length of 1000 characters');
    }

    // Validate language pair
    if (!Object.values(LANGUAGE_PAIRS).includes(langPair)) {
      throw new Error('Invalid language pair');
    }

    const response = await fetch(GHANA_NLP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY
      },
      body: JSON.stringify({
        in: text,
        lang: langPair
      }),
    });

    const data = await response.json();
    console.log('Translation API Response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Translation failed');
    }

    // The API returns the translated text directly in the response
    return data;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

/**
 * Get language name from code
 * @param {string} code - The language code
 * @returns {string} - The language name
 */
export const getLanguageName = (code) => {
  const languageNames = {
    [SUPPORTED_LANGUAGES.ENGLISH]: 'English',
    [SUPPORTED_LANGUAGES.TWI]: 'Twi',
    [SUPPORTED_LANGUAGES.GA]: 'Ga',
    [SUPPORTED_LANGUAGES.EWE]: 'Ewe',
    [SUPPORTED_LANGUAGES.FANTE]: 'Fante',
    [SUPPORTED_LANGUAGES.DAGBANI]: 'Dagbani'
  };

  return languageNames[code] || code;
}; 