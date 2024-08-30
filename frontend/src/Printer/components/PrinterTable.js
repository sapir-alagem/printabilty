import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Modal, Button, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PrinterTable = ({ initialPrinters, onDelete, onDownloadQR, companyId }) => {
  const [alert, setAlert] = useState(null);
  const [printers, setPrinters] = useState(initialPrinters || []);
  const [showModal, setShowModal] = useState(false);
  const [currentPrinter, setCurrentPrinter] = useState(null);
  const [printerName, setPrinterName] = useState("");
  const [status, setStatus] = useState("active");
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!initialPrinters) {
      const fetchPrinters = async () => {
        try {
          const response = await axiosPrivate.get(`/companies/${companyId}/printers`);
          setPrinters(response.data);
        } catch (error) {
          console.error("Failed to load printers:", error);
        }
      };
      fetchPrinters();
    }
  }, [companyId, initialPrinters, printers]);

  const handleDelete = async (printerId) => {
    if (window.confirm("Are you sure you want to delete this printer?")) {
      try {
        await axiosPrivate.delete(`/companies/${companyId}/printers/${printerId}`);
        setPrinters((prevPrinters) => prevPrinters.filter((p) => p._id !== printerId));
        setAlert({
          type: "success",
          message: "Printer deleted successfully.",
        });
        handleModalClose();
      } catch (error) {
        setAlert({
          type: "danger",
          message: "Failed to delete printer.",
        });
      }
    }
  };

  const sanityCheck = (companyId, printerName) => {
    axiosPrivate.post("/print_jobs/test", { companyId, printerName });
    setAlert({
      type: "success",
      message: "Sanity check initiated.",
    });
  };

  const handleChangeStatus = async (printer) => {
    const newStatus = printer.status === "active" ? "suspended" : "active";
    try {
      await axiosPrivate.put(`/companies/${companyId}/printers/${printer._id}`, {
        status: newStatus,
      });

      setPrinters((prevPrinters) =>
        prevPrinters.map((p) => (p._id === printer._id ? { ...p, status: newStatus } : p))
      );

      setAlert({
        type: "success",
        message: `Printer ${printer.name} status updated to ${newStatus}.`,
      });
    } catch (error) {
      setAlert({
        type: "danger",
        message: "Failed to update printer status.",
      });
    }
  };

  const handleEditClick = (printer) => {
    setAlert(null);
    setCurrentPrinter(printer);
    setPrinterName(printer.name);
    setStatus(printer.status);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentPrinter(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.put(`/companies/${companyId}/printers/${currentPrinter._id}`, {
        name: printerName,
        companyId: companyId,
        status,
      });
      setPrinters((prevPrinters) =>
        prevPrinters.map((p) =>
          p._id === currentPrinter._id ? { ...p, name: printerName, status } : p
        )
      );
      setAlert({
        type: "success",
        message: `Printer ${printerName} updated successfully.`,
      });
      handleModalClose();
    } catch (error) {
      setAlert({
        type: "danger",
        message: `Failed to update printer: ${error.response.data.message}`,
      });
    }
  };

  if (printers.length === 0) {
    return <div>No printers found.</div>;
  }

  return (
    <div className="m-4">
      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Printer Name</th>
            <th>Status</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {printers.map((printer) => (
            <tr key={printer._id}>
              <td>{printer.name}</td>
              <td>
                <Form.Check
                  type="switch"
                  id={`status-switch-${printer._id}`}
                  checked={printer.status === "active"}
                  onChange={() => handleChangeStatus(printer)}
                />
              </td>
              <td>{printer.created_at ? new Date(printer.created_at).toLocaleDateString() : "N/A"}</td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={`tooltip-edit-${printer._id}`}>Edit Printer</Tooltip>}
                >
                  <button className="btn btn-icon btn-sm" onClick={() => handleEditClick(printer)}>
                    <i className="bi bi-pencil"></i>
                  </button>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-sanity-check-${printer._id}`}>Sanity Check</Tooltip>
                  }
                >
                  <button
                    className="btn btn-icon btn-sm"
                    onClick={() => sanityCheck(companyId, printer.name)}
                  >
                    <i className="bi bi-clipboard-check"></i>
                  </button>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-download-qr-${printer._id}`}>Download QR Code</Tooltip>
                  }
                >
                  <button
                    className="btn btn-icon btn-sm"
                    onClick={() => onDownloadQR(printer._id, printer.name)}
                  >
                    <i className="bi bi-qr-code"></i>
                  </button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Printer Modal */}
      {currentPrinter && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Printer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alert && (
              <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
                {alert.message}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formPrinterName">
                <Form.Label>Printer Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter printer name"
                  value={printerName}
                  onChange={(e) => setPrinterName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPrinterStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} required>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </Form.Select>
              </Form.Group>
              <Button variant="secondary" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(currentPrinter._id)}
                className="ms-3"
              >
                Delete Printer
              </Button>
              <Button variant="primary" type="submit" className="ms-3">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default PrinterTable;
