const { s3Uploadv3 } = require("../services/s3Service");

async function uploadFiles(req, res) {
  try {
    const results = await s3Uploadv3(req.files);
    console.log(results);
    return res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  uploadFiles,
};
