const { ObjectId } = require("mongodb");
const { getClient } = require("../utils/mongo");

async function createPrinter(printerData) {
  const client = await getClient();

  try {
    const db = client.db("printability");
    const col = db.collection("printers");

    // Insert the new printer
    const result = await col.insertOne(printerData);
  } catch (error) {
    console.error("Error updating number of printers:", error);
  }
}

async function getAllPrinters(companyId) {
  const client = await getClient();

  try {
    const db = client.db("printability");
    const col = db.collection("printers");
    const printers = await col.find({ company_id: companyId }).toArray();
    return printers;
  } catch (error) {
    console.error("Error retrieving printers:", error);
    throw error;
  }
}

async function getPrinter(companyId, printerId) {
  const client = await getClient();
  try {
    const db = client.db("printability");
    const col = db.collection("printers");

    let printer = await col.findOne({ _id: new ObjectId(printerId) });

    console.log(printer);
    return printer;
  } catch (error) {
    console.error("Error retrieving printer:", error);
    throw error;
  }
}

async function findPrinterByName(companyId, name) {
  const client = await getClient();
  try {
    const db = client.db("printability");
    const col = db.collection("printers");
    const printer = await col.findOne({
      name: name,
      company_id: companyId,
    });
    return printer;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function deletePrinter(printerId, companyId) {
  const client = await getClient();
  try {
    const db = client.db("printability");
    const col = db.collection("printers");
    const result = await col.deleteOne({
      _id: new ObjectId(printerId),
      company_id: companyId,
    });

    return result.deletedCount;
  } catch (error) {
    console.error("Error deleting printer:", error);
    throw error;
  }
}

async function deletePrinters(companyId) {
  const client = await getClient();
  try {
    const db = client.db("printability");
    const col = db.collection("printers");
    const result = await col.deleteMany({ company_id: companyId });
    return result.deletedCount;
  } catch (error) {
    console.error("Error deleting printers:", error);
    throw error;
  }
}

async function updatePrinter(id, updates) {
  const client = await getClient();

  try {
    const db = client.db("printability");
    const col = db.collection("printers");

    const objectId = new ObjectId(id);

    let document = await col.findOne({ _id: objectId });
    console.log("Document before update:", document);

    // check if the document need to be updated
    if (document.name === updates.name && document.status === updates.status) {
      console.log("No updates needed.");
      return true;
    }

    const result = await col.updateOne({ _id: objectId }, { $set: updates });

    if (result.modifiedCount > 0) {
      console.log("Update successful.");
      return true;
    } else {
      console.log("No documents matched the query. Update not applied.");
      return false;
    }
  } catch (error) {
    console.error("Error updating printer:", error);
    throw error;
  }
}

module.exports = {
  createPrinter,
  getAllPrinters,
  getPrinter,
  findPrinterByName,
  deletePrinter,
  updatePrinter,
  deletePrinters,
};
