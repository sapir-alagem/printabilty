import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Modal,
  Button,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { isMobile } from "react-device-detect";

const PrinterTable = ({
  initialPrinters,
  onDelete,
  onDownloadQR,
  companyId,
}) => {
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
          const response = await axiosPrivate.get(
            `/companies/${companyId}/printers`
          );
          setPrinters(response.data);
        } catch (error) {
          console.error("Failed to load printers:", error);
        }
      };
      fetchPrinters();
    }
  }, [companyId, initialPrinters]);

  const handleDelete = async (printerId) => {
    if (window.confirm("Are you sure you want to delete this printer?")) {
      try {
        await axiosPrivate.delete(
          `/companies/${companyId}/printers/${printerId}`
        );
        setPrinters((prevPrinters) =>
          prevPrinters.filter((p) => p._id !== printerId)
        );
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
      await axiosPrivate.put(
        `/companies/${companyId}/printers/${printer._id}`,
        {
          status: newStatus,
        }
      );

      setPrinters((prevPrinters) =>
        prevPrinters.map((p) =>
          p._id === printer._id ? { ...p, status: newStatus } : p
        )
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

  const onPrintOnThisPrinter = (companyId, printerName) => {
    navigate(`/uploadFile?company_id=${companyId}&printer_name=${printerName}`);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentPrinter(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.put(
        `/companies/${companyId}/printers/${currentPrinter._id}`,
        {
          name: printerName,
          companyId: companyId,
          status,
        }
      );
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
      <Table className="table table-hover">
        <Thead>
          <Tr>
            <Th>{isMobile ? "Printer" : "Printer Name"}</Th>
            <Th>Status</Th>
            <Th>Created at</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {printers.map((printer) => (
            <Tr key={printer._id}>
              <Td>{printer.name}</Td>
              {isMobile ? (
                <Td style={{ marginBottom: "20px" }}>
                  <Form.Check
                    type="switch"
                    id={`status-switch-${printer._id}`}
                    checked={printer.status === "active"}
                    onChange={() => handleChangeStatus(printer)}
                  />
                </Td>
              ) : (
                <Td>
                  <Form.Check
                    type="switch"
                    id={`status-switch-${printer._id}`}
                    checked={printer.status === "active"}
                    onChange={() => handleChangeStatus(printer)}
                  />
                </Td>
              )}

              <Td>
                {printer.created_at
                  ? new Date(printer.created_at).toLocaleDateString()
                  : "N/A"}
              </Td>
              {isMobile ? (
                <Td colSpan="4">
                  <div className="d-flex justify-content-around">
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-edit-${printer._id}`}>
                          Edit Printer
                        </Tooltip>
                      }
                    >
                      <button
                        className="btn btn-icon btn-sm"
                        onClick={() => handleEditClick(printer)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-sanity-check-${printer._id}`}>
                          Sanity Check
                        </Tooltip>
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
                        <Tooltip id={`tooltip-download-qr-${printer._id}`}>
                          Download QR Code
                        </Tooltip>
                      }
                    >
                      <button
                        className="btn btn-icon btn-sm"
                        onClick={() => onDownloadQR(printer._id, printer.name)}
                      >
                        <i className="bi bi-qr-code"></i>
                      </button>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-print-${printer._id}`}>
                          Print on this printer
                        </Tooltip>
                      }
                    >
                      <button
                        className="btn btn-icon btn-sm"
                        onClick={() =>
                          onPrintOnThisPrinter(companyId, printer.name)
                        }
                      >
                        <i className="bi bi-printer"></i>
                      </button>
                    </OverlayTrigger>
                  </div>
                </Td>
              ) : (
                <Td>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-edit-${printer._id}`}>
                        Edit Printer
                      </Tooltip>
                    }
                  >
                    <button
                      className="btn btn-icon btn-sm"
                      onClick={() => handleEditClick(printer)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-sanity-check-${printer._id}`}>
                        Sanity Check
                      </Tooltip>
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
                      <Tooltip id={`tooltip-download-qr-${printer._id}`}>
                        Download QR Code
                      </Tooltip>
                    }
                  >
                    <button
                      className="btn btn-icon btn-sm"
                      onClick={() => onDownloadQR(printer._id, printer.name)}
                    >
                      <i className="bi bi-qr-code"></i>
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-print-${printer._id}`}>
                        Print on this printer
                      </Tooltip>
                    }
                  >
                    <button
                      className="btn btn-icon btn-sm"
                      onClick={() =>
                        onPrintOnThisPrinter(companyId, printer.name)
                      }
                    >
                      <i className="bi bi-printer"></i>
                    </button>
                  </OverlayTrigger>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Edit Printer Modal */}
      {currentPrinter && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Printer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alert && (
              <Alert
                variant={alert.type}
                dismissible
                onClose={() => setAlert(null)}
              >
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
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </Form.Select>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(currentPrinter._id)}
                  >
                    Delete Printer
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Save Changes
                  </button>
                </div>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default PrinterTable;
