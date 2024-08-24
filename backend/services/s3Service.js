const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

exports.s3Uploadv3 = async (files) => {
  const s3client = new S3Client();
  const uploadedFiles = [];

  for (const file of files) {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${file.originalname}`,
      Body: file.buffer,
      ACL: "public-read",
    };

    try {
      await s3client.send(new PutObjectCommand(uploadParams));
      // Constructing the URL
      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${uploadParams.Key}`;
      uploadedFiles.push(fileUrl);
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw error; // Rethrow the error to handle it in the controller
    }
  }

  return uploadedFiles;
};
