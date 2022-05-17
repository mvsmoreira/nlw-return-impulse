import { useState } from "react"

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { FeedbackTypeStep } from "../FeedbackTypeStep"
import { FeedbackContentStep } from "../FeedbackContentStep"
import { FeedbackSuccessStep } from "../FeedbackSuccessStep"


export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto',
        },
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada',
        },
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de uma nuvem de pensamento',
        },
    },
}

export type FeedbackType = keyof typeof feedbackTypes

export const WidgetForm = () => {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedBackSent] = useState(false)

    const handleRestartFeedback = () => {
        setFeedBackSent(false)
        setFeedbackType(null)
    }

    return (
        <div className="bg-zinc-800 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep feedbackType={feedbackType} onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent={() => setFeedBackSent(true)}
                        />
                    )}
                </>
            )}
            <footer className="text-xs text-zinc-600">
                Feito com ♥ por <span className="underline underline-offset-1">Vinicius</span>
            </footer>
        </div>
    )
}