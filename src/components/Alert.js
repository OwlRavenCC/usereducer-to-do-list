import React, { useEffect } from "react";

const style = {
  danger: { backgroundColor: "var(--danger-color)" },
  success: { backgroundColor: "var(--success-color)" },
};

const Alert = ({ alert, closeAlert }) => {
  const { type, message } = alert;

  const alertColor = style[type];

  useEffect(() => {
    setTimeout(() => {
      closeAlert();
    }, 3000);
  });

  return (
    <div className={`alert`} style={alertColor}>
      {message}
    </div>
  );
};

export default Alert;
