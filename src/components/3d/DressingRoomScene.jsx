import React from 'react'
import { Avatar } from './Avatar'

export const DressingRoomScene = () => {
    return (
        <group>
            {/* Platform */}
            <mesh receiveShadow position={[0, -0.1, 0]}>
                <cylinderGeometry args={[1, 1, 0.2, 32]} />
                <meshStandardMaterial color="#330033" />
            </mesh>

            {/* The Avatar */}
            <Avatar />
        </group>
    )
}
