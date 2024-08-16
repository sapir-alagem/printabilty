const nodeMailer = require("nodemailer");
const html = (password) => `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Pritability</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #ddd;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 20px 0;
        }
        .content h1 {
            font-size: 24px;
            margin-bottom: 20px;
        }
        .content p {
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .cta-button {
            display: block;
            width: 200px;
            text-align: center;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #007BFF;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="[Your Logo URL]" alt="Your Company Logo">
        </div>
        <div class="content">
            <h1>Welcome to Printablity!</h1>
            <p>Thank you for joining Printability. We're thrilled to have you on board and can't wait for you to start exploring everything we have to offer.</p>
            <p>Whether you're looking for a print service, or just getting started, we've got you covered. If you ever have any questions, feel free to reach out to our support team at printability2@gmail.com.</p>
            <p>Here is your temporary password: ${password}</p>
            <a href="[Call to Action URL]" class="cta-button">Get Started</a>
            <p>We look forward to helping you achieve your goals.</p>
            <p>Best regards,<br>Printablity Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Printablity. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;

async function sendEmail(email, password) {
  const transporter = nodeMailer.createTransport({
    //use gmail
    service: "gmail",
    auth: {
      user: "printability2@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: "Printabillity <printability2@gmail.com>",
    to: email,
    subject: "Welcome to Printabillity",
    html: html(password),
    //add attachment
    attachments: [
      {
        filename: "Printer setup Guide.pdf",
        path: __dirname + "/../email attachments/Printer setup Guide.pdf",
        contentType: "application/pdf",
      },
      {
        filename: "CUPS server.zip",
        path: __dirname + "/../email attachments/CUPS server.zip",
        contentType: "application/zip",
      },
    ],
  });
}

module.exports = { sendEmail };
