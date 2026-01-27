import React from 'react'
import { Link } from 'wouter'
import { useGameStore } from '../store/useGameStore'
import { SHOP_ITEMS } from '../data/items'

export const Mall = () => {
    const { fashionCoins, addCoins, unlockedItems, unlockItem } = useGameStore()

    const handleBuy = (item) => {
        if (fashionCoins >= item.price && !unlockedItems.includes(item.id)) {
            addCoins(-item.price)
            unlockItem(item.id)
        }
    }

    return (
        <div className="min-h-screen bg-brand-light p-8">
            <Link href="/agency">
                <button className="text-brand-deep font-bold hover:underline mb-8">← Back to Agency</button>
            </Link>

            <header className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-display text-brand-deep">The Mall</h1>
                <div className="flex gap-4 items-center">

                    <div className="font-mono text-xl bg-white px-4 py-2 rounded-lg border-2 border-brand-pink text-brand-purple">
                        FC: {fashionCoins}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SHOP_ITEMS.map((item) => {
                    const isOwned = unlockedItems.includes(item.id)
                    const canAfford = fashionCoins >= item.price

                    return (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-md border-2 border-brand-silver flex flex-col items-center">
                            <div
                                className="w-24 h-24 rounded-full mb-4 border-2 border-brand-light"
                                style={{ backgroundColor: item.color }}
                            />
                            <h3 className="font-display text-lg text-brand-deep">{item.name}</h3>
                            <p className="font-mono text-sm text-gray-500 mb-4">{item.category}</p>

                            {isOwned ? (
                                <button disabled className="mt-auto px-6 py-2 bg-gray-200 text-gray-500 font-bold rounded-lg cursor-default">
                                    Owned
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleBuy(item)}
                                    disabled={!canAfford}
                                    className={`mt-auto px-6 py-2 font-bold rounded-lg transition ${canAfford
                                        ? 'bg-brand-pink text-white hover:scale-105 shadow-md'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Buy {item.price} FC
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
