import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSettingsStore = create(
    persist(
        (set) => ({
            // State
            masterVolume: 0.8,
            sfxVolume: 1.0,
            musicVolume: 0.6,
            difficulty: 'normal', // 'easy', 'normal', 'hard'

            // Actions
            setMasterVolume: (val) => set({ masterVolume: val }),
            setSfxVolume: (val) => set({ sfxVolume: val }),
            setMusicVolume: (val) => set({ musicVolume: val }),
            setDifficulty: (val) => set({ difficulty: val }),
        }),
        {
            name: 'lillys-settings-storage',
        }
    )
)
