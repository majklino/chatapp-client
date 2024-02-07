import React, { useState, useEffect } from 'react';

const Popup = ({text, color}) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    setShowPopup(true);

    const timeoutId = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {showPopup && (
        <div className="popup" style={{backgroundColor: color}}>
          <div className="popup-content">
            <p>{text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
