import { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./Chatbot.css";
import { VoiceRecognition } from "../../components";
import { HfInference } from "@huggingface/inference";
import { useAuth } from "../../context";

interface Message {
  sender: string;
  text: string;
  image?: string; // El campo image es opcional
}

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
            {
              role: "system",
              content: `¡Hola! ${user.role} ${user.name} un gusto hablar contigo,soy tu asistente de NutriSalud, aquí para ayudarte con tu salud y nutrición. Por favor, responde de manera breve (máximo dos líneas). El usuario es un ${user.role} recuerdalo y debes de seguir la conversacion respecto a eso. Debes de saludarla por su nombre
              Lo siguiente va a depender de si es un paciente debes de preguntarle acerca de consultas o dudas de la aplicación o sobre sus problemas nutricionales.
              Si es un nutricionista debes de preguntarle si tiene alguna duda o si quiere saber algunas ultimas noticias acerca del mundo de la nutricion
              `,
            },
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
      const responseMessage = data.choices[0]?.message?.content;

      if (responseMessage) {
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

  const processImage = async (imageFile: any) => {
    const HF_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_KEY; // Tu clave de Hugging Face
    const inference = new HfInference(HF_TOKEN);

    try {
      // Convertir el archivo de imagen a un blob
      const imageBlob =
        imageFile instanceof Blob
          ? imageFile
          : await (await fetch(imageFile)).blob();

      // Hacer la inferencia
      const response = await inference.imageToText({
        data: imageBlob,
        model: "Salesforce/blip-image-captioning-base",
      });

      console.log("Texto generado:", response);
      return response.generated_text || "No se generó texto.";
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
      return "No se pudo extraer el texto de la imagen.";
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = { sender: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const botResponse = await fetchGroqResponse(input);
      const botMessage: Message = { sender: "bot", text: botResponse };
      setMessages((prev) => [...prev, botMessage]);

      speakResponse(botResponse);
    }
  };

  const handleVoiceInput = async (transcript: string) => {
    if (transcript.trim()) {
      const userMessage: Message = { sender: "user", text: transcript };
      setMessages((prev) => [...prev, userMessage]);

      const botResponse = await fetchGroqResponse(transcript);
      const botMessage: Message = { sender: "bot", text: botResponse };
      setMessages((prev) => [...prev, botMessage]);

      speakResponse(botResponse);
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const image = acceptedFiles[0];
    setImageUrl(URL.createObjectURL(image));
    const caption = await processImage(image);
    const botMessage: Message = {
      sender: "bot",
      text: `Descripción de la imagen: ${caption}`,
      image: URL.createObjectURL(image), // Asignamos la imagen al mensaje del bot
    };
    setMessages((prev) => [...prev, botMessage]);
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
