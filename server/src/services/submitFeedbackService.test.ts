import { SubmitFeedbackService } from "./submitFeedbackService"

describe('Submit feedback', () => {

    const createFeedbackSpy = jest.fn()
    const sendMailSpy = jest.fn()

    const submitFeedback = new SubmitFeedbackService(
        {create: createFeedbackSpy},
        {sendMail: sendMailSpy}
    )

    it('should be able to submit a feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64;askjdhkjashdkjafuewq',
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it('should not be able to submit a feedback without a type', async () => {

        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64;askjdhkjashdkjafuewq',
        })).rejects.toThrow()
    })

    it('should not be able to submit a feedback without a comment', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64;askjdhkjashdkjafuewq',
        })).rejects.toThrow()
    })

    it('should not be able to submit a feedback with an invalid image format', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/jpg',
        })).rejects.toThrow()
    })
})