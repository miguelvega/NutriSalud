import { useState } from 'react';
import './Chatbot.css';
import fondochatbot from '../../assets/fondochatbot.png';
import imagenchatbot from '../../assets/imagenchatbot.png';

const Chatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
      // Aquí puedes agregar la lógica para la API del chatbot
    }
  };

  const handleReset = () => {
    setMessages([]);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        <div className="messages">
          {messages.map((msg, index) => (
            <p key={index} className="user-message">{msg}</p>
          ))}
        </div>
        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
          />
          <button onClick={handleSend}>Enviar</button>
        </div>
      </div>
      <img src={fondochatbot} alt="Fondo Chatbot" className="fondo-chatbot" />
      <button onClick={handleReset} className="reset-chat">
        <img src={imagenchatbot} alt="Reiniciar Chat" className="imagen-chatbot" />
      </button>
    </div>
  );
};

export default Chatbot;
