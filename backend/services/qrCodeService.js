const { getClient } = require("../utils/mongo");

async function createQrCode(qrCodeData) {
  const client = await getClient();
  try {
    const db = client.db("printability");
    const col = db.collection("qrcodes");
    const result = await col.insertOne(qrCodeData);
    return result.insertedId;
  } catch (error) {
    console.error("Error creating QR code:", error);
    throw error;
  }
}

async function getAllActiveQrCodes(company_id) {
  const client = await getClient();
  try {
    const db = client.db("printability");
    const col = db.collection("qrcodes");
    const qrCodes = await col.find({ company_id, obsolete: false }).toArray();
    return qrCodes;
  } catch (error) {
    console.error("Error retrieving active QR codes:", error);
    throw error;
  }
}

async function obsoleteQrCode(qrCodeId, company_id) {
  const client = await getClient();
  try {
    const db = client.db("printability");
    const col = db.collection("qrcodes");
    const result = await col.updateOne({ _id: qrCodeId, company_id }, { $set: { obsolete: true } });
    return result;
  } catch (error) {
    console.error("Error obsoleting QR code:", error);
    throw error;
  }
}

async function scanQrCode(qrCodeId, user) {
  const client = await getClient();
  try {
    const db = client.db("printability");
    const col = db.collection("qrcodes");
    const result = await col.updateOne({ _id: qrCodeId }, { $set: { scannedBy: user } });
    return result;
  } catch (error) {
    console.error("Error scanning QR code:", error);
    throw error;
  }
}

async function getPrinterQrCode(companyId, printerName) {
  const client = await getClient();
  try {
    const db = client.db("printability");
    const col = db.collection("qrcodes");
    const qrCode = await col.findOne({ company_id: companyId, printer_name: printerName });
    if (!qrCode) {
      return null;
    }
    return qrCode;
  } catch (error) {
    console.error("Error retrieving printer QR code:", error);
    throw error;
  }
}

module.exports = {
  createQrCode,
  getAllActiveQrCodes,
  obsoleteQrCode,
  scanQrCode,
  getPrinterQrCode,
};
