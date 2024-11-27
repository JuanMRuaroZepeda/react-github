import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css";
import Image from "./Image.png"; // Importar la imagen correctamente

const App = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  // Calcular tiempo restante
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + ((5 - targetDate.getDay()) % 7)); // Próximo viernes
    targetDate.setHours(23, 59, 59, 999);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setShowConfetti(true); // Mostrar confeti cuando termine la cuenta
        setTimeLeft(null);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const redirectToCiatSoftware = () => {
    window.open("https://www.ciatsoftware.com/", "_blank");
  };

  return (
    <div className="app-container">
      {showConfetti && <Confetti />}
      <header className="header">
        <img
          src={Image}
          alt="Black Friday Banner"
          className="banner"
          onClick={redirectToCiatSoftware}
        />
      </header>
      <main className="main-content">
        <h1 className="timer-title">BLACK FRIDAY</h1>
        {timeLeft ? (
          <div className="timer">
            <span>{timeLeft.days}d</span> :{" "}
            <span>{timeLeft.hours}h</span> :{" "}
            <span>{timeLeft.minutes}m</span> :{" "}
            <span>{timeLeft.seconds}s</span>
          </div>
        ) : (
          <h2 className="event-message">Happy Black Friday! 🎉</h2>
        )}
        <div className="contact">
          <a
            href="https://wa.link/kmvtkx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary contact-link"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
};

export default App;
