import React, { useEffect, useState } from "react";
import { useTranslation } from "@/lib/TranslationContext";

interface TranslatedTextProps {
  text: string;
  className?: string;
}

export function TranslatedText({ text, className = "" }: TranslatedTextProps) {
  const { translate, selectedLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const updateTranslation = async () => {
      if (selectedLanguage === "en") {
        setTranslatedText(text);
        return;
      }

      setIsLoading(true);
      try {
        const result = await translate(text);
        if (isMounted) {
          setTranslatedText(result);
        }
      } catch (error) {
        console.error("Translation failed:", error);
        if (isMounted) {
          setTranslatedText(text);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    updateTranslation();

    return () => {
      isMounted = false;
    };
  }, [text, selectedLanguage, translate]);

  return (
    <span className={className}>
      {isLoading ? <span className="opacity-50">{text}</span> : translatedText}
    </span>
  );
}
