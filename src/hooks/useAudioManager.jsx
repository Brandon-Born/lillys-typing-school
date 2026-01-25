import React, { createContext, useContext, useRef } from 'react'
import { useSettingsStore } from '../store/useSettingsStore'

const AudioContext = createContext(null)

export const AudioProvider = ({ children }) => {
    const { masterVolume, sfxVolume } = useSettingsStore()
    const audioCtxRef = useRef(null)

    // Initialize AudioContext on first interaction or mount (Chrome policy requires interaction, but usually ok in callbacks)
    const getContext = () => {
        if (!audioCtxRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext
            audioCtxRef.current = new AudioContext()
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume()
        }
        return audioCtxRef.current
    }

    const playTone = (freq, type, duration, vol) => {
        try {
            const ctx = getContext()
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.type = type
            osc.frequency.setValueAtTime(freq, ctx.currentTime)

            // Volume Calculation: Master * SFX * Specific Sound
            const finalVol = masterVolume * sfxVolume * vol

            gain.gain.setValueAtTime(finalVol, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

            osc.connect(gain)
            gain.connect(ctx.destination)

            osc.start()
            osc.stop(ctx.currentTime + duration)
        } catch (e) {
            console.warn("Audio Playback Failed", e)
        }
    }

    const playNoise = (duration, vol) => {
        try {
            const ctx = getContext()
            const bufferSize = ctx.sampleRate * duration
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
            const data = buffer.getChannelData(0)

            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1
            }

            const noise = ctx.createBufferSource()
            noise.buffer = buffer

            const gain = ctx.createGain()
            // Make it snappy for a "clack"
            const finalVol = masterVolume * sfxVolume * vol
            gain.gain.setValueAtTime(finalVol, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

            // Lowpass filter to make it sound more like plastic keycap
            const filter = ctx.createBiquadFilter()
            filter.type = 'lowpass'
            filter.frequency.value = 1000

            noise.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)

            noise.start()
        } catch (e) {
            console.warn("Noise Playback Failed", e)
        }
    }

    const playTypingSound = () => {
        // Synthesize a mechanical "clack" with noise burst
        playNoise(0.05, 0.5)
    }

    const playErrorSound = () => {
        // Low "thud" or "wobble"
        playTone(150, 'sawtooth', 0.2, 0.3)
    }

    const playSuccessSound = () => {
        // Happy major arpeggio
        const ctx = getContext()
        const now = ctx.currentTime
        const speed = 0.1;

        // C Major: C E G C
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.type = 'sine'
            osc.frequency.setValueAtTime(freq, now + (i * speed))

            const finalVol = masterVolume * (sfxVolume * 0.8) // Slightly quieter as it's multiple tones
            gain.gain.setValueAtTime(finalVol, now + (i * speed))
            gain.gain.exponentialRampToValueAtTime(0.01, now + (i * speed) + 0.5)

            osc.connect(gain)
            gain.connect(ctx.destination)

            osc.start(now + (i * speed))
            osc.stop(now + (i * speed) + 0.5)
        })
    }

    return (
        <AudioContext.Provider value={{ playTypingSound, playErrorSound, playSuccessSound }}>
            {children}
        </AudioContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAudioManager = () => {
    return useContext(AudioContext)
}
