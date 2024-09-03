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
            padding-bottom: 1px;
            border-bottom: 1px solid #ddd;
        }
        .header img {
            max-width: 300px;
        }
        .content {
            padding: 20px;
            
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
            <img src="https://printabillty-file-uploads.s3.eu-north-1.amazonaws.com/assets/B+full+logo+no+BG+.png" alt="Printability Logo">
        </div>
        <div class="content">
            <h1>🎉 Welcome to Printability! 🎉</h1>
            <p>Thank you for joining Printability! We're excited to have you with us and can't wait for you to explore all the amazing features we offer. 🚀</p>
            <p>Whether you're ready to start using our print services or just getting started, we're here to support you every step of the way. If you have any questions, feel free to reach out to our support team at <a href="mailto:printability2@gmail.com">printability2@gmail.com</a> 📧.</p>
            <p>Here is your temporary password: <strong>${password}</strong> 🔑</p>
            <a href="https://printabilty.vercel.app/login" class="cta-button">Get Started 🚀</a>
            <p>We’re looking forward to helping you achieve your goals and making your experience fantastic! 🌟</p>
            <p>Best regards,<br>The Printability Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Printability. All rights reserved. 🌟</p>
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
