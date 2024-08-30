// PrinterTable.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const PrinterTable = ({
  printers,
  onDelete,
  onDownloadQR,
  companyId,
  onChangeStatus
}) => {
  const [alert, setAlert] = React.useState(null);
  const navigate = useNavigate();

  const handleDelete = (printerId) => {
    if (window.confirm("Are you sure you want to delete this printer?")) {
      onDelete(printerId);
    }
  };

  const handleChangeStatus = async (printer) => {
    const newStatus = printer.status === "active" ? "suspended" : "active";
    const confirmChange = window.confirm(
      `This will change the printer status to ${newStatus}. Are you sure you want to continue?`
    );

    if (confirmChange) {
      try {
        await onChangeStatus(printer._id, newStatus); // Call function passed as prop

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
              <td>{printer.qrCodes.length > 0 ? new Date(printer.qrCodes[0].createdAt).toLocaleString() : 'N/A'}</td>
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
                  onClick={() => handleDelete(printer._id)}
                >
                  <i className="bi bi-clipboard-check"></i>
                </button>

                <button
                  className="btn btn-icon btn-sm"
                  onClick={() => onDownloadQR(printer._id)}
                >
                  <i className="bi bi-qr-code"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrinterTable;
