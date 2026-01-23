import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export const Avatar = () => {
    const meshRef = useRef()

    // Basic idle animation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        }
    })

    return (
        <group ref={meshRef}>
            {/* Body */}
            <mesh position={[0, 1, 0]} castShadow>
                <capsuleGeometry args={[0.4, 1.5, 4, 8]} />
                <meshStandardMaterial color="#ffccaa" />
            </mesh>

            {/* Head */}
            <mesh position={[0, 2, 0]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color="#ffccaa" />
            </mesh>

            {/* Basic Dress Placeholder */}
            <mesh position={[0, 0.8, 0]}>
                <coneGeometry args={[0.5, 1, 32]} />
                <meshStandardMaterial color="#ff66b2" />
            </mesh>
        </group>
    )
}
