import React, { useState, useEffect } from "react";
import PrinterTable from "../components/PrinterTable";
import PrinterGenerateButton from "../components/PrinterGenerateButton";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PrinterIndex = () => {
  const { companyId } = useParams();
  const [printers, setPrinters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    const name = prompt("Enter printer name:");

    try {
      await axiosPrivate.post(`/companies/${companyId}/printers`, {
        name,
        company_id: companyId,
      });
      fetchPrinters();
    } catch (error) {
      setError("Error adding printer");
    }
  };

  const handleDownloadQR = async (printerId) => {
    try {
      const response = await axiosPrivate.get(
        `/companies/${companyId}/printers/${printerId}/qrcode`
      );
      const url = response.data.url;
      const link = document.createElement("a");
      link.href = url;
      link.download = `${printerId}-qr.png`;
      link.click();
    } catch (error) {
      setError("Error downloading QR code");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

    return (
        <div>
            <div className="d-flex mb-4">
                <h4 className='mr-auto'>My Printers</h4>
                <PrinterGenerateButton onGenerate={handleGenerate} />
            </div>
            {error && <div>{error}</div>}
            <PrinterTable 
                printers={printers} 
                onDelete={handleDelete} 
                onDownloadQR={handleDownloadQR} 
                updatePrinterStatus={updatePrinterStatus} 
                companyId={companyId} />
        </div>
    );
};

export default PrinterIndex;
