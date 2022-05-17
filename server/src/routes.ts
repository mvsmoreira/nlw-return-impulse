import express from 'express'
import { NodemailerMailPlugin } from './plugins/nodemailer/nodemailerMailPlugin';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackService } from './services/submitFeedbackService';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailPlugin = new NodemailerMailPlugin()

    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbacksRepository,
        nodemailerMailPlugin
    )

    await submitFeedbackService.execute({
        type,
        comment,
        screenshot,
    })

    return res.status(201).send()
})