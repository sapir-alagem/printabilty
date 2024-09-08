import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import QRCodeTable from "../../QRCode/components/QRCodeTable";
import config from "../../config.js";
import Loader from "../../shared/components/Loader.js";

const PrinterForm = () => {
  const { companyId, printerId } = useParams();
  const [printer, setPrinter] = useState({ name: "", status: "active" });
  const [qrCodes, setQRCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrinter = async () => {
      try {
        const printerRes = await axios.get(
          `${config.backUrl}/companies/${companyId}/printers/${printerId}`
        );
        setPrinter(printerRes.data);
      } catch (err) {
        setError("Error fetching printer details");
      } finally {
        setLoading(false);
      }
    };
    fetchPrinter();
  }, [companyId, printerId]);

  const handleChange = (e) => {
    setPrinter({ ...printer, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this printer?")) {
      try {
        await axios.delete(
          `${config.backUrl}/companies/${companyId}/printers/${printerId}`
        );
        navigate(`/companies/${companyId}/dashboard`);
      } catch (err) {
        setError("Error deleting printer");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${config.backUrl}/companies/${companyId}/printers/${printerId}`,
        printer
      );
      navigate(`/companies/${companyId}/dashboard`);
    } catch (err) {
      setError("Error saving printer details");
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1 className="mb-5">Edit Printer</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Printer Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control bg-white"
              id="name"
              name="name"
              value={printer.name}
              onChange={handleChange}
              required
              style={{ minWidth: "100%", width: "100%", maxWidth: "30px" }}
            />
          </div>
        </div>
        <div className="mb-3 mb-5 form-group row">
          <label htmlFor="status" className="col-sm-2 col-form-label">
            Status
          </label>
          <div className="col-sm-10">
            <select
              className="form-select"
              id="status"
              name="status"
              value={printer.status}
              onChange={handleChange}
              required
              style={{ minWidth: "100%", width: "100%", maxWidth: "30px" }}
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
        <button
          type="button"
          className="btn btn-danger ms-3"
          onClick={handleDelete}
        >
          Delete Printer
        </button>
      </form>

      <div className="mt-5">
        <h2>QR Codes</h2>
        <QRCodeTable qrCodes={qrCodes} />
      </div>
    </div>
  );
};

export default PrinterForm;
