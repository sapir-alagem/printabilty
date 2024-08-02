import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCodeTable from '../components/QRCodeTable';
import QRCodeGenerateButton from '../components/QRCodeGenerateButton';

const QRCodeIndex = () => {
    const [qrCodes, setQrCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchQRCodes();
    }, []);

    const fetchQRCodes = async () => {
        try {
            const response = await axios.get('/qrcodes');
            setQrCodes(response.data);
        } catch (error) {
            setError('Error fetching QR codes');
            setQrCodes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleObsolete = async (id) => {
        try {
            await axios.post(`/qrcodes/obsolete/${id}`);
            fetchQRCodes();
        } catch (error) {
            setError('Error obsoleting QR code');
        }
    };

    const handleGenerate = async () => {
        const value = prompt("Enter QR code value:");
        const printer_id = prompt("Enter printer ID:");
        const company_id = prompt("Enter company ID:");

        try {
            await axios.post('/qrcodes/generate', { value, printer_id, company_id });
            fetchQRCodes();
        } catch (error) {
            setError('Error generating QR code');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (error) {
    //     return <div>{error}</div>;
    // }

    return (
        <div>
            <h1>QR Code Management</h1>
            <QRCodeGenerateButton onGenerate={handleGenerate} />
            {error && <div>{error}</div>}
            <QRCodeTable qrCodes={qrCodes} onObsolete={handleObsolete} />
        </div>
    );
};

export default QRCodeIndex;
