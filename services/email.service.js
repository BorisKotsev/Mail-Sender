const sendgridMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = require("../global");

sendgridMail.setApiKey(SENDGRID_API_KEY);

class EmailService {
    static sendText = (recipient, subject, message) => {
        return new Promise((resolve, reject) => {
            const data = {
                to: recipient,
                from: "bobiko2319abv@gmail.com",
                subject: subject,
                text: message,
            };
            sendgridMail.send(data).then(resolve).catch(reject);
        });
    };

    static sendHtml = (recipient, subject, html) => {
        return new Promise((resolve, reject) => {
            const data = {
                to: recipient,
                from: "bobiko2319abv@gmail.com",
                subject: subject,
                html: html,
            };
            sendgridMail.send(data).then(resolve).catch(reject);
        });
    };
}

module.exports = EmailService;
