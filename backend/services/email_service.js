const nodeMailer = require('nodemailer');

const html = (password) => `
    <h1>Thank you for signing up!</h1>
    <p> your password is: ${password}</p>
    <p>Click <a href="http://localhost:3000">here</a> to log in.</p>
`;

async function sendEmail(email, password) {
    const transporter = nodeMailer.createTransport({
        //use gmail
        service: 'gmail',
        auth: {
            user: 'idanmeyer79@gmail.com',
            pass: "app key"
        }
    })

    const info = await transporter.sendMail({
        from: 'Printabillity <idan@tulu.io>',
        to: email,
        subject: 'Welcome to Printabillity',
        html: html(password) 
    })

}

module.exports = { sendEmail };