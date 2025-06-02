import { useState, useCallback } from "react";

export function useAudioControls() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled((prev) => !prev);
  }, []);

  return {
    isAudioEnabled,
    toggleAudio,
  };
}
