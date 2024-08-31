import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCodeTable from "../components/QRCodeTable";
import QRCodeGenerateButton from "../components/QRCodeGenerateButton";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import config from "../../config.js";

const QRCodeIndex = () => {
  const { companyId } = useParams();
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQRCodes();
  }, [companyId]);

  const fetchQRCodes = async () => {
    try {
      const response = await axios.get(
        `${config.backUrl}/companies/${companyId}/qrcodes`
      );
      console.log("Response data:", response.data);
      if (Array.isArray(response.data)) {
        setQrCodes(response.data);
      } else {
        setError("Expected an array but received something else");
        setQrCodes([]);
      }
    } catch (error) {
      setError("Error fetching QR codes");
      setQrCodes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleObsolete = async (id) => {
    try {
      await axios.post(
        `${config.backUrl}/companies/${companyId}/qrcodes/obsolete/${id}`
      );
      fetchQRCodes();
    } catch (error) {
      setError("Error obsoleting QR code");
    }
  };

  const handleGenerate = async () => {
    const printer_name = prompt("Enter printer name:");

    try {
      await axios.post(
        `${config.backUrl}/companies/${companyId}/qrcodes/generate`,
        { printer_name }
      );
      fetchQRCodes();
    } catch (error) {
      setError("Error generating QR code");
    }
  };

  const onDownload = async (qrCodeId, printer_name) => {
    const qrElement = document.getElementById(`qr-${qrCodeId}`);

    if (!qrElement) {
      console.error(`Element with ID qr-${qrCodeId} not found.`);
      return;
    }

    try {
      const canvas = await html2canvas(qrElement);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${printer_name}.png`;
      link.click();
    } catch (error) {
      console.error("Failed to capture QR code:", error);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>QR Code Management</h1>
        <QRCodeGenerateButton onGenerate={handleGenerate} />
      </div>
      {error && <div>{error}</div>}
      <QRCodeTable
        qrCodes={qrCodes}
        onObsolete={handleObsolete}
        onDownload={onDownload}
      />
    </div>
  );
};

export default QRCodeIndex;
