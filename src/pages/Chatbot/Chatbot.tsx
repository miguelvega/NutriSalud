import { useState } from "react";
import "./Chatbot.css";
import fondochatbot from "../../assets/fondochatbot.png";
import imagenchatbot from "../../assets/imagenchatbot.png";
import { VoiceRecognition } from "../../components";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Función para interactuar con la API de Groq
  const fetchGroqResponse = async (message: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(import.meta.env.VITE_GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            // Prompt del sistema con restricciones
            {
              role: "system",
              content: `Eres un asistente virtual especializado en brindar recomendaciones nutricionales personalizadas para pacientes con condiciones médicas como diabetes, hipertensión, problemas cardiovasculares, alergias alimentarias y objetivos como pérdida de peso, aumento de masa muscular, o mejora del rendimiento deportivo. Debes proporcionar respuestas basadas en la salud de los pacientes, ajustando las recomendaciones según su perfil, historial médico y objetivos de salud. El único ámbito en el que puedes ayudar es relacionado con salud, nutrición y la app NutriSalud. Si el usuario pregunta sobre temas ajenos a estos, debes informarles educadamente que solo puedes responder preguntas sobre salud y nutrición, y sobre la funcionalidad de la app. Debes responder de forma corta a lo máximo 120 caracteres y de forma amigable`,
            },
            // Mensaje del usuario
            {
              role: "user",
              content: message,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
      }

      const data = await response.json();

      // Verificamos si la respuesta se desvía del tema esperado
      const responseMessage = data.choices[0]?.message?.content;
      if (responseMessage) {
        if (
          responseMessage.toLowerCase().includes("no puedo responder") ||
          responseMessage.toLowerCase().includes("tema no relacionado")
        ) {
          return "Lo siento, solo puedo responder preguntas relacionadas con salud, nutrición y la app NutriSalud.";
        }
        return responseMessage;
      }

      return "Hubo un problema con la respuesta.";
    } catch (error: any) {
      console.error("Error al llamar a la API de Groq:", error);
      return `Error: ${error.message}`;
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar envío de mensajes
  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      // Obtener respuesta de la API
      const botResponse = await fetchGroqResponse(input);
      const botMessage = { sender: "bot", text: botResponse };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  // Reiniciar mensajes
  const handleReset = () => {
    setMessages([]);
  };

  // Manejar input de voz
  const handleVoiceInput = async (transcript: string) => {
    if (transcript.trim()) {
      const userMessage = { sender: "user", text: transcript };
      setMessages((prev) => [...prev, userMessage]);

      const botResponse = await fetchGroqResponse(transcript);
      const botMessage = { sender: "bot", text: botResponse };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        <div className="messages">
          {messages.map((msg, index) => (
            <p
              key={index}
              className={msg.sender === "user" ? "user-message" : "bot-message"}
            >
              {msg.text}
            </p>
          ))}
          {isLoading && <p className="bot-message">Escribiendo...</p>}
        </div>
        <div className="input-section">
          <input
            className="input-chatbot"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
          />
          <button onClick={handleSend} disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
      <img src={fondochatbot} alt="Fondo Chatbot" className="fondo-chatbot" />
      <button onClick={handleReset} className="reset-chat">
        <img
          src={imagenchatbot}
          alt="Reiniciar Chat"
          className="imagen-chatbot"
        />
      </button>
      {/* Componente de reconocimiento de voz */}
      <VoiceRecognition onVoiceInput={handleVoiceInput} />
    </div>
  );
};

export default Chatbot;
