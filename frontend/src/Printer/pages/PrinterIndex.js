import React, { useState, useEffect } from "react";
import PrinterTable from "../components/PrinterTable";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const PrinterIndex = () => {
  const { companyId } = useParams();
  const [printers, setPrinters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [printerName, setPrinterName] = useState("");
  const [alert, setAlert] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    fetchPrinters();
  }, [companyId]);

  const fetchPrinters = async () => {
    try {
      const response = await axiosPrivate.get(
        `/companies/${companyId}/printers`
      );
      setPrinters(response.data);
    } catch (error) {
      setError("Error fetching printers");
      setPrinters([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/companies/${companyId}/printers/${id}`);
      fetchPrinters();
    } catch (error) {
      setError("Error deleting printer");
    }
  };

  const handleGenerate = async () => {
    if (!printerName.trim()) {
      setError("Printer name is required");
      return;
    }

    try {
      const response = await axiosPrivate.post(
        `/companies/${companyId}/printers`,
        {
          name: printerName,
          company_id: companyId,
        }
      );

      await axiosPrivate.post(
        `/companies/${companyId}/printers/${response.data._id}/qrcodes/generate`,
        {
          companyId: companyId,
          printer_name: printerName,
        }
      );

      setShowModal(false); // Close the modal
      setPrinterName(""); // Clear input
      setError(null); // Clear any existing error messages

      // Update the printers state
      setPrinters((prevPrinters) => [...prevPrinters, response.data]);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleDownloadQR = async (printerId, printerName) => {
    try {
      const response = await axiosPrivate.get(
        `/companies/${companyId}/printers/${printerId}/qrcodes`
      );

      const qrCodeData = response.data.code; // base64 string of the QR code

      // Extract the data URL part (remove the data URL prefix)
      const base64Data = qrCodeData.split(",")[1];

      // Convert base64 to binary data
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Create a Blob from the binary data
      const blob = new Blob([byteArray], { type: "image/png" });

      // Create a URL from the Blob
      const url = URL.createObjectURL(blob);

      // Create a link element
      const a = document.createElement("a");
      a.href = url;
      a.download = `${printerName}.png`; // Set the file name
      document.body.appendChild(a); // Append the link to the body
      a.click(); // Trigger the download
      document.body.removeChild(a); // Remove the link from the body

      // Revoke the object URL after the download
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  const handleCloseAlert = () => setError(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex m-4 mb-0 align-items-center">
        <h4 className="mr-auto">Printer Management</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Printer
        </Button>
      </div>
      {error && (
        <Alert variant="danger" dismissible onClose={handleCloseAlert}>
          {error}
        </Alert>
      )}
      <PrinterTable
        printers={printers}
        onDelete={handleDelete}
        onDownloadQR={handleDownloadQR}
        companyId={companyId}
      />

      {/* Modal for adding a new printer */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Printer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={handleCloseAlert}>
              {error}
            </Alert>
          )}
          <Form>
            <Form.Group controlId="formPrinterName">
              <Form.Label>Printer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter printer name"
                value={printerName}
                onChange={(e) => setPrinterName(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleGenerate}>
            Add Printer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PrinterIndex;
