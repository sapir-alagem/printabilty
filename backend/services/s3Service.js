const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

exports.s3Uploadv3 = async (files) => {
  console.log(
    `certs: access key id: ${process.env.AWS_ACCESS_KEY_ID} ....... secrt: ${process.env.AWS_SECRET_ACCESS_KEY}`
  );
  const s3client = new S3Client({
    region: process.env.AWS_REGION || "us-east-1",
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
      ContentType: file.mimetype || "application/octet-stream", // Specify content type
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

// exports.s3Uploadv3 = async (files) => {
//   const s3client = new S3Client({ region: process.env.AWS_REGION });
//   const uploadedFiles = [];

//   //handel single file upload
//   if (!Array.isArray(files)) {
//     files = [files];
//   }

//   console.log(files);

//   for (const file of files) {
//     const uploadParams = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `uploads/${file.originalname}`,
//       Body: file.buffer,
//       ACL: "public-read",
//     };

//     try {
//       await s3client.send(new PutObjectCommand(uploadParams));
//       // Constructing the URL
//       const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${uploadParams.Key}`;
//       uploadedFiles.push(fileUrl);
//     } catch (error) {
//       console.error("Error uploading file to S3:", error);
//       throw error; // Rethrow the error to handle it in the controller
//     }
//   }

//   return uploadedFiles;
// };
