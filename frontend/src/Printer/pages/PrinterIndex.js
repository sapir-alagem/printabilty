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
            const response = await axios.get(`http://localhost:5000/companies/${companyId}/printers`);
            setPrinters(response.data);
        } catch (error) {
            setError('Error fetching printers');
            setPrinters([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/companies/${companyId}/printers/${id}`);
            fetchPrinters();
        } catch (error) {
            setError('Error deleting printer');
        }
    };

    const handleGenerate = async () => {
        const name = prompt("Enter printer name:");

        try {
            await axios.post(`http://localhost:5000/companies/${companyId}/printers`, { name, company_id: companyId });
            fetchPrinters();
        } catch (error) {
            setError('Error adding printer');
        }
    };


    const handleDownloadQR = async (printerId) => {
        try {
          const response = await axios.get(`http://localhost:5000/companies/${companyId}/printers/${printerId}/qrcode`);
          const url = response.data.url;
          const link = document.createElement('a');
          link.href = url;
          link.download = `${printerId}-qr.png`;
          link.click();
        } catch (error) {
          setError('Error downloading QR code');
        }
      };
   

    if (loading) {
        return <div>Loading...</div>;
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
            <div className="d-flex mb-4">
                <h5 className='mr-auto'>Printer Management</h5>
                <PrinterGenerateButton onGenerate={handleGenerate} />
            </div>
            {error && <div>{error}</div>}
            <PrinterTable 
                printers={printers} 
                onDelete={handleDelete} 
                onDownloadQR={handleDownloadQR} 
                companyId={companyId} />
        </div>
    );

};

export default PrinterIndex;
