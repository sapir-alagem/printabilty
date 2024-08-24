const { s3Uploadv3 } = require("../services/s3Service");

async function uploadFiles(req, res) {
  console.log("function uploadFiles");
  try {
    const results = await s3Uploadv3(req.files);
    console.log(results);
    const fileUrl = results[0];
    const responseData = {
      message: "Data received successfully!",
      file_url: fileUrl,
    };
    res.json(responseData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  uploadFiles,
};
