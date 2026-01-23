import React from 'react'
import { Link } from 'wouter'
import { useGameStore } from '../store/useGameStore'

export const Agency = () => {
    const { fashionCoins, level } = useGameStore()

    return (
        <div className="min-h-screen bg-brand-light p-8">
            <header className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-display text-brand-deep">The Agency</h1>
                <div className="font-mono text-brand-purple">
                    <span>Level: {level}</span> | <span>FC: {fashionCoins}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Job Board */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand-purple">
                    <h2 className="text-2xl font-display text-brand-deep mb-4">Job Board</h2>
                    <p className="mb-6 font-sans">Ready for your next runway booking?</p>
                    <Link href="/game">
                        <button className="w-full py-3 bg-brand-pink text-white font-bold rounded-lg hover:bg-brand-deep transition">
                            Start Next Lesson
                        </button>
                    </Link>
                </div>

                {/* Wardrobe */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand-pink">
                    <h2 className="text-2xl font-display text-brand-deep mb-4">Dressing Room</h2>
                    <p className="mb-6 font-sans">Change your look and slay.</p>
                    <Link href="/dressing-room">
                        <button className="w-full py-3 bg-brand-purple text-white font-bold rounded-lg hover:bg-brand-deep transition">
                            Customize Avatar
                        </button>
                    </Link>
                </div>

                {/* Mall */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand-silver">
                    <h2 className="text-2xl font-display text-brand-deep mb-4">The Mall</h2>
                    <p className="mb-6 font-sans">Shop 'til you drop!</p>
                    <Link href="/mall">
                        <button className="w-full py-3 bg-brand-deep text-white font-bold rounded-lg hover:bg-brand-pink transition">
                            Go Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
