import { useState, useEffect } from "react";

export function useLearningContent(slug) {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch(`/api/learning/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const data = await response.json();
        setContent(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  return { content, isLoading, error };
}
