const CompanyService = require("../services/company_service");
const PrinterService = require("../services/printerService");
const UserService = require("../services/users_service");

const createCompany = async (req, res, next) => {
  try {
    const companyData = req.body;
    const companyId = await CompanyService.createCompany(companyData);

    res.status(201).json({
      message: "Company created successfully",
      companyId,
    });

  } catch (error) {
    console.error("Error creating company:", error);

    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: "Could not create company", error: error.message });
    } else {
    }
  }
};

const getCompany = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const company = await CompanyService.getCompany(companyId);
    res.status(200).json({ company });
  } catch (error) {
    console.error("Error retrieving company:", error);
    res
      .status(500)
      .json({ message: "Could not retrieve company", error: error.message });
  }
};

const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await CompanyService.getAllCompanies();
    res.status(200).json({ companies });
  } catch (error) {
    console.error("Error retrieving companies:", error);
    res
      .status(500)
      .json({ message: "Could not retrieve companies", error: error.message });
  }
};

const getCompanyCurrency = async (req, res, next) => {
  try {
    const companyId = req.body.companyId;
    const currency = await CompanyService.getCompanyCurrency(companyId);
    res.status(200).json({ currency });
  } catch (error) {
    console.error("Error retrieving company currency:", error);
    res.status(500).json({
      message: "Could not retrieve company currency",
      error: error.message,
    });
  }
};

const updateCompany = async (req, res, next) => {
  try {
    const details = req.body;
    const result = await CompanyService.updateCompany(details);
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error updating company:", error);
    res
      .status(500)
      .json({ message: "Could not update company", error: error.message });
  }
};

const deleteCompany = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const deletePrinters = await PrinterService.deletePrinters(companyId);
    const deleteUsers = await UserService.deleteUsers(companyId);
    const deleteCompany = await CompanyService.deleteCompany(companyId);
    const companies = await CompanyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error deleting company:", error);
    res
      .status(500)
      .json({ message: "Could not delete company", error: error.message });
  }
};

const countPrinters = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const printers = await CompanyService.countCompanyPrinters(companyId);
    res.status(200).json({ printers });
  } catch (error) {
    console.error("Error counting printers:", error);
    res
      .status(500)
      .json({ message: "Could not count printers", error: error.message });
  }
};

module.exports = {
  createCompany,
  getCompany,
  getAllCompanies,
  getCompanyCurrency,
  updateCompany,
  deleteCompany,
  countPrinters,
};
