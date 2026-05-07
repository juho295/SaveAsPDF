// functions/send-email.js
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { message } = JSON.parse(event.body);
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "searchingforproperties@gmail.com",
                pass: "ndgj foee vjkd fqsf"
            }
        });

        const mailOptions = {
            from: "searchingforproperties@gmail.com",
            to: "financial.news.email@gmail.com",
            cc: "juho295@gmail.com",
            subject: `Save as PDF`,
            text: `${message}`
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully" })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to send email" })
        };
    }
};

