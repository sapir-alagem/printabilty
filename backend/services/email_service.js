const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const fs = require("fs");

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
            <img src="https://printability.vercel.app/public/assets/B_full_logo_no_BG.png" alt="Printability Logo">
        </div>
        <div class="content">
            <h1>Welcome to Printablity!</h1>
            <p>Thank you for joining Printability. We're thrilled to have you on board and can't wait for you to start exploring everything we have to offer.</p>
            <p>Whether you're looking for a print service, or just getting started, we've got you covered. If you ever have any questions, feel free to reach out to our support team at printability2@gmail.com.</p>
            <p>Here is your temporary password: ${password}</p>
            <a href="https://printabilty.vercel.app/login" class="cta-button">Get Started</a>
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
  try {
    // Read and encode attachments
    const printerSetupGuide = fs
      .readFileSync(__dirname + "/../email attachments/Printer setup Guide.pdf")
      .toString("base64");
    const cupsServerZip = fs
      .readFileSync(__dirname + "/../email attachments/print_server.zip")
      .toString("base64");

    const msg = {
      to: email,
      from: "printability2@gmail.com",
      subject: "Welcome to Printabillity",
      text: `Your password is ${password}. You can now log in to your account.`,
      html: html(password), // Ensure this function generates proper HTML
      attachments: [
        {
          content: printerSetupGuide,
          filename: "Printer setup Guide.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
        {
          content: cupsServerZip,
          filename: "CUPS server.zip",
          type: "application/zip",
          disposition: "attachment",
        },
      ],
    };

    await sgMail.send(msg);
    console.log("Email sent to " + email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmail };
