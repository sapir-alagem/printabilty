const CompanyService = require('../services/company_service');

const createCompany = async (req, res, next) => {
    try {
        const { name } = req.body;
        const companyData = { name };
        const companyId = await CompanyService.createCompany(companyData);
        res.status(201).json({ 
            message: 'Company created successfully',
            companyId,
        });
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ message: 'Could not create company', error: error.message });
    }
};

const getCompany = async (req, res, next) => {
    try {
        const companyId = req.params.id;
        const company = await CompanyService.getCompany(companyId);
        res.status(200).json({ company });
    } catch (error) {
        console.error('Error retrieving company:', error);
        res.status(500).json({ message: 'Could not retrieve company', error: error.message });
    }
};

module.exports = { createCompany, getCompany };
