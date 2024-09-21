import React, { useState, useEffect } from 'react';

const Notification = ({ message, type = 'success', resetNotificationData,duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      resetNotificationData();  
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, resetNotificationData]);

  if (!visible) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade position-fixed top-8 end-0 me-2 z-3 show`} role="alert">
      {message}
      <button type="button" className="btn-close" onClick={() => setVisible(false)}></button>
    </div>
  );
};

export default Notification;
