// Tipos manuales para webkitSpeechRecognition
type SpeechRecognitionEvent = Event & {
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionErrorEvent = Event & {
  error: string;
};

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

import { useState, useEffect } from "react";

type VoiceRecognitionProps = {
  onVoiceInput: (transcript: string) => void;
};

export const VoiceRecognition = ({ onVoiceInput }: VoiceRecognitionProps) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      setError(
        "API de reconocimiento de voz no compatible con este navegador."
      );
    }
  }, []);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      onVoiceInput(result); // Enviar el texto transcrito al chatbot
    };
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div style={styles.container}>
      {error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <>
          <button
            style={isListening ? styles.buttonActive : styles.button}
            onClick={startListening}
            disabled={isListening}
          >
            {isListening ? "Escuchando..." : "Hablar"}
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonActive: {
    padding: "10px 20px",
    backgroundColor: "#FF6347",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "not-allowed",
  },
  error: {
    color: "red",
  },
};
