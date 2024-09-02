// services/earningsService.js

const { ObjectId } = require("mongodb");
const { getClient } = require("../utils/mongo");

const getCompanyEarningsByDay = async (companyId) => {
  const client = await getClient();
  try {
    const db = client.db("printability");
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the day

    const result = await db
      .collection("print_jobs")
      .aggregate([
        {
          $match: {
            companyId: companyId,
            created_at: { $gte: today }, // Filter for today's date
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
    lastWeek.setDate(lastWeek.getDate() - 7); // Set to 7 days ago
    lastWeek.setHours(0, 0, 0, 0);

    const result = await db
      .collection("print_jobs")
      .aggregate([
        {
          $match: {
            companyId: companyId,
            created_at: { $gte: lastWeek }, // Filter for the past 7 days
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
    lastMonth.setDate(lastMonth.getDate() - 30); // Set to 30 days ago
    lastMonth.setHours(0, 0, 0, 0);

    const result = await db
      .collection("print_jobs")
      .aggregate([
        {
          $match: {
            companyId: companyId,
            created_at: { $gte: lastMonth }, // Filter for the past 30 days
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
