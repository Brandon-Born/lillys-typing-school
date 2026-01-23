import React from 'react'
import { Link } from 'wouter'
import { useGameStore } from '../store/useGameStore'
import { useTypingEngine } from '../hooks/useTypingEngine'
import { TypingDisplay } from '../components/TypingDisplay'
import { SceneContainer } from '../components/3d/SceneContainer'

const TEST_SENTENCE = "fashion is fun"

export const Game = () => {
    const { addCoins } = useGameStore()
    const { input, mistakes, wpm, isCompleted, shake, reset } = useTypingEngine(TEST_SENTENCE)

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
                <SceneContainer />
            </div>

            {/* Typing Area */}
            <div className="bg-white p-6 md:p-12 rounded-xl shadow-lg border-2 border-brand-pink text-center space-y-8 max-w-2xl w-full z-10 relative">
                <h2 className="text-2xl font-display text-brand-deep">Runway Rehearsal</h2>

                <TypingDisplay targetText={TEST_SENTENCE} input={input} shake={shake} />

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
                            onClick={() => {
                                reset()
                                addCoins(5)
                            }}
                            className="mt-6 px-6 py-3 bg-brand-pink text-white rounded-full font-display text-lg hover:scale-105 transition shadow-md"
                        >
                            Replay Level (+5 FC)
                        </button>
                        <Link href="/agency">
                            <button className="mt-6 px-6 py-3 bg-brand-purple text-white rounded-full font-display text-lg hover:scale-105 transition shadow-md">
                                Complete Gig
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
