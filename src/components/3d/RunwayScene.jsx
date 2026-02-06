import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RepeatWrapping, Vector3 } from 'three'
import { Avatar } from './Avatar'
import React, { useMemo, useRef, useState } from 'react'

// --- Flashbulb Component ---
const Flashbulb = ({ position }) => {
    const lightRef = useRef()
    const [active, setActive] = useState(false)
    const [color, setColor] = useState('#ffffff')
    const vec = new Vector3()

    useFrame(() => {
        // Check overlap with Avatar (Z ~ 0)
        // Only flash if we are "close" (e.g. Z > -8)
        // We need world position for this check
        if (lightRef.current) {
            lightRef.current.getWorldPosition(vec)
            const isClose = vec.z > -8 && vec.z < 8

            // Randomly trigger flash
            if (isClose && !active && Math.random() < 0.01) { // 1% chance per frame (increased slightly since window is smaller)
                setActive(true)
                const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff']
                setColor(colors[Math.floor(Math.random() * colors.length)])

                // Turn off after short duration
                setTimeout(() => {
                    if (lightRef.current) setActive(false)
                }, 100)
            }
        }
    })

    if (!active) {
        // Return invisible ref holder to track position
        return <group position={position}><object3D ref={lightRef} /></group>
    }

    return (
        <group position={position}>
            <pointLight
                ref={lightRef}
                distance={5}
                intensity={5}
                color={color}
                decay={1}
            />
            <mesh>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshBasicMaterial color={color} />
            </mesh>
        </group>
    )
}

// --- Audience Row Component ---
// Represents a single slice of the audience (left and right side)
const AudienceRow = ({ initialZ, zLimit, resetZ }) => {
    const groupRef = useRef()
    const [members] = useState(() => {
        const m = []
        // Left Side
        m.push({ x: -2.5 - Math.random() * 0.5, color: Math.random() * 0xffffff })
        m.push({ x: -3.5 - Math.random() * 0.5, color: Math.random() * 0xffffff })

        // Right Side
        m.push({ x: 2.5 + Math.random() * 0.5, color: Math.random() * 0xffffff })
        m.push({ x: 3.5 + Math.random() * 0.5, color: Math.random() * 0xffffff })
        return m
    })

    // Random flashbulb logic per row
    const hasFlash = useMemo(() => {
        const pseudoRandom = Math.abs(Math.sin(initialZ * 12.9898) * 43758.5453) % 1
        return pseudoRandom < 0.3
    }, [initialZ])

    useFrame((_, delta) => {
        if (groupRef.current) {
            // Move AWAY from Camera (Z-) to simulate... whatever the user wants (Moonwalk? Walking into distance?)
            groupRef.current.position.z -= delta * 3.75

            // Check bounds (Moving negative, so check < limit)
            if (groupRef.current.position.z < zLimit) {
                // Recycle to FRONT
                const overshoot = zLimit - groupRef.current.position.z
                groupRef.current.position.z = resetZ - overshoot
            }
        }
    })

    return (
        <group ref={groupRef} position={[0, 0, initialZ]}>
            {members.map((member, i) => (
                <group key={i} position={[member.x, 0, 0]}> {/* Local Z is 0, moved by parent */}
                    {/* Body */}
                    <mesh position={[0, 0.75, 0]}>
                        <capsuleGeometry args={[0.3, 1.5, 4, 8]} />
                        <meshStandardMaterial color={member.color} />
                    </mesh>
                    {/* Head */}
                    <mesh position={[0, 1.6, 0]}>
                        <sphereGeometry args={[0.25, 8, 8]} />
                        <meshStandardMaterial color="#ffccaa" />
                    </mesh>
                    {/* Flashbulb */}
                    {hasFlash && i === 0 && <Flashbulb position={[0, 2, 0.5]} />}
                </group>
            ))}
        </group>
    )
}

// --- Audience Component ---
const AudienceCrowd = () => {
    // Configuration
    const ROW_COUNT = 25
    const SPACING = 2 // Meters between rows
    // User wants: "spawn in front of viewer (Z=10), move back, despawn in distance (Z=-40)"
    const SPAWN_Z = 10
    const DESPAWN_Z = -40

    const rows = useMemo(() => {
        return Array.from({ length: ROW_COUNT }).map((_, i) => {
            // Distribute initial Z positions
            // Start at SPAWN_Z and go back
            const initialZ = SPAWN_Z - (i * SPACING)
            return initialZ
        })
    }, [])

    return (
        <group>
            {rows.map((z, i) => (
                <AudienceRow
                    key={i}
                    initialZ={z}
                    zLimit={DESPAWN_Z}
                    resetZ={SPAWN_Z}
                />
            ))}
        </group>
    )
}

export const RunwayScene = () => {
    // Load texture for side runners
    const rawFabric = useTexture('/assets/fabric.png')

    const fabricMap = useMemo(() => {
        const t = rawFabric.clone()
        t.wrapS = t.wrapT = RepeatWrapping
        t.repeat.set(1, 20)
        t.needsUpdate = true
        return t
    }, [rawFabric])

    return (
        <group>
            <fog attach="fog" args={['#2a0a2a', 10, 40]} /> {/* Add Fog to hide pop-in */}

            {/* The Runway Floor */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[4, 100]} /> {/* Longer runway */}
                <meshStandardMaterial color="#330033" roughness={0.4} metalness={0.8} />
            </mesh>

            {/* Moving Floor Marker overlay? Or just the side runners moving */}

            {/* Decorative Lights / Side Runners */}
            <mesh position={[-2.1, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.2, 100]} />
                <meshStandardMaterial map={fabricMap} color="#bd00bd" emissive="#bd00bd" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[2.1, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.2, 100]} />
                <meshStandardMaterial map={fabricMap} color="#bd00bd" emissive="#bd00bd" emissiveIntensity={0.5} />
            </mesh>

            {/* Audience */}
            <AudienceCrowd />

            {/* The Avatar */}
            <Avatar />
        </group>
    )
}
