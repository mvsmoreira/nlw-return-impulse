import { MailPlugin } from "../plugins/mailPlugin"
import { FeedbacksRepositories } from "../repositories/feedbackRepository"

interface SubmitFeedbackServiceRequest {
    type: string
    comment: string
    screenshot?: string
}

export class SubmitFeedbackService {
    constructor(
        private feedbacksRepository: FeedbacksRepositories,
        private MailPlugin: MailPlugin,
    ) { }

    async execute(request: SubmitFeedbackServiceRequest) {
        const { type, comment, screenshot } = request

        if(!type) {
            throw new Error('Type is required.')
        }

        if(!comment) {
            throw new Error('Comment is required.')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.MailPlugin.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #222;"`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img style="max-width: 400px;" src="${screenshot}" />` : '',
                `</div>`,
            ].join('\n')
        })
    }
}