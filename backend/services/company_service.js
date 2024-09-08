const { getClient } = require("../utils/mongo");
const { ObjectId } = require("mongodb");
const paymentsCurrencysMap = require("../config/currencies");

async function createCompany(companyData) {
  const client = await getClient();

  try {
    const db = client.db("printability");
    const col = db.collection("companies");
    const company = await col.findOne({ name: companyData.name });
    if (company) {
      throw new Error("Company already exists");
    }

    const email = await col.findOne({ email: companyData.email });
    if (email) {
      throw new Error("Email already used)");
    }
    companyData.created_at = new Date();
    const result = await col.insertOne(companyData);
    return result.insertedId;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
}

async function getCompany(companyId) {
  const client = await getClient();

  try {
    const db = client.db("printability");
    const col = db.collection("companies");
    const company = await col.findOne({ _id: new ObjectId(companyId) });
    return company;
  } catch (error) {
    console.error("Error retrieving company:", error);
    throw error;
  }
}

async function getAllCompanies() {
  const client = await getClient();

  try {
    const db = client.db("printability");
    const col = db.collection("companies");
    const companies = await col.find().toArray();
    return companies;
  } catch (error) {
    console.error("Error retrieving companies:", error);
    throw error;
  }
}

async function getCompanyCurrency(companyId) {
  const client = await getClient();

  try {
    const db = client.db("printability");
    const col = db.collection("companies");
    const company = await col.findOne({ _id: new ObjectId(companyId) });
    const symbol = paymentsCurrencysMap.find(
      (item) => item.abbreviation === company.paymentsCurrency
    ).symbol;

    return symbol;
  } catch (error) {
    console.error("Error retrieving company currency:", error);
    throw error;
  }
}

async function getCompanyCurrencyAbbreviation(companyId) {
  const client = await getClient();

  try {
    const db = client.db("printability");
    const col = db.collection("companies");
    const company = await col.findOne({ _id: new ObjectId(companyId) });
    return company.paymentsCurrency;
  } catch (error) {
    console.error("Error retrieving company currency abbreviation:", error);
    throw error;
  }
}

async function updateCompany(details) {
  const client = await getClient();

  try {
    const db = client.db("printability");
    const col = db.collection("companies");
    const result = await col.updateOne(
      { _id: new ObjectId(details.companyId) },
      { $set: details }
    );
    return result.modifiedCount;
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
}

async function deleteCompany(companyId) {
  const client = await getClient();

  try {
    const db = client.db("printability");
    const col = db.collection("companies");
    const result = await col.deleteOne({ _id: new ObjectId(companyId) });
    return result.deletedCount;
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
}

async function countCompanyPrinters(companyId) {
  const client = await getClient();

  try {
    const db = client.db("printability");
    const col = db.collection("printers");
    const count = await col.countDocuments({ company_id: companyId });
    return count;
  } catch (error) {
    console.error("Error counting printers:", error);
    throw error;
  }
}

module.exports = {
  createCompany,
  getCompany,
  getAllCompanies,
  getCompanyCurrency,
  updateCompany,
  deleteCompany,
  countCompanyPrinters,
  getCompanyCurrencyAbbreviation,
};
