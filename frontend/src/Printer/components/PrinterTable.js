import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusModal from './StatusModal';


const PrinterTable = ({ printers, onDelete, onDownloadQR, updatePrinterStatus, companyId }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedPrinter, setSelectedPrinter] = useState(null);
    const navigate = useNavigate();

    const handleDelete = (printerId) => {
        if (window.confirm("Are you sure you want to delete this printer?")) {
            onDelete(printerId);
        }
    };

    const handleShowModal = (printer) => {
        setSelectedPrinter(printer);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPrinter(null);
    };

    const handleEdit = (printerId) => {
        console.log("table->handleEdit");
        console.log('CompanyId:', companyId); // Debugging
        console.log('PrinterId:', printerId); // Debugging
    
        navigate(`/companies/${companyId}/printers/${printerId}/edit`); 
    };

    if (printers.length === 0) {
        return <div>No printers found.</div>;
    }

    return (
        <div className="m-4">
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Printer Name</th>
                        <th>Status</th>
                        <th>QR Created at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {printers.map(printer => (
                        <tr key={printer._id}>
                            <td>{printer.name}</td>
                            <td>{printer.status}</td>
                            <td>{printer.qrCreatedAt}</td>
                            <td>
                                {/* {printer.qrCreatedAt && !printer.qrObsolete && ( */}
                                    <button className="btn btn-icon btn-sm" onClick={() => onDownloadQR(printer._id)}>
                                        <i className="bi bi-qr-code"></i>
                                    </button>
                                {/* )} */}
                                <button className='btn btn-icon btn-sm' onClick={() => handleEdit(companyId, printer._id)}>
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button className='btn btn-icon btn-sm' onClick={() => handleDelete(printer._id)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedPrinter && (
                <StatusModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    printer={selectedPrinter}
                    updatePrinterStatus={updatePrinterStatus}
                />
            )}

        </div>
    );
};

export default PrinterTable;

