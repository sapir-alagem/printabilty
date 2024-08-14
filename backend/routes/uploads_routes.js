const express = require("express");
const multer = require("multer");
const uploadController = require("../controllers/uploads_controller");
require("dotenv").config();

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1000000000, files: 2 },
});

router.post("/", upload.array("file"), uploadController.uploadFiles);

module.exports = router;
