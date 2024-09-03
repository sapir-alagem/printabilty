const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/dashboard_controller");

router.get(
  "/company-earnings/day/:companyId",
  DashboardController.getCompanyEarningsByDayController
);
router.get(
  "/company-earnings/week/:companyId",
  DashboardController.getCompanyEarningsByWeekController
);
router.get(
  "/company-earnings/month/:companyId",
  DashboardController.getCompanyEarningsByMonthController
);

module.exports = router;
