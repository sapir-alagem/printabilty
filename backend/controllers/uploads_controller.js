const { s3Uploadv3 } = require("../services/s3Service");

async function uploadFiles(req, res) {
  console.log("got it");
  try {
    const results = await s3Uploadv3(req.files);
    console.log(results);
    const responseData = { message: 'Data received successfully!', file_url: results};
    res.json(responseData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  uploadFiles,
};
