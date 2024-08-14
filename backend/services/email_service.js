const nodeMailer = require("nodemailer");
const html = (password) => `
    <h1>Thank you for signing up!</h1>
    <p> your password is: ${password}</p>
    <p>Click <a href="http://localhost:3000">here</a> to log in.</p>
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
