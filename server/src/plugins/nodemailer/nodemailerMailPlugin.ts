import { MailPlugin, SendMailData } from "../mailPlugin";
import nodemailer from 'nodemailer'


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8844cd34fdc073",
        pass: "ac587108f24286"
    }
});

export class NodemailerMailPlugin implements MailPlugin {
    async sendMail({subject, body}: SendMailData) {

        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Vinicius Moreira <vini@mail.com>',
            subject,
            html: body,
        })
    }
}