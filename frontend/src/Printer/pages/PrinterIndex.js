import React, { useState, useEffect } from "react";
import axios from "axios";
import PrinterTable from "../components/PrinterTable";
import PrinterGenerateButton from "../components/PrinterGenerateButton";
import { useParams } from "react-router-dom";

const PrinterIndex = () => {
  const { companyId } = useParams();
  const [printers, setPrinters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrinters();
  }, [companyId]);

  const fetchPrinters = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/companies/${companyId}/printers`
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
      await axios.delete(
        `http://localhost:5000/companies/${companyId}/printers/${id}`
      );
      fetchPrinters();
    } catch (error) {
      setError("Error deleting printer");
    }
  };

  const handleGenerate = async () => {
    const name = prompt("Enter printer name:");

    try {
      await axios.post(
        `http://localhost:5000/companies/${companyId}/printers`,
        { name, company_id: companyId }
      );
      fetchPrinters();
    } catch (error) {
      setError("Error adding printer");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Printer Management</h1>
      <PrinterGenerateButton onGenerate={handleGenerate} />
      {error && <div>{error}</div>}
      <PrinterTable printers={printers} onDelete={handleDelete} />
    </div>
  );
};

export default PrinterIndex;
