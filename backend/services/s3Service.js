const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const AWS = require("aws-sdk");

exports.s3Uploadv3 = async (files) => {
  try {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const s3 = new AWS.S3();

    if (!Array.isArray(files)) {
      files = [files];
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${files[0].originalname}`,
      Body: files[0].buffer,
      ACL: "public-read",
    };

    await s3.upload(params).promise();
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
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
