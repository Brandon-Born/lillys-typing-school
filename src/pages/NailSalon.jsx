import React from 'react'
import { Link } from 'wouter'
import { useGameStore } from '../store/useGameStore'
import { SHOP_ITEMS } from '../data/items'
import { KeyboardHands } from '../components/KeyboardHands'

export const NailSalon = () => {
    const {
        fashionCoins,
        unlockedItems,
        currentOutfit,
        unlockItem,
        addCoins,
        setOutfitItem
    } = useGameStore()

    const nailItems = SHOP_ITEMS.filter(item => item.category === 'nails')

    // Also include default item if not in SHOP_ITEMS
    const defaultNails = { id: 'default-nails', name: 'Natural Pink', category: 'nails', price: 0, color: '#ffccdd', description: 'Clean and natural.' }

    const allNails = [defaultNails, ...nailItems]

    const handlePurchase = (item) => {
        if (unlockedItems.includes(item.id)) {
            // Equip
            setOutfitItem('nails', item.id)
        } else {
            // Buy
            if (fashionCoins >= item.price) {
                addCoins(-item.price)
                unlockItem(item.id)
                setOutfitItem('nails', item.id) // Auto-equip on buy
            } else {
                alert("Not enough Fashion Coins!")
            }
        }
    }

    return (
        <div className="min-h-screen bg-pink-50 flex flex-col">
            {/* Header */}
            <header className="bg-white p-4 shadow-md flex justify-between items-center z-10">
                <div className="flex items-center space-x-4">
                    <Link href="/agency">
                        <button className="text-brand-deep font-bold hover:underline">← Back to Agency</button>
                    </Link>
                    <h1 className="text-2xl font-display text-brand-pink">💅 Glamour Nails</h1>
                </div>
                <div className="bg-yellow-100 px-4 py-2 rounded-full font-mono text-brand-deep border-2 border-yellow-300">
                    🪙 {fashionCoins} FC
                </div>
            </header>

            <main className="flex-1 flex flex-col md:flex-row p-4 gap-4">
                {/* Left: Preview */}
                <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center border-2 border-brand-pink">
                    <h2 className="text-2xl font-display text-gray-700 mb-8">Try On</h2>

                    {/* Show Hands Preview */}
                    <div className="scale-125 transform origin-center">
                        <KeyboardHands activeKey={null} nailColorId={currentOutfit.nails} />
                    </div>

                    <p className="mt-8 text-gray-500 italic">These hands will help you type!</p>
                </div>

                {/* Right: Shop */}
                <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6 border-2 border-brand-purple overflow-y-auto">
                    <h2 className="text-xl font-display text-brand-purple mb-4">Select Style</h2>

                    <div className="grid grid-cols-1 gap-3">
                        {allNails.map(item => {
                            const isOwned = unlockedItems.includes(item.id)
                            const isEquipped = currentOutfit.nails === item.id

                            return (
                                <div
                                    key={item.id}
                                    className={`flex items-center justify-between p-3 rounded-lg border-2 transition hover:shadow-md ${isEquipped ? 'border-brand-pink bg-pink-50' : 'border-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-10 h-10 rounded-full border border-gray-300 shadow-inner"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <div>
                                            <p className="font-bold text-gray-800">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.description}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handlePurchase(item)}
                                        disabled={isEquipped}
                                        className={`px-4 py-2 rounded-full font-bold text-sm ${isEquipped
                                                ? 'bg-brand-pink text-white opacity-50 cursor-default'
                                                : isOwned
                                                    ? 'bg-brand-purple text-white hover:bg-purple-600'
                                                    : 'bg-green-500 text-white hover:bg-green-600'
                                            }`}
                                    >
                                        {isEquipped ? 'Wearing' : isOwned ? 'Wear' : `${item.price} FC`}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}
