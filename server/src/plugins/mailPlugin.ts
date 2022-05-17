export interface SendMailData {
    subject: string
    body: string
}

export interface MailPlugin {
    sendMail: (data: SendMailData) => Promise<void>
}