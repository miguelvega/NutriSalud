import { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./Chatbot.css";
import { VoiceRecognition } from "../../components";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useAuth } from "../../context";

interface Message {
  sender: string;
  text: string;
  image?: string; // El campo image es opcional
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const speakResponse = (response: string) => {
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = "es-ES";
    window.speechSynthesis.speak(utterance);
  };

  const { user } = useAuth();

  const fetchGeminiResponse = async (message: string) => {
    try {
      setIsLoading(true);

      // Inicializamos el modelo y el chat
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `¡Hola! ${user.role} ${user.name}, un gusto hablar contigo. Soy tu asistente de NutriSalud, aquí para ayudarte con tu salud y nutrición. Responde de manera breve (máximo dos líneas).`,
              },
            ],
          },
        ],
      });

      // Enviamos el mensaje del usuario
      const result = await chat.sendMessage(message);
      return result.response.text();
    } catch (error: any) {
      console.error("Error al obtener respuesta de Gemini:", error);
      return `Error: ${error.message}`;
    } finally {
      setIsLoading(false);
    }
  };

  const processImage = async (imageFile: File) => {
    try {
      // Convertir la imagen a Blob si es necesario
      const imageBlob =
        imageFile instanceof Blob
          ? imageFile
          : await (await fetch(imageFile)).blob();

      // Convertir la imagen a base64
      const base64Image = await convertToBase64(imageBlob);

      // Aquí estamos creando una "parte" de imagen para enviar a la IA
      const imagePart = {
        inlineData: {
          data: base64Image, // Base64 de la imagen
          mimeType: imageBlob.type, // Tipo de la imagen
        },
      };

      // Enviar la imagen a la IA con un prompt que pida una descripción
      const prompt = "Describe esta imagen de la mejor manera posible.";
      const result = await model.generateContent([prompt, imagePart]);

      // Procesar la respuesta de la IA
      return result.response.text() || "No se pudo generar texto.";
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
      return "No se pudo extraer información de la imagen.";
    }
  };

  // Función para convertir imagen Blob a Base64
  const convertToBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = { sender: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const botResponse = await fetchGeminiResponse(input);
      const botMessage: Message = { sender: "bot", text: botResponse };
      setMessages((prev) => [...prev, botMessage]);

      speakResponse(botResponse);
    }
  };

  const handleVoiceInput = async (transcript: string) => {
    if (transcript.trim()) {
      const userMessage: Message = { sender: "user", text: transcript };
      setMessages((prev) => [...prev, userMessage]);

      const botResponse = await fetchGeminiResponse(transcript);
      const botMessage: Message = { sender: "bot", text: botResponse };
      setMessages((prev) => [...prev, botMessage]);

      speakResponse(botResponse);
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const image = acceptedFiles[0];
      setImageUrl(URL.createObjectURL(image)); // Mostrar la vista previa de la imagen cargada

      // Procesar la imagen y obtener la respuesta generada por la IA
      const caption = await processImage(image);

      // Enviar el mensaje del bot con la descripción generada
      const botMessage: Message = {
        sender: "bot",
        text: `Descripción de la imagen: ${caption}`, // Descripción generada por la IA
        image: URL.createObjectURL(image), // Mostrar la imagen enviada
      };

      setMessages((prev) => [...prev, botMessage]);
    } else {
      console.error("No se cargó ninguna imagen válida.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  });

  const handleReset = () => {
    setMessages([]);
    setImageUrl(null);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === "user" ? "user-message" : "bot-message"}
            >
              <p>{msg.text}</p>
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Imagen enviada"
                  className="message-image"
                />
              )}
            </div>
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
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>
          Arrastra y suelta una imagen aquí, o haz clic para seleccionar una.
        </p>
      </div>
      {imageUrl && (
        <img src={imageUrl} alt="Imagen cargada" className="image-preview" />
      )}
      <button onClick={handleReset} className="reset-chat">
        Reiniciar Chat
      </button>
      <VoiceRecognition onVoiceInput={handleVoiceInput} />
    </div>
  );
};

export default Chatbot;
