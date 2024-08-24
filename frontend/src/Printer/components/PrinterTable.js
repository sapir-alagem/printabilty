import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import axios from 'axios';


const PrinterTable = ({ printers, onDelete, onDownloadQR, companyId }) => {
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const handleDelete = (printerId) => {
        if (window.confirm("Are you sure you want to delete this printer?")) {
            onDelete(printerId);
        }
    };

    const handleChangeStatus = async (printer) => {
        const newStatus = printer.status === 'active' ? 'suspended' : 'active';
        const confirmChange = window.confirm(`This will change the printer status to ${newStatus}. Are you sure you want to continue?`);
    
        if (confirmChange) {
            try {
                await axios.put(`http://localhost:5000/companies/${companyId}/printers/${printer._id}`, { status: newStatus });
                window.location.reload(); 
                setAlert({ type: 'success', message: 'Printer status updated successfully.' });
            } catch (error) {
                setAlert({ type: 'danger', message: 'Failed to update printer status.' });
            }
        }
    };

    const handleEdit = (companyId, printerId) => {
        console.log("table->handleEdit");
        console.log("companyId: " + companyId);
        console.log("printerId: " + printerId);

        navigate(`/companies/${companyId}/printers/${printerId}/edit`); 
    };

    const sanityCheck = (printerId) => {
    
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
                            <td>{printer.qrCreatedAt ? new Date(printer.qrCreatedAt).toLocaleString() : 'N/A'}</td>
                            <td>
                                <button className='btn btn-icon btn-sm' onClick={() => handleEdit(companyId, printer._id)}>
                                    <i className="bi bi-pencil"></i>
                                </button>

                                <button className='btn btn-icon btn-sm' onClick={() => handleChangeStatus(printer)}>
                                    <i className="bi bi-power"></i>
                                </button>

                                <button className='btn btn-icon btn-sm' onClick={() => sanityCheck(printer._id)}>
                                    <i className="bi bi-clipboard-check"></i>
                                </button>

                                {/* {printer.qrCreatedAt && !printer.qrObsolete && ( */}
                                    <button className="btn btn-icon btn-sm" onClick={() => onDownloadQR(printer._id)}>
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

