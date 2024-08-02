const { getClient } = require('../utils/mongo');

async function createQrCode(qrCodeData) {
  const client = getClient();
  try {
    await client.connect();
    const db = client.db('printability');
    const col = db.collection('qrcodes');
    const result = await col.insertOne(qrCodeData);
    return result.insertedId;
  } catch (error) {
    console.error('Error creating QR code:', error);
    throw error;
  } finally {
    await client.close();
  }
}

async function getAllActiveQrCodes(company_id) {
  const client = getClient();
  try {
    await client.connect();
    const db = client.db('printability');
    const col = db.collection('qrcodes');
    const qrCodes = await col.find({ company_id, obsolete: false }).toArray();
    return qrCodes;
  } catch (error) {
    console.error('Error retrieving active QR codes:', error);
    throw error;
  } finally {
    await client.close();
  }
}

async function obsoleteQrCode(qrCodeId, company_id) {
  const client = getClient();
  try {
    await client.connect();
    const db = client.db('printability');
    const col = db.collection('qrcodes');
    const result = await col.updateOne(
      { _id: qrCodeId, company_id },
      { $set: { obsolete: true } }
    );
    return result;
  } catch (error) {
    console.error('Error obsoleting QR code:', error);
    throw error;
  } finally {
    await client.close();
  }
}

async function scanQrCode(qrCodeId, user) {
  const client = getClient();
  try {
    await client.connect();
    const db = client.db('printability');
    const col = db.collection('qrcodes');
    const result = await col.updateOne(
      { _id: qrCodeId },
      { $set: { scannedBy: user } }
    );
    return result;
  } catch (error) {
    console.error('Error scanning QR code:', error);
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = {
  createQrCode,
  getAllActiveQrCodes,
  obsoleteQrCode,
  scanQrCode
};


// const { getClient } = require('../utils/mongo'); 

// async function createQrCode(qrCodeData) {
//     const client = getClient();

//     try {
//         await client.connect();
//         const db = client.db('printability');
//         const col = db.collection('qrcodes');
//         const result = await col.insertOne(qrCodeData);
//         return result.insertedId;
//     } catch (error) {
//         console.error('Error creating QR code:', error);
//         throw error;
//     } finally {
//         await client.close();
//     }
// }

// async function getQrCode(qrCodeId) {
//     const client = getClient();

//     try {
//         await client.connect();
//         const db = client.db('printability');
//         const col = db.collection('qrcodes');
//         const qrCode = await col.findOne({ _id: qrCodeId });
//         return qrCode;
//     } catch (error) {
//         console.error('Error retrieving QR code:', error);
//         throw error;
//     } finally {
//         await client.close();
//     }
// }

// async function getAllActiveQrCodes() {
//     const client = getClient();

//     try {
//         await client.connect();
//         const db = client.db('printability');
//         const col = db.collection('qrcodes');
//         const qrCodes = await col.find({ obsolete: false }).toArray();
//         return qrCodes;
//     } catch (error) {
//         console.error('Error retrieving active QR codes:', error);
//         throw error;
//     } finally {
//         await client.close();
//     }
// }

// async function obsoleteQrCode(qrCodeId) {
//     const client = getClient();

//     try {
//         await client.connect();
//         const db = client.db('printability');
//         const col = db.collection('qrcodes');
//         const result = await col.updateOne(
//             { _id: qrCodeId },
//             { $set: { obsolete: true } }
//         );
//         return result.modifiedCount;
//     } catch (error) {
//         console.error('Error obsoleting QR code:', error);
//         throw error;
//     } finally {
//         await client.close();
//     }
// }

// module.exports = {
//     createQrCode,
//     getQrCode,
//     getAllActiveQrCodes,
//     obsoleteQrCode
// };
