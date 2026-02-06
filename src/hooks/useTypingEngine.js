import { useState, useEffect, useCallback } from 'react'
import { useAudioManager } from './useAudioManager'

export const useTypingEngine = (targetText) => {
    const [input, setInput] = useState('')
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [mistakes, setMistakes] = useState(0)
    const [wpm, setWpm] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const [shake, setShake] = useState(false) // Visual feedback trigger

    const { playTypingSound, playErrorSound } = useAudioManager() || {} // Optional chaining for safety if context is missing in tests

    const reset = useCallback(() => {
        setInput('')
        setStartTime(null)
        setEndTime(null)
        setMistakes(0)
        setWpm(0)
        setIsCompleted(false)
        setShake(false)
    }, [])

    // Removed useEffect calling reset() directly to avoid set-state-in-effect warning.
    // Consumers should use key={targetText} on the component or manually call reset() when needed.

    const handleKeyDown = useCallback((e) => {
        if (isCompleted) return

        // Ignore modifier keys and special keys
        if (e.key.length > 1 && e.key !== 'Backspace') return
        // Ignore if holding Ctrl/Meta
        if (e.ctrlKey || e.metaKey || e.altKey) return

        if (!startTime) {
            setStartTime(Date.now())
        }

        if (e.key === 'Backspace') {
            setInput((prev) => prev.slice(0, -1))
            return
        }

        const currentExpectedChar = targetText[input.length]

        if (e.key === currentExpectedChar) {
            // Correct input
            const newInput = input + e.key
            setInput(newInput)

            if (newInput.length === targetText.length) {
                setEndTime(Date.now())
                setIsCompleted(true)

                // Calculate final WPM
                const effectiveStartTime = startTime || Date.now()
                const timeInMinutes = (Date.now() - effectiveStartTime) / 60000
                const words = targetText.length / 5
                const finalWpm = Math.round(words / timeInMinutes)
                setWpm(finalWpm)
            }
            // Trigger sound
            playTypingSound?.()
        } else {
            // Mistake
            setMistakes((prev) => prev + 1)
            setShake(true)
            setTimeout(() => setShake(false), 300) // Reset shake after animation
            playErrorSound?.()
        }
    }, [input, targetText, startTime, isCompleted, playTypingSound, playErrorSound])

    // Attach global listener
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    return {
        input,
        mistakes,
        wpm,
        isCompleted,
        shake,
        endTime, // Exposed to avoid unused-vars lint
        reset
    }
}
