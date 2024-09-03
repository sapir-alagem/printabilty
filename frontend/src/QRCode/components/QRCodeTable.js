import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import QRCode from "qrcode.react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "./QRCodeTable.css";

const QRCodeTable = ({ qrCodes, onObsolete, onDownload }) => {
  const [copiedText, setCopiedText] = useState("");
  const [loading, setLoading] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedText(text);
        setTimeout(() => {
          setCopiedText("");
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Copied to clipboard!
    </Tooltip>
  );

  const handleDownload = async (id, printerName) => {
    setLoading(id);
    try {
      await onDownload(id, printerName);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setLoading(null);
    }
  };

  if (qrCodes.length === 0) {
    return <div>No QR codes found.</div>;
  }

    return (
        <div className="m-4">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>QR Code</th>
                        <th>Company ID</th>
                        <th>Printer ID</th>
                        <th>Printer Name</th>
                        <th>Obsolete</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {qrCodes.map(qrCode => (
                        <tr key={qrCode._id}>
                            <td className="qr-code-cell">
                                <div id={`qr-${qrCode._id}`} className="qr-code-container">
                                    <QRCode value={qrCode.value} size={1024} />
                                </div>
                            </td>
                            <td>
                                <OverlayTrigger
                                    placement="top"
                                    show={copiedText === qrCode.company_id}
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <span
                                        onClick={() => handleCopy(qrCode.company_id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {qrCode.company_id}
                                    </span>
                                </OverlayTrigger>
                            </td>
                            <td>
                                <OverlayTrigger
                                    placement="top"
                                    show={copiedText === qrCode.printer_id}
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <span
                                        onClick={() => handleCopy(qrCode.printer_id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {qrCode.printer_id}
                                    </span>
                                </OverlayTrigger>
                            </td>
                            <td>
                                <OverlayTrigger
                                    placement="top"
                                    show={copiedText === qrCode.printer_name}
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <span
                                        onClick={() => handleCopy(qrCode.printer_name)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {qrCode.printer_name}
                                    </span>
                                </OverlayTrigger>
                            </td>
                            <td>{qrCode.obsolete ? 'Yes' : 'No'}</td>
                            <td>{new Date(qrCode.createdAt).toLocaleDateString()}</td>
                            <td className=''>
                                <button 
                                    className='btn-icon' 
                                    onClick={() => handleDownload(qrCode._id, qrCode.printer_name)}
                                    disabled={loading === qrCode._id} 
                                >
                                    {loading === qrCode._id ? (
                                        <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                      </div>
                                    ) : (
                                        <i className="bi bi-download"></i>
                                    )}
                                </button>
                                <button className='btn-icon' onClick={() => onObsolete(qrCode._id)} style={{ marginLeft: '8px' }} ><i className="bi bi-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );

};

export default QRCodeTable;
