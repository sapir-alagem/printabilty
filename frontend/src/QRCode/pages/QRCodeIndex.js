import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCodeTable from '../components/QRCodeTable';
import QRCodeGenerateButton from '../components/QRCodeGenerateButton';
import { useParams } from 'react-router-dom';

const QRCodeIndex = () => {
    const { companyId } = useParams();
    const [qrCodes, setQrCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchQRCodes();
    }, [companyId]);

    const fetchQRCodes = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/companies/${companyId}/qrcodes`);
            console.log('Response data:', response.data); 
            // setQrCodes(response.data);
            if (Array.isArray(response.data)) {
                setQrCodes(response.data);
            } else {
                setError('Expected an array but received something else');
                setQrCodes([]);
            }
        } catch (error) {
            setError('Error fetching QR codes');
            setQrCodes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleObsolete = async (id) => {
        try {
            await axios.post(`http://localhost:5000/companies/${companyId}/qrcodes/obsolete/${id}`);
            fetchQRCodes();
        } catch (error) {
            setError('Error obsoleting QR code');
        }
    };

    const handleGenerate = async () => {
        const printer_name = prompt("Enter printer name:");

        try {
            await axios.post(`http://localhost:5000/companies/${companyId}/qrcodes/generate`, { printer_name });
            fetchQRCodes();
        } catch (error) {
            setError('Error generating QR code');
        }
    };
    // const handleGenerate = async () => {
    //     const value = prompt("Enter QR code value:");
    //     const printer_id = prompt("Enter printer ID:");
    //     const company_id = prompt("Enter company ID:");

    //     try {
    //         await axios.post('/qrcodes/generate', { value, printer_id, company_id });
    //         fetchQRCodes();
    //     } catch (error) {
    //         setError('Error generating QR code');
    //     }
    // };

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
