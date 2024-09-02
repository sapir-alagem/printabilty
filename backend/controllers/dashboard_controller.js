const DashboardService = require("../services/dashboard_service");

const getCompanyEarningsByDayController = async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const earnings = await DashboardService.getCompanyEarningsByDay(companyId);
    res.json(earnings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCompanyEarningsByWeekController = async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const earnings = await DashboardService.getCompanyEarningsByWeek(companyId);
    res.json(earnings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCompanyEarningsByMonthController = async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const earnings = await DashboardService.getCompanyEarningsByMonth(
      companyId
    );
    res.json(earnings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCompanyEarningsByDayController,
  getCompanyEarningsByWeekController,
  getCompanyEarningsByMonthController,
};
