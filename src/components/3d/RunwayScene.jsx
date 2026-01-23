import React from 'react'
import { Avatar } from './Avatar'

export const RunwayScene = () => {
    return (
        <group>
            {/* The Runway Floor */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[10, 50]} />
                <meshStandardMaterial color="#330033" roughness={0.4} metalness={0.8} />
            </mesh>

            {/* Decorative Lights / Side Runners */}
            <mesh position={[-4, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.5, 50]} />
                <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} />
            </mesh>
            <mesh position={[4, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.5, 50]} />
                <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} />
            </mesh>

            {/* The Avatar */}
            <Avatar />
        </group>
    )
}
