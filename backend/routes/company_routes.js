const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company_controller");
const verifyJWT = require("../middleWare/verifyJWT");

router.post("/", companyController.createCompany);
router.get("/:id", verifyJWT, companyController.getCompany);
router.delete("/:id", verifyJWT, companyController.deleteCompany);
router.get("/", verifyJWT, companyController.getAllCompanies);
router.get("/:id/countPrinters", companyController.countPrinters);
router.post("/currency", companyController.getCompanyCurrency);
router.post(
  "/currencyAbbreviation",
  companyController.getCompanyCurrencyAbbreviation
);
router.post("/update", companyController.updateCompany);

module.exports = router;
