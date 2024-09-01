import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert, Form } from 'react-bootstrap';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import currencyCodes from 'currency-codes';

const EditCompanyModal = ({ show, handleClose, companyId }) => {
const [company, setCompany] = useState({
    name: '',
    blackAndWhitePageCost: '',
    coloredPageCost: '',
    paymentsCurrency: '',
});
const [currencyList, setCurrencyList] = useState([]);
const axiosPrivate = useAxiosPrivate();
const [alert, setAlert] = useState(null);

useEffect(() => {
    if (companyId) {
        axiosPrivate.get(`/companies/${companyId}`)
            .then(response => setCompany(response.data.company))
            .catch(error => console.error('Error fetching company details:', error));
    }
}, [companyId, axiosPrivate]);

useEffect(() => {
    const codes = currencyCodes.codes();
    const currencyData = codes.map(code => ({
        code,
        name: currencyCodes.code(code)[1]
    }));
    setCurrencyList(currencyData);
}, []);

const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axiosPrivate.post(`/companies/update`, {
            companyId: companyId,
            name: company.name,
            blackAndWhitePageCost: company.blackAndWhitePageCost,
            coloredPageCost: company.coloredPageCost,
            paymentsCurrency: company.paymentsCurrency
        });
        setAlert({
            type: "success",
            message: "Company updated successfully.",
        });
        handleClose();
    } catch (error) {
        setAlert({
            type: "danger",
            message: `Failed to update company: ${error.response?.data?.message || 'An error occurred'}`,
        });
    }
};

return (
    <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
            <Modal.Title>Edit Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {alert && (
                <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
                    {alert.message}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCompanyName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter company name" name="name" value={company.name}
                        onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formBlackAndWhitePageCost" className="mb-3">
                    <Form.Label>Black and White Page Cost</Form.Label>
                    <Form.Control type="number" step="0.01" placeholder="Enter cost" name="blackAndWhitePageCost"
                        value={company.blackAndWhitePageCost} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formColoredPageCost" className="mb-3">
                    <Form.Label>Colored Page Cost</Form.Label>
                    <Form.Control type="number" step="0.01" placeholder="Enter cost" name="coloredPageCost"
                        value={company.coloredPageCost} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formPaymentsCurrency" className="mb-3">
                    <Form.Label>Payments Currency</Form.Label>
                    <Form.Control as="select" name="paymentsCurrency" value={company.paymentsCurrency} onChange={handleChange} required>
                        {currencyList.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.code} - {currency.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
);
};

export default EditCompanyModal;