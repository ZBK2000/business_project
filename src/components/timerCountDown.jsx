import React, { useState, useEffect } from "react";
import moment from "moment";

const CountdownTimer = ({ targetDateStr }) => {
  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    const newTargetDate =  targetDateStr.split(" ")[0] + targetDateStr.split(" ")[1].split("-")
    const targetDate = moment(newTargetDate, "YYYY-MM-DD HH");
    const interval = setInterval(() => {
      const now = moment();
      const duration = moment.duration(targetDate.diff(now));

      setCountdown({
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
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
