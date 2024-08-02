import React from 'react';
import Table from 'react-bootstrap/Table';
import QRCode from 'qrcode.react';

const QRCodeTable = ({ qrCodes, onObsolete }) => {
    if (qrCodes.length === 0) {
        return <div>No QR codes found.</div>;
    }

    return (
        <div className="m-4">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>QR Code</th>
                        <th>Company ID</th>
                        <th>Printer ID</th>
                        <th>Obsolete</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {qrCodes.map(qrCode => (
                        <tr key={qrCode._id}>
                            <td>
                                <QRCode value={qrCode.value} size={64} />
                            </td>
                            <td>{qrCode.company_id}</td>
                            <td>{qrCode.printer_id}</td>
                            <td>{qrCode.obsolete ? 'Yes' : 'No'}</td>
                            <td>{new Date(qrCode.createdAt).toLocaleString()}</td>
                            <td>
                                <button onClick={() => onObsolete(qrCode._id)}>Obsolete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default QRCodeTable;
