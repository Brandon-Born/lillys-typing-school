import React from 'react'
import { Link, useLocation } from 'wouter'
import { useGameStore } from '../store/useGameStore'
import { useTypingEngine } from '../hooks/useTypingEngine'
import { useAudioManager } from '../hooks/useAudioManager'
import { TypingDisplay } from '../components/TypingDisplay'
import { KeyboardHands } from '../components/KeyboardHands'
import { SceneContainer } from '../components/3d/SceneContainer'

import { lessons } from '../data/lessons'

export const Game = ({ params }) => {
    const [, setLocation] = useLocation()
    const { addCoins } = useGameStore()

    // Find lesson or fallback to first one/debug
    const lesson = lessons.find(l => l.id === params.lessonId)
    const targetText = lesson ? lesson.content : "Error: Lesson not found"
    const rewardCoins = lesson ? lesson.rewards.coins : 5

    const { input, mistakes, wpm, isCompleted, shake, reset } = useTypingEngine(targetText)
    const { playSuccessSound } = useAudioManager()

    React.useEffect(() => {
        if (isCompleted) {
            playSuccessSound()
        }
    }, [isCompleted, playSuccessSound])

    const handleComplete = () => {
        addCoins(rewardCoins)
        setLocation('/agency')
    }

    const handleReplay = () => {
        addCoins(Math.floor(rewardCoins / 2))
        reset()
    }

    return (
        <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-4 space-y-4">

            {/* Navigation Back */}
            <div className="w-full max-w-4xl flex justify-start">
                <Link href="/agency">
                    <button className="text-brand-deep font-bold hover:underline mb-2">← Back to Agency</button>
                </Link>
            </div>

            {/* 3D Runway Stage */}
            <div className="w-full max-w-4xl h-64">
                <SceneContainer target={[0, 1.5, 0]} cameraPosition={[0, 2.2, 5.5]} />
            </div>

            {/* Typing Area */}
            <div className="bg-white p-6 md:p-12 rounded-xl shadow-lg border-2 border-brand-pink text-center space-y-8 max-w-2xl w-full z-10 relative">
                <h2 className="text-2xl font-display text-brand-deep">{lesson?.title || "Runway Rehearsal"}</h2>

                <TypingDisplay targetText={targetText} input={input} shake={shake} />

                {/* Keyboard Hands Overlay */}
                <div className="mt-4 flex justify-center">
                    <KeyboardHands
                        activeKey={!isCompleted ? targetText[input.length] : null}
                        nailColorId={useGameStore.getState().currentOutfit.nails}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center font-mono text-sm text-gray-500 mt-8">
                    <div>
                        <p>WPM</p>
                        <p className="text-xl font-bold text-brand-purple">{wpm}</p>
                    </div>
                    <div>
                        <p>Mistakes</p>
                        <p className={`text-xl font-bold ${mistakes > 0 ? 'text-red-500' : 'text-gray-700'}`}>{mistakes}</p>
                    </div>
                    <div>
                        <p>Status</p>
                        <p className="text-xl font-bold text-brand-deep">{isCompleted ? 'SLAYED!' : 'Typing...'}</p>
                    </div>
                </div>

                {isCompleted && (
                    <div className="space-x-4">
                        <button
                            onClick={handleReplay}
                            className="mt-6 px-6 py-3 bg-brand-pink text-white rounded-full font-display text-lg hover:scale-105 transition shadow-md"
                        >
                            Replay Level (+{Math.floor(rewardCoins / 2)} FC)
                        </button>
                        <button
                            onClick={handleComplete}
                            className="mt-6 px-6 py-3 bg-brand-purple text-white rounded-full font-display text-lg hover:scale-105 transition shadow-md"
                        >
                            Complete Gig (+{rewardCoins} FC)
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
