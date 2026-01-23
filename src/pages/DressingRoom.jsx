import React, { useState } from 'react'
import { Link } from 'wouter'
import { useGameStore } from '../store/useGameStore'
import { SHOP_ITEMS } from '../data/items'

export const DressingRoom = () => {
    const { unlockedItems, currentOutfit, setOutfitItem } = useGameStore()
    const [activeTab, setActiveTab] = useState('top')

    const categories = ['top', 'bottom', 'shoes', 'hair']

    // Filter items owned by the user
    const ownedItems = SHOP_ITEMS.filter(item => unlockedItems.includes(item.id))

    return (
        <div className="min-h-screen bg-brand-light p-8">
            <Link href="/agency">
                <button className="text-brand-deep font-bold hover:underline mb-8">← Back to Agency</button>
            </Link>

            <header className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-display text-brand-deep">Dressing Room</h1>
                <div className="bg-white px-6 py-4 rounded-xl shadow-md border-2 border-brand-purple">
                    <h3 className="font-display text-lg mb-2 text-brand-purple">Current Outfit</h3>
                    <div className="text-sm font-mono text-gray-600 grid grid-cols-2 gap-x-4">
                        {Object.entries(currentOutfit).map(([slot, id]) => (
                            <div key={slot} className="capitalize">
                                <span className="font-bold text-gray-800">{slot}:</span> {SHOP_ITEMS.find(i => i.id === id)?.name || id}
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6 border-b-2 border-gray-200 pb-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`px-4 py-2 font-display text-lg rounded-t-lg transition-colors ${activeTab === cat
                                ? 'bg-brand-pink text-white shadow-md'
                                : 'text-gray-500 hover:text-brand-pink'
                            }`}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}s
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ownedItems.filter(item => item.category === activeTab).length === 0 && (
                    <p className="col-span-4 text-center text-gray-500 font-mono py-12">No items in this category yet. Go to the Mall!</p>
                )}

                {ownedItems.filter(item => item.category === activeTab).map((item) => {
                    const isEquipped = currentOutfit[item.category] === item.id

                    return (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-md border-2 border-brand-silver flex flex-col items-center">
                            <div
                                className="w-24 h-24 rounded-full mb-4 border-2 border-brand-light"
                                style={{ backgroundColor: item.color }}
                            />
                            <h3 className="font-display text-lg text-brand-deep">{item.name}</h3>

                            <button
                                onClick={() => setOutfitItem(item.category, item.id)}
                                disabled={isEquipped}
                                className={`mt-4 w-full py-2 font-bold rounded-lg transition ${isEquipped
                                        ? 'bg-brand-deep text-white cursor-default'
                                        : 'bg-white border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white'
                                    }`}
                            >
                                {isEquipped ? 'Equipped' : 'Wear'}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
