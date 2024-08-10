const CompanyService = require('../services/company_service');

const createCompany = async (req, res, next) => {
    try {
        const companyData = req.body;
        const companyId = await CompanyService.createCompany(companyData);
        
        res.status(201).json({ 
            message: 'Company created successfully',
            companyId
        });

        // console.log(response.data); // Incorrect, should be `console.log(res.data);` but `res` does not have `data`
    } catch (error) {
        console.error('Error creating company:', error);
        
        // Handle errors
        if (!res.headersSent) {
            res.status(500).json({ message: 'Could not create company', error: error.message });
        } else {
            next(error); // If headers are already sent, pass the error to the default error handler
        }
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

const getAllCompanies = async (req, res, next) => {
    try {
        const companies = await CompanyService.getAllCompanies();
        res.status(200).json({ companies });
    } catch (error) {
        console.error('Error retrieving companies:', error);
        res.status(500).json({ message: 'Could not retrieve companies', error: error.message });
    }
}

module.exports = { createCompany, getCompany, getAllCompanies };
