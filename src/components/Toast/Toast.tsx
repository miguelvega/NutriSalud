import { useEffect, useState } from "react";
import "./Toast.css";

interface ToastProps {
  message: string;
  duration?: number; // Duration in milliseconds
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  onClose,
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutTime = duration - 300; // Start fading out 300ms before it closes
    const fadeOutTimer = setTimeout(() => setIsFadingOut(true), fadeOutTime);

    const closeTimer = setTimeout(onClose, duration);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div className={`toast ${isFadingOut ? "fade-out" : ""}`}>{message}</div>
  );
};
