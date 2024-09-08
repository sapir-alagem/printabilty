import React from "react";

const SuccessfulRegistration = ({ formData }) => {
  return (
    <div className="content">
      <h2>🎉 Registration Successful! 🎉</h2>
      <p>
        We've sent a guide and the agent to your email:{" "}
        <strong>{formData.email}</strong> 📧
      </p>
      <p>Once you've installed everything, come back here to:</p>
      <p>Access your dashboard 🖥️</p>
      <p>Start setting up your printer network 🖨️</p>
      <p>We're excited to see you get started! 🚀</p>
    </div>
  );
};

export default SuccessfulRegistration;
