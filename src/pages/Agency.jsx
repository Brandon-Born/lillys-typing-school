import React from 'react'
import { Link } from 'wouter'
import { useGameStore } from '../store/useGameStore'
import { lessons } from '../data/lessons'

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


                {/* Job Board - Takes up vertical space */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand-purple row-span-2">
                    <h2 className="text-2xl font-display text-brand-deep mb-4">Job Board</h2>
                    <p className="mb-4 font-sans text-sm text-gray-600">Select a contract to walk via keyboard.</p>

                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {lessons.map((lesson) => (
                            <Link key={lesson.id} href={`/game/${lesson.id}`}>
                                <div className="block p-3 border border-brand-pink/30 rounded-lg hover:bg-brand-pink/10 cursor-pointer transition group">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-brand-deep group-hover:text-brand-pink transition">
                                            {lesson.title}
                                        </span>
                                        <span className="text-xs font-mono bg-brand-light text-brand-purple px-2 py-0.5 rounded-full">
                                            Phase {lesson.phase}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">{lesson.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Dressing Room */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand-pink">
                    <h2 className="text-2xl font-display text-brand-deep mb-4">Dressing Room</h2>
                    <p className="mb-6 font-sans">Change your look and slay.</p>
                    <Link href="/dressing-room" className="block w-full py-3 bg-brand-purple text-white text-center font-bold rounded-lg hover:bg-brand-deep transition">
                        Customize Avatar
                    </Link>
                </div>

                {/* Nail Salon */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand-pink bg-pink-50">
                    <h2 className="text-2xl font-display text-brand-pink mb-4">💅 Glamour Nails</h2>
                    <p className="mb-6 font-sans">Get that fresh manicure.</p>
                    <Link href="/nail-salon" className="block w-full py-3 bg-brand-pink text-white text-center font-bold rounded-lg hover:bg-brand-purple transition">
                        Visit Salon
                    </Link>
                </div>

                {/* Mall */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand-silver">
                    <h2 className="text-2xl font-display text-brand-deep mb-4">The Mall</h2>
                    <p className="mb-6 font-sans">Shop 'til you drop!</p>
                    <Link href="/mall" className="block w-full py-3 bg-brand-deep text-white text-center font-bold rounded-lg hover:bg-brand-pink transition">
                        Go Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}
