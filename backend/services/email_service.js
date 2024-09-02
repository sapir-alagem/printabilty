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
            <svg width="592" height="177" viewBox="0 0 592 177" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="30" width="55" height="16" fill="black"/>
<rect x="30" y="96" width="27.5" height="27.5" fill="#242021"/>
<rect x="57.5" y="96" width="27.5" height="27.5" fill="#E30284"/>
<rect x="30" y="123.5" width="27.5" height="27.5" fill="#0BAAEE"/>
<rect x="57.5" y="123.5" width="27.5" height="27.5" fill="#FDEE0B"/>
<path d="M0 39H92.25C101.777 39 109.5 46.7231 109.5 56.25V56.25C109.5 65.7769 101.777 73.5 92.25 73.5H30" stroke="black" stroke-width="17"/>
<path d="M118 151L118 97" stroke="black" stroke-width="17"/>
<path d="M168 151L168 97" stroke="black" stroke-width="14"/>
<path d="M168 92L168 74" stroke="#E30284" stroke-width="14"/>
<path d="M168 92L168 74" stroke="#0BAAEE" stroke-width="14"/>
<path d="M419 151L419 97" stroke="black" stroke-width="14"/>
<path d="M419 92L419 74" stroke="#0BAAEE" stroke-width="14"/>
<path d="M419 92L419 74" stroke="#E30284" stroke-width="14"/>
<path d="M478 92L478 74" stroke="#FDEE0B" stroke-width="14"/>
<path d="M478 151V97" stroke="black" stroke-width="14"/>
<path d="M448 151L448 74" stroke="black" stroke-width="14"/>
<path d="M151 106H141C128.297 106 118 116.297 118 129V138" stroke="black" stroke-width="14"/>
<path d="M197 150.5V122.5C197 113.387 204.387 106 213.5 106V106C222.613 106 230 113.387 230 122.5V150.5" stroke="black" stroke-width="14"/>
<path d="M551 97V125C551 134.113 558.387 141.5 567.5 141.5V141.5C576.613 141.5 584 134.113 584 125V97" stroke="black" stroke-width="14"/>
<path d="M260 73.5V150.5M240 99H280.5" stroke="black" stroke-width="14"/>
<path d="M515 82V150.5M495 109H535.5" stroke="black" stroke-width="14"/>
<circle cx="310.5" cy="123.5" r="19.5" stroke="black" stroke-width="14"/>
<circle cx="374.5" cy="123.5" r="19.5" stroke="black" stroke-width="14"/>
<path d="M330 122.5V150.5" stroke="black" stroke-width="14"/>
<path d="M355 74L355 124" stroke="black" stroke-width="14"/>
<path d="M584.5 97.5V151.5C584.5 161.441 576.441 169.5 566.5 169.5H543.5" stroke="black" stroke-width="14"/>
</svg>
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
    console.log("Sending email to:", email);
    const transporter = nodeMailer.createTransport({
      //use gmail
      service: "gmail",
      auth: {
        user: "printability2@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const info = transporter.sendMail({
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
          path: __dirname + "/../email attachments/print_server.zip",
          contentType: "application/zip",
        },
      ],
    });
    console.log("Email sent: ", info);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendEmail };
