import React, { useState, useEffect } from 'react';
import Snowfall from 'react-snowfall';
import confetti from 'canvas-confetti';
import { Analytics } from "@vercel/analytics/react"
import './App.css';

function App() {
  const [isFull, setIsFull] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isNewYear, setIsNewYear] = useState(false);

  // Timer Logic
  function calculateTimeLeft() {
    const nextYear = new Date().getFullYear() + 1;
    const difference = +new Date(`January 1, ${nextYear} 00:00:00`) - +new Date();

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);

      // Check if countdown finished
      if (
        newTime.days === undefined &&
        newTime.hours === undefined &&
        newTime.minutes === undefined &&
        newTime.seconds === undefined
      ) {
        setIsNewYear(true);
        // Fireworks/confetti
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.6 },
        });
        clearInterval(timer); // stop interval
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fullscreen Logic
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFull(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFull(false);
      }
    }
  };

  return (
    <>
      <div className="container">
        {/* Fullscreen Button */}
        <button className="fullscreen-btn" onClick={toggleFullScreen}>
          {isFull ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v5H3M16 3v5h5M8 21v-5H3M16 21v-5h5" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          )}
        </button>

        {/* Snowfall Effect */}
        <Snowfall
          color="white"
          snowflakeCount={200}
          style={{ position: 'fixed', width: '100%', height: '100%' }}
        />

        {/* Countdown Card */}
        <div className="glass-card">
          <h1 className="title">{isNewYear ? '🎉 Happy New Year 2026! 🎉' : 'Counting Down to 2026'}</h1>

          {!isNewYear && (
            <>
              <div className="timer-container">
                <div className="time-box">
                  <span className="time-num">{timeLeft.days || '0'}</span>
                  <span className="time-label">Days</span>
                </div>
                <div className="time-box">
                  <span className="time-num">{timeLeft.hours || '0'}</span>
                  <span className="time-label">Hours</span>
                </div>
                <div className="time-box">
                  <span className="time-num">{timeLeft.minutes || '0'}</span>
                  <span className="time-label">Mins</span>
                </div>
                <div className="time-box">
                  <span className="time-num">{timeLeft.seconds || '0'}</span>
                  <span className="time-label">Secs</span>
                </div>
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
