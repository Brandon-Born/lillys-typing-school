import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const STARTING_UNLOCKED_ITEMS = ['basic-tee', 'jeans', 'sneakers', 'default-hair', 'default-nails']
export const STARTING_OUTFIT = {
    top: 'basic-tee',
    bottom: 'jeans',
    shoes: 'sneakers',
    hair: 'default-hair',
    nails: 'default-nails'
}

export const useGameStore = create(
    persist(
        (set) => ({
            // Player Progress
            level: 1,
            fashionCoins: 0,
            fans: 0,
            completedLessons: {},

            // Inventory
            unlockedItems: [...STARTING_UNLOCKED_ITEMS], // Starting items
            currentOutfit: { ...STARTING_OUTFIT },

            // Actions
            addCoins: (amount) => set((state) => ({ fashionCoins: state.fashionCoins + amount })),
            addFans: (amount) => set((state) => ({ fans: state.fans + amount })),
            levelUp: () => set((state) => ({ level: state.level + 1 })),
            markLessonCompleted: (lessonId) => set((state) => ({
                completedLessons: { ...state.completedLessons, [lessonId]: true }
            })),

            unlockItem: (itemId) => set((state) => {
                if (state.unlockedItems.includes(itemId)) return state
                return { unlockedItems: [...state.unlockedItems, itemId] }
            }),

            unlockAllItems: (itemIds) => set((state) => ({
                unlockedItems: [...new Set([...state.unlockedItems, ...itemIds])]
            })),

            setOutfitItem: (category, itemId) => set((state) => ({
                currentOutfit: { ...state.currentOutfit, [category]: itemId }
            })),
        }),
        {
            name: 'lillys-typing-school-storage', // unique name
        }
    )
)
