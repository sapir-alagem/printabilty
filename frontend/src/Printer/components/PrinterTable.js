import React from 'react';
import Table from 'react-bootstrap/Table';

const PrinterTable = ({ printers, onDelete }) => {
    if (printers.length === 0) {
        return <div>No printers found.</div>;
    }

    return (
        <div className="m-4">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Printer Name</th>
                        <th>Company ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {printers.map(printer => (
                        <tr key={printer._id}>
                            <td>{printer.name}</td>
                            <td>{printer.company_id}</td>
                            <td>
                                <button onClick={() => onDelete(printer._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PrinterTable;
