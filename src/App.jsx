import React, { useState, useEffect, useRef } from 'react';
import Snowfall from 'react-snowfall';
import confetti from 'canvas-confetti';
import { Analytics } from "@vercel/analytics/react";
import './App.css';

function App() {
  const [isFull, setIsFull] = useState(false);
  const [isNewYear, setIsNewYear] = useState(false);

  // ✅ FIXED TARGET DATE (LOCKED)
  const targetDateRef = useRef(
    new Date(`January 1, 2026 00:00:00`).getTime()
  );

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // ✅ TIME CALCULATION
  function calculateTimeLeft() {
    const difference = targetDateRef.current - Date.now();

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  // ✅ CONFETTI ON PAGE LOAD (3 TIMES)
  useEffect(() => {
    const bursts = [0, 500, 1000];

    bursts.forEach((delay) => {
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.7 },
        });
      }, delay);
    });
  }, []);

  // ✅ COUNTDOWN TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();

      if (!updatedTime) {
        setIsNewYear(true);
        clearInterval(timer);

        // 🎉 NEW YEAR CONFETTI
        confetti({
          particleCount: 300,
          spread: 140,
          origin: { y: 0.6 },
        });
      } else {
        setTimeLeft(updatedTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // FULLSCREEN LOGIC
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFull(true);
    } else {
      document.exitFullscreen();
      setIsFull(false);
    }
  };

  return (
    <>
      <div className="container">
        {/* Fullscreen Button */}
        <button className="fullscreen-btn" onClick={toggleFullScreen}>
          {isFull ? '⤢' : '⤢'}
        </button>

        {/* Snowfall */}
        <Snowfall
          color="white"
          snowflakeCount={200}
          style={{ position: 'fixed', width: '100%', height: '100%' }}
        />

        {/* Card */}
        <div className="glass-card">
          <h1 className="title">
            {isNewYear ? '🎉 Happy New Year 2026! 🎉' : 'Counting Down to 2026'}
          </h1>

          {!isNewYear && timeLeft && (
            <>
              <div className="timer-container">
                {Object.entries(timeLeft).map(([label, value]) => (
                  <div className="time-box" key={label}>
                    <span className="time-num">{value}</span>
                    <span className="time-label">{label}</span>
                  </div>
                ))}
              </div>

              <p className="message">
                Reflecting on the code written, the bugs squashed,<br />
                and the innovations yet to come. Happy New Year! 🥂
              </p>
            </>
          )}

          {isNewYear && (
            <p className="message">
              Wishing you a year full of growth, focus, and meaningful work!
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="footer">
          Made with ❤️ by{' '}
          <a
            href="https://www.linkedin.com/in/m-zeeshan-haider-606bb3284/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zeeshan
          </a>
        </div>
      </div>

      <Analytics />
    </>
  );
}

export default App;
