import React from 'react'
import { useLocation } from 'wouter'

export const Splash = () => {
    const [, setLocation] = useLocation()

    return (
        <button
            type="button"
            className="min-h-screen w-full bg-brand-deep flex flex-col items-center justify-center text-white cursor-pointer"
            onClick={() => setLocation('/agency')}
        >
            <div className="animate-bounce">
                <h1 className="text-6xl font-display text-brand-pink mb-4 text-shadow-lg">Lilly's Typing School</h1>
            </div>
            <p className="font-mono text-xl animate-pulse">Click or Press Enter to Start</p>
        </button>
    )
}
