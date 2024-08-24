const printerService = require('../services/printerService');

const createPrinter = async (req, res) => {
    try {
        const { name, company_id } = req.body;
        const printerData = { name, company_id };
        const printerId = await printerService.createPrinter(printerData);
        res.status(201).json({ _id: printerId, ...printerData });
    } catch (error) {
        res.status(500).json({ message: 'Error creating printer', error });
    }
};

const getAllPrinters = async (req, res) => {
    
    try {
        const company_id = req.params.companyId;
        const printers = await printerService.getAllPrinters(company_id);
        res.status(200).json(printers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching printers', error });
    }
};

const getPrinter = async (req, res) => {
    try {
        const { companyId, printerId } = req.params;
        const printer = await printerService.getPrinter(companyId, printerId);
        if (!printer) {
            res.status(404).json({ message: 'Printer not found' });
        } else {
            res.status(200).json(printer);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving printer', error });
    }
};

const deletePrinter = async (req, res) => {
    try {
        const { companyId, id } = req.params;
        const result = await printerService.deletePrinter(id, companyId);
        if (result === 0) {
            res.status(404).json({ message: 'Printer not found' });
        } else {
            res.status(200).json({ message: 'Printer deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting printer', error });
    }
};

const updatePrinterStatus = async (req, res) => {
    // can remove?????????????????
    try {
        const { id } = req.params;
        const { status } = req.body;
        await printerService.updatePrinterStatus(id, status);
        res.status(200).json({ message: 'Printer status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating printer status', error });
    }
};

const updatePrinter = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const success = await printerService.updatePrinter(id, updates);
        if (!success) {
            return res.status(404).json({ message: 'Printer not found' });
        }
        res.status(200).json({ message: 'Printer updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating printer', error });
    }
};


module.exports = {
    createPrinter,
    getAllPrinters,
    getPrinter,
    deletePrinter,
    updatePrinterStatus,
    updatePrinter,

};