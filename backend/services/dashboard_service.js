const { ObjectId } = require("mongodb");
const { getClient } = require("../utils/mongo");

const getCompanyEarningsByDay = async (companyId) => {
  const client = await getClient();
  try {
    const db = client.db("printability");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await db
      .collection("print_jobs")
      .aggregate([
        {
          $match: {
            companyId: companyId,
            created_at: { $gte: today },
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            totalEarnings: { $sum: { $toDouble: "$price" } },
          },
        },
      ])
      .toArray();

    return result[0] || { totalEarnings: 0 };
  } catch (error) {
    throw new Error("Failed to calculate daily earnings");
  }
};

const getCompanyEarningsByWeek = async (companyId) => {
  const client = await getClient();
  try {
    const db = client.db("printability");
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    lastWeek.setHours(0, 0, 0, 0);

    const result = await db
      .collection("print_jobs")
      .aggregate([
        {
          $match: {
            companyId: companyId,
            created_at: { $gte: lastWeek },
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            totalEarnings: { $sum: { $toDouble: "$price" } },
          },
        },
      ])
      .toArray();

    return result[0] || { totalEarnings: 0 };
  } catch (error) {
    throw new Error("Failed to calculate weekly earnings");
  }
};

const getCompanyEarningsByMonth = async (companyId) => {
  const client = await getClient();
  try {
    const db = client.db("printability");
    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 30);
    lastMonth.setHours(0, 0, 0, 0);

    const result = await db
      .collection("print_jobs")
      .aggregate([
        {
          $match: {
            companyId: companyId,
            created_at: { $gte: lastMonth },
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            totalEarnings: { $sum: { $toDouble: "$price" } },
          },
        },
      ])
      .toArray();

    return result[0] || { totalEarnings: 0 };
  } catch (error) {
    throw new Error("Failed to calculate monthly earnings");
  }
};

module.exports = {
  getCompanyEarningsByDay,
  getCompanyEarningsByWeek,
  getCompanyEarningsByMonth,
};
