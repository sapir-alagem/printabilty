import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PrinterTable = ({
  initialPrinters,
  onDelete,
  onDownloadQR,
  companyId,
}) => {
  const [alert, setAlert] = useState(null);
  const [printers, setPrinters] = useState(initialPrinters || []);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!initialPrinters) {
      // Function to fetch printers from the server if not provided as props
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

  const handleDelete = (printerId) => {
    if (window.confirm("Are you sure you want to delete this printer?")) {
      onDelete(printerId);
    }
  };

  const sanityCheck = (printerId) => {};

  const handleChangeStatus = async (printer) => {
    const newStatus = printer.status === "active" ? "suspended" : "active";
    const confirmChange = window.confirm(
      `This will change the printer status to ${newStatus}. Are you sure you want to continue?`
    );

    if (confirmChange) {
      try {
        await axiosPrivate.put(
          `/companies/${companyId}/printers/${printer._id}`,
          { status: newStatus }
        );

        setPrinters((prevPrinters) =>
          prevPrinters.map((p) =>
            p._id === printer._id ? { ...p, status: newStatus } : p
          )
        );

        setAlert({
          type: "success",
          message: "Printer status updated successfully.",
        });
      } catch (error) {
        setAlert({
          type: "danger",
          message: "Failed to update printer status.",
        });
      }
    }
  };

  const handleEdit = (companyId, printerId) => {
    navigate(`/companies/${companyId}/printers/${printerId}/edit`);
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
            <th>QR Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {printers.map((printer) => (
            <tr key={printer._id}>
              <td>{printer.name}</td>
              <td>{printer.status}</td>
              <td>
                {printer.qrCreatedAt
                  ? new Date(printer.qrCreatedAt).toLocaleString()
                  : "N/A"}
              </td>
              <td>
                <button
                  className="btn btn-icon btn-sm"
                  onClick={() => handleEdit(companyId, printer._id)}
                >
                  <i className="bi bi-pencil"></i>
                </button>

                <button
                  className="btn btn-icon btn-sm"
                  onClick={() => handleChangeStatus(printer)}
                >
                  <i className="bi bi-power"></i>
                </button>

                <button
                  className="btn btn-icon btn-sm"
                  onClick={() => sanityCheck(printer._id)}
                >
                  <i className="bi bi-clipboard-check"></i>
                </button>

                {/* {printer.qrCreatedAt && !printer.qrObsolete && ( */}
                <button
                  className="btn btn-icon btn-sm"
                  onClick={() => onDownloadQR(printer._id)}
                >
                  <i className="bi bi-qr-code"></i>
                </button>
                {/* )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrinterTable;
