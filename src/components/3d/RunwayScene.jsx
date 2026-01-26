import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Avatar } from './Avatar'
import React, { useMemo } from 'react'

export const RunwayScene = () => {
    // Load texture for side runners
    const rawFabric = useTexture('/assets/fabric.png')

    const fabricMap = useMemo(() => {
        const t = rawFabric.clone()
        t.wrapS = t.wrapT = THREE.RepeatWrapping
        t.repeat.set(1, 20)
        t.needsUpdate = true
        return t
    }, [rawFabric])

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
                <meshStandardMaterial map={fabricMap} color="#bd00bd" emissive="#bd00bd" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[4, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.5, 50]} />
                <meshStandardMaterial map={fabricMap} color="#bd00bd" emissive="#bd00bd" emissiveIntensity={0.5} />
            </mesh>

            {/* The Avatar */}
            <Avatar />
        </group>
    )
}
