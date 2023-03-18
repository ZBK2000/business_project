import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDateStr }) => {
  const [countdown, setCountdown] = useState({});
  
  useEffect(() => {
    const [dateStr, timeStr] = targetDateStr.split(" ");
    const timeStrWithColons = timeStr.split("-")[0] + ":00";
    const targetDate = new Date(`${dateStr} ${timeStrWithColons}`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr]);

  return (
    <div>
      <p>
        {countdown.days} days, {countdown.hours} hours, {countdown.minutes}{" "}
        minutes, {countdown.seconds} seconds away from start
      </p>
    </div>
  );
};

export default CountdownTimer;
