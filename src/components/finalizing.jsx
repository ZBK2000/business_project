import React, { useState, useEffect } from 'react';


const CelebrationAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return isVisible ? (
    <div className="celebration-animation">
      <span role="img" aria-label="celebration emoji">
        🎉
      </span>
    </div>
  ) : null;
};

export default CelebrationAnimation;
