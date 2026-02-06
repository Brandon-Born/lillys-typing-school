import React, { useMemo } from 'react'
import { getItemById } from '../data/items'

// --- Keyboard Data ---
const KEYS = [
    // Row 1
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    // Row 2
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    // Row 3
    ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
    // Row 4
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
    // Row 5
    ['Space']
]

// Map keys to specific finger identifiers for highlighting
const FINGER_MAP = {
    // Left Hand
    'l-pinky': ['1', 'q', 'a', 'z', '`', 'Shift', 'Tab', 'Caps'],
    'l-ring': ['2', 'w', 's', 'x'],
    'l-middle': ['3', 'e', 'd', 'c'],
    'l-index': ['4', '5', 'r', 't', 'f', 'g', 'v', 'b'],
    'l-thumb': [' '],

    // Right Hand
    'r-index': ['6', '7', 'y', 'u', 'h', 'j', 'n', 'm'],
    'r-middle': ['8', 'i', 'k', ','],
    'r-ring': ['9', 'o', 'l', '.'],
    'r-pinky': ['0', '-', '=', 'p', '[', ']', ';', "'", '/', '\\', 'Enter', 'Backspace'],
    'r-thumb': [' ']
}

export const KeyboardHands = ({ activeKey, nailColorId }) => {
    const nailItem = getItemById(nailColorId)
    const color = nailItem ? nailItem.color : '#ffccdd'
    const skinColor = '#ffccaa'

    // Normalize active key
    const currentKey = activeKey ? activeKey.toLowerCase() : null
    const displayKey = activeKey === ' ' ? 'Space' : activeKey

    // Calculate Coordinates Helpers
    const getKeyCoordinates = (keyTarget) => {
        if (!keyTarget) return null

        const k = keyTarget.toLowerCase()
        const startX = 50
        const startY = 50
        const keySize = 40
        const gap = 5

        let foundX = 0
        let foundY = 0
        let found = false

        let currentY = startY

        // We have to iterate to match the rendering logic exactly
        KEYS.forEach((row, rowIndex) => {
            let currentX = startX + (rowIndex * 15)
            row.forEach((keyLabel) => {
                let w = keySize
                if (['Backspace', 'Tab', 'Caps', 'Enter', 'Shift'].includes(keyLabel)) w = keySize * 1.5
                if (keyLabel === 'Space') w = keySize * 6

                // Match logic
                if (k === ' ' && keyLabel === 'Space') {
                    foundX = currentX + w / 2
                    foundY = currentY + keySize / 2
                    found = true
                } else if (keyLabel.toLowerCase() === k) {
                    foundX = currentX + w / 2
                    foundY = currentY + keySize / 2
                    found = true
                }

                currentX += w + gap
            })
            currentY += keySize + gap
        })

        return found ? { x: foundX, y: foundY } : null
    }

    // Determine active finger
    const getActiveFinger = (key) => {
        if (!key) return null
        const k = key === ' ' ? ' ' : key.toLowerCase()
        for (const [finger, keys] of Object.entries(FINGER_MAP)) {
            if (keys.some(ea => ea === k || ea.toLowerCase() === k)) return finger
        }
        return null
    }

    const activeFinger = getActiveFinger(activeKey)

    // Finger Tips relative to Hand Group Center (0,0)
    // Based on the <Finger> x,y props in the render method + approx length to tip
    const FINGER_OFFSETS = {
        'l-pinky': { x: -55 - 5, y: -10 - 55 },
        'l-ring': { x: -26 - 2, y: -35 - 58 },
        'l-middle': { x: 8 + 0, y: -38 - 60 },
        'l-index': { x: 42 + 2, y: -22 - 58 },
        'l-thumb': { x: 80 - 10, y: 30 - 45 },

        'r-index': { x: -42 - 2, y: -22 - 58 },
        'r-middle': { x: -8 + 0, y: -38 - 60 },
        'r-ring': { x: 26 + 2, y: -35 - 58 },
        'r-pinky': { x: 55 + 5, y: -10 - 55 },
        'r-thumb': { x: -80 + 10, y: 30 - 45 }
    }

    // Calculate Home Positions based on F and J keys
    const homePositions = useMemo(() => {
        const fCoords = getKeyCoordinates('f') || { x: 200, y: 150 }
        const jCoords = getKeyCoordinates('j') || { x: 450, y: 150 }

        // Hand Pos = KeyPos - FingerOffset(index)
        const lOffset = FINGER_OFFSETS['l-index']
        const rOffset = FINGER_OFFSETS['r-index']

        return {
            left: { x: fCoords.x - lOffset.x, y: fCoords.y - lOffset.y },
            right: { x: jCoords.x - rOffset.x, y: jCoords.y - rOffset.y }
        }
    }, [])

    const LEFT_HOME_POS = homePositions.left
    const RIGHT_HOME_POS = homePositions.right

    // Calculate Target Hand Positions
    const targetPos = useMemo(() => {
        let lPos = { ...LEFT_HOME_POS }
        let rPos = { ...RIGHT_HOME_POS }

        if (activeKey) {
            const keyCoords = getKeyCoordinates(activeKey)
            // Check if Space
            if (activeKey === ' ') {
                // For Space, we want both hands to approach it but stay on their side
                // SpaceCenter is keyCoords
                // Target for Left Hand: SpaceCenter - 40
                // Target for Right Hand: SpaceCenter + 40
                const lOffset = FINGER_OFFSETS['l-thumb']
                const rOffset = FINGER_OFFSETS['r-thumb']

                // Left Hand Target
                lPos = {
                    x: (keyCoords.x - 40) - lOffset.x,
                    y: keyCoords.y - lOffset.y
                }

                // Right Hand Target
                rPos = {
                    x: (keyCoords.x + 40) - rOffset.x,
                    y: keyCoords.y - rOffset.y
                }

            } else {
                const fingerName = getActiveFinger(activeKey)
                if (keyCoords && fingerName) {
                    const offset = FINGER_OFFSETS[fingerName]
                    if (offset) {
                        if (fingerName.startsWith('l-')) {
                            lPos = { x: keyCoords.x - offset.x, y: keyCoords.y - offset.y }
                        } else if (fingerName.startsWith('r-')) {
                            rPos = { x: keyCoords.x - offset.x, y: keyCoords.y - offset.y }
                        }
                    }
                }
            }
        }
        return { left: lPos, right: rPos }
    }, [activeKey, LEFT_HOME_POS, RIGHT_HOME_POS])

    // Helper: Key Rendering
    const Key = ({ label, x, y, w = 40, h = 40 }) => {
        const isMatch = (displayKey === 'Space' && label === 'Space') ||
            (label.toLowerCase() === currentKey)

        return (
            <g transform={`translate(${x}, ${y})`}>
                <rect
                    width={w} height={h} rx="4"
                    fill={isMatch ? '#ffeb3b' : '#f0f0f0'}
                    stroke="#cccccc" strokeWidth="2"
                    className="transition-colors duration-100"
                />
                <text
                    x={w / 2} y={h / 2 + 5}
                    textAnchor="middle"
                    fontSize="14"
                    fontFamily="monospace"
                    fill={isMatch ? '#000000' : '#444444'}
                    fontWeight={isMatch ? 'bold' : 'normal'}
                >
                    {label}
                </text>
            </g>
        )
    }

    // Generate Key Layout Positions
    const renderKeyboard = () => {
        const startX = 50
        const startY = 50
        const keySize = 40
        const gap = 5
        let currentY = startY

        return KEYS.map((row, rowIndex) => {
            let currentX = startX + (rowIndex * 15) // Indent rows slightly
            const rowElements = row.map((keyLabel) => {
                let w = keySize
                // Special widths
                if (['Backspace', 'Tab', 'Caps', 'Enter', 'Shift'].includes(keyLabel)) w = keySize * 1.5
                if (keyLabel === 'Space') w = keySize * 6

                const k = <Key key={keyLabel} label={keyLabel} x={currentX} y={currentY} w={w} />
                currentX += w + gap
                return k
            })
            currentY += keySize + gap
            return <g key={rowIndex}>{rowElements}</g>
        })
    }

    // Finger Component
    const Finger = ({ name, x, y, rotation, scale = 1, isThumb = false }) => {
        const isActive = name === activeFinger

        return (
            <g transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`} className="transition-all duration-100">
                {/* Finger Base */}
                <path
                    d={isThumb
                        ? "M -14 -10 Q -14 -40 -10 -55 Q 0 -65 10 -55 Q 14 -40 14 -10 Q 14 10 0 10 Q -14 10 -14 -10 Z"
                        : "M -11 0 Q -11 -40 -10 -60 Q 0 -68 10 -60 Q 11 -40 11 0 Q 11 10 0 10 Q -11 10 -11 0 Z"
                    }
                    fill={isActive ? '#ffddbb' : skinColor}
                    stroke={isActive ? '#ff00ff' : '#dcbba5'}
                    strokeWidth={isActive ? 3 : 1}
                />

                {/* Nail */}
                {!isThumb && (
                    <path
                        d="M -7 -45 Q 0 -58 7 -45 Q 7 -35 6 -30 Q 0 -25 -6 -30 Q -7 -35 -7 -45 Z"
                        fill={color}
                        fillOpacity="0.8"
                    />
                )}

                {/* Thumb Nail */}
                {isThumb && (
                    <path
                        d="M -8 -40 Q 0 -52 8 -40 Q 8 -30 7 -25 Q 0 -20 -7 -25 Q -8 -30 -8 -40 Z"
                        fill={color}
                        fillOpacity="0.8"
                    />
                )}
            </g>
        )
    }

    return (
        <div className="w-full max-w-3xl flex justify-center items-center pb-4">
            <svg viewBox="0 0 800 400" className="w-full drop-shadow-xl bg-gray-50 rounded-xl border-2 border-gray-200">

                {/* Keyboard Layer (Underneath) */}
                <g>{renderKeyboard()}</g>

                {/* Left Hand Layer (Hovering over A-S-D-F) */}
                <g
                    transform={`translate(${targetPos.left.x}, ${targetPos.left.y})`}
                    opacity="0.6"
                    style={{ mixBlendMode: 'multiply', transition: 'transform 0.2s ease-out' }}
                >
                    {/* Palm/Hand Background - Feminine/Organic Shape */}
                    <path
                        d="M -35 40 Q -55 0 -45 -50 Q 0 -60 45 -50 Q 55 0 35 40 Q 0 50 -35 40 Z"
                        fill={skinColor}
                    />

                    <Finger name="l-pinky" x="-55" y="-10" rotation="-15" scale="0.85" />
                    <Finger name="l-ring" x="-26" y="-35" rotation="-5" scale="0.95" />
                    <Finger name="l-middle" x="8" y="-38" rotation="2" scale="1.0" />
                    <Finger name="l-index" x="42" y="-22" rotation="10" scale="0.95" />
                    <Finger name="thumb" x="80" y="30" rotation="45" scale="0.85" isThumb />
                </g>

                {/* Right Hand Layer (Hovering over J-K-L-;) */}
                <g
                    transform={`translate(${targetPos.right.x}, ${targetPos.right.y})`}
                    opacity="0.6"
                    style={{ mixBlendMode: 'multiply', transition: 'transform 0.2s ease-out' }}
                >
                    {/* Palm/Hand Background - Feminine/Organic Shape */}
                    <path
                        d="M -35 40 Q -55 0 -45 -50 Q 0 -60 45 -50 Q 55 0 35 40 Q 0 50 -35 40 Z"
                        fill={skinColor}
                    />

                    <Finger name="thumb" x="-80" y="30" rotation="-45" scale="0.85" isThumb />
                    <Finger name="r-index" x="-42" y="-22" rotation="-10" scale="0.95" />
                    <Finger name="r-middle" x="-8" y="-38" rotation="-2" scale="1.0" />
                    <Finger name="r-ring" x="26" y="-35" rotation="5" scale="0.95" />
                    <Finger name="r-pinky" x="55" y="-10" rotation="15" scale="0.85" />
                </g>
            </svg>
        </div>
    )
}
