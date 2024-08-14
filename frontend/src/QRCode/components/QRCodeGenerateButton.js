import React from "react";
import Button from "react-bootstrap/Button";

const QRCodeGenerateButton = ({ onGenerate }) => {
  return (
    <div className="mb-3">
      <Button variant="primary" onClick={onGenerate}>
        Generate New QR Code
      </Button>
    </div>
  );
};

export default QRCodeGenerateButton;
