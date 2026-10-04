const mailer = require("nodemailer");
const transporter = mailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

module.exports = {
    sendMail: async function (to, subject, html) {
        try {
            const mailOptions = {
                from: process.env.SMTP_USER,
                to,
                subject,
                html
            };
            return transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Failed to send email");
        }
    }
};