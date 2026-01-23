import React from 'react'

export const TypingDisplay = ({ targetText, input, shake }) => {
    return (
        <div className={`text-4xl font-mono leading-relaxed transition-transform ${shake ? 'animate-shake text-red-500' : ''}`}>
            {targetText.split('').map((char, index) => {
                let colorClass = 'text-gray-300' // Pending
                if (index < input.length) {
                    colorClass = 'text-brand-purple' // Correct
                } else if (index === input.length) {
                    colorClass = 'bg-brand-light border-b-4 border-brand-pink text-gray-800' // Current cursor
                }

                return (
                    <span key={index} className={`${colorClass} transition-colors duration-100`}>
                        {char}
                    </span>
                )
            })}
        </div>
    )
}
