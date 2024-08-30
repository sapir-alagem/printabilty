// PrinterIndex.js
import React from 'react';
import PrinterTable from '../components/PrinterTable';
import PrinterGenerateButton from '../components/PrinterGenerateButton';
import { useParams } from 'react-router-dom';
import usePrinters from '../../hooks/usePrinters';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const PrinterIndex = () => {
  const { companyId } = useParams();
  const { printers, loading, error } = usePrinters(companyId);
  const axiosPrivate = useAxiosPrivate();

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/companies/${companyId}/printers/${id}`);
      // Refetch printers after deletion
      const { printers: updatedPrinters } = await usePrinters(companyId);
      setPrinters(updatedPrinters);
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
      // Refetch printers after generation
      const { printers: updatedPrinters } = await usePrinters(companyId);
      setPrinters(updatedPrinters);
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

  const handleChangeStatus = async (printerId, newStatus) => {
    try {
      await axiosPrivate.put(
        `/companies/${companyId}/printers/${printerId}`,
        { status: newStatus }
      );
    } catch (error) {
      throw new Error("Failed to update printer status.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex mb-4">
        <h5 className="mr-auto">Printer Management</h5>
        <PrinterGenerateButton onGenerate={handleGenerate} />
      </div>
      {error && <div>{error}</div>}
      <PrinterTable
        printers={printers}
        onDelete={handleDelete}
        onDownloadQR={handleDownloadQR}
        companyId={companyId}
        onChangeStatus={handleChangeStatus}
      />
    </div>
  );
};

export default PrinterIndex;
