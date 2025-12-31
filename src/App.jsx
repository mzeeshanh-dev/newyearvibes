import React, { useState, useEffect, useRef } from 'react';
import Snowfall from 'react-snowfall';
import confetti from 'canvas-confetti';
import { Analytics } from "@vercel/analytics/react";
import './App.css';

function App() {
  const [isFull, setIsFull] = useState(false);
  const [isNewYear, setIsNewYear] = useState(false);

  const targetDateRef = useRef(
    new Date('January 1, 2026 00:00:00').getTime()
  );

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const diff = targetDateRef.current - Date.now();
    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  //  CONFETTI ON PAGE LOAD (3 TIMES)
  useEffect(() => {
    [0, 500, 1000].forEach(delay => {
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.7 },
        });
      }, delay);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();

      if (!updated) {
        setIsNewYear(true);
        clearInterval(timer);

        confetti({
          particleCount: 300,
          spread: 140,
          origin: { y: 0.6 },
        });
      } else {
        setTimeLeft(updated);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);


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

        <button className="fullscreen-btn" onClick={toggleFullScreen}>
          {isFull ? (

            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v5H3M16 3v5h5M8 21v-5H3M16 21v-5h5" />
            </svg>
          ) : (

            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          )}
        </button>

        <Snowfall
          color="white"
          snowflakeCount={200}
          style={{ position: 'fixed', width: '100%', height: '100%' }}
        />

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
