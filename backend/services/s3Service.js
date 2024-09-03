const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

exports.s3Uploadv3 = async (files) => {
  console.log(`certs: region: ${process.env.AWS_REGION}`);
  const s3client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const uploadedFiles = [];

  if (!Array.isArray(files)) {
    files = [files];
  }

  for (const file of files) {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${file.originalname}`,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype || "application/octet-stream",
    };

    try {
      await s3client.send(new PutObjectCommand(uploadParams));
      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
      uploadedFiles.push(fileUrl);
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw error;
    }
  }

  return uploadedFiles;
};

