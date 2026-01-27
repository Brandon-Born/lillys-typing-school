import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Decal } from '@react-three/drei'
import * as THREE from 'three'
import { useGameStore } from '../../store/useGameStore'
import { getItemById } from '../../data/items'

export const Avatar = () => {
    const groupRef = useRef()
    const leftArmRef = useRef()
    const rightArmRef = useRef()
    const leftLegRef = useRef()
    const rightLegRef = useRef()

    // Get outfit from store
    const { currentOutfit } = useGameStore()

    // Resolve items
    const topItem = getItemById(currentOutfit.top) || {}
    const bottomItem = getItemById(currentOutfit.bottom) || {}
    const shoeItem = getItemById(currentOutfit.shoes) || {}
    const hairItem = getItemById(currentOutfit.hair) || {}

    // Load static textures (Face)
    // TODO: Dynamic textures will be loaded here when assets are ready
    const [rawFace] = useTexture([
        '/assets/face.png?v=skinbg',
    ])

    // Load Dynamic Textures
    // We use a fallback if no texture is defined
    const fabricUrl = '/assets/fabric.png'
    const topTextureUrl = topItem.texture || fabricUrl
    const bottomTextureUrl = bottomItem.texture || fabricUrl

    const [topTexture, bottomTexture] = useTexture([topTextureUrl, bottomTextureUrl])

    // Configure Textures
    // Top uses Box Mapping (Front Face only)
    // Bottom uses Seamless Texture (All Faces)

    // Set repeat for seamless texturing on Skirt/Pants
    bottomTexture.wrapS = bottomTexture.wrapT = THREE.RepeatWrapping
    bottomTexture.repeat.set(1, 1)

    // Materials Setup for TOP
    const materials = useMemo(() => {
        const matColor = new THREE.MeshStandardMaterial({ color: topItem.color || '#ffffff' })
        const matTexture = new THREE.MeshStandardMaterial({
            map: topTexture,
            color: 'white',
            transparent: true
        })
        return [matColor, matColor, matColor, matColor, matTexture, matColor]
    }, [topItem.color, topTexture])

    // Helper: Determine if bottom is skirt or pants
    const isSkirt = bottomItem.id?.includes('skirt')
    const skinColor = "#ffccaa"

    // Materials Setup for BOTTOMS
    const legMaterial = useMemo(() => {
        if (isSkirt) {
            return new THREE.MeshStandardMaterial({ color: skinColor })
        }
        return new THREE.MeshStandardMaterial({
            map: bottomTexture,
            color: 'white'
        })
    }, [isSkirt, skinColor, bottomTexture])

    const skirtMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            map: bottomTexture,
            color: 'white'
        })
    }, [bottomTexture])

    const faceMap = useMemo(() => {
        const face = rawFace.clone()
        face.colorSpace = THREE.SRGBColorSpace
        face.needsUpdate = true
        return face
    }, [rawFace])

    useFrame((state) => {
        const t = state.clock.elapsedTime
        if (groupRef.current) {
            // Bobbing transform
            groupRef.current.position.y = Math.sin(t * 4) * 0.05

            // Walk Cycle
            if (leftArmRef.current && rightArmRef.current) {
                leftArmRef.current.rotation.x = Math.sin(t * 8) * 0.5
                rightArmRef.current.rotation.x = -Math.sin(t * 8) * 0.5
            }
            if (leftLegRef.current && rightLegRef.current) {
                leftLegRef.current.rotation.x = -Math.sin(t * 8) * 0.5
                rightLegRef.current.rotation.x = Math.sin(t * 8) * 0.5
            }
        }
    })



    return (
        <group ref={groupRef} dispose={null}>
            {/* HEAD GROUP */}
            <group position={[0, 2.15, 0]}> {/* 1.45 + 0.7 */}
                {/* Face/Head Base */}
                <mesh castShadow>
                    <boxGeometry args={[0.6, 0.6, 0.6]} /> {/* Box Head to match style */}
                    <meshStandardMaterial color={skinColor} />
                    <Decal
                        position={[0, 0, 0.3]} // Front of the face
                        rotation={[0, 0, 0]}
                        scale={[0.5, 0.5, 0.5]}
                        map={faceMap}
                        depthTest={true}
                        depthWrite={false}
                    />
                </mesh>
                {/* Hair - Simple Wig Block */}
                <mesh position={[0, 0.1, 0]} castShadow>
                    <boxGeometry args={[0.65, 0.5, 0.65]} />
                    <meshStandardMaterial color={hairItem.color || '#552200'} />
                </mesh>
            </group>

            {/* TORSO / TOP - Boxy Style */}
            <mesh position={[0, 1.45, 0]} castShadow material={materials}> {/* 0.75 + 0.7 */}
                <boxGeometry args={[0.6, 0.8, 0.4]} /> {/* W, H, D */}
            </mesh>


            {/* SKIRT (Conditional) */}
            {isSkirt && (
                <mesh position={[0, 1.05, 0]} castShadow material={skirtMaterial}> {/* 0.35 + 0.7 */}
                    <coneGeometry args={[0.5, 0.5, 32]} />
                </mesh>
            )}

            {/* ARMS - Moved out to avoid clipping */}
            <group position={[-0.45, 1.7, 0]} ref={leftArmRef}> {/* 1.0 + 0.7 */}
                <mesh position={[0, -0.3, 0]}>
                    <boxGeometry args={[0.15, 0.7, 0.15]} /> {/* Box Arms */}
                    <meshStandardMaterial color={skinColor} />
                </mesh>
            </group>
            <group position={[0.45, 1.7, 0]} ref={rightArmRef}> {/* 1.0 + 0.7 */}
                <mesh position={[0, -0.3, 0]}>
                    <boxGeometry args={[0.15, 0.7, 0.15]} />
                    <meshStandardMaterial color={skinColor} />
                </mesh>
            </group>

            {/* LEGS / PANTS */}
            <group position={[-0.2, 0.9, 0]} ref={leftLegRef}> {/* 0.2 + 0.7 */}
                <mesh position={[0, -0.4, 0]} material={legMaterial}>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                </mesh>
                {/* Shoe */}
                <mesh position={[0, -0.85, 0.1]}>
                    <boxGeometry args={[0.15, 0.1, 0.3]} />
                    <meshStandardMaterial color={shoeItem.color || '#000000'} />
                </mesh>
            </group>
            <group position={[0.2, 0.9, 0]} ref={rightLegRef}> {/* 0.2 + 0.7 */}
                <mesh position={[0, -0.4, 0]} material={legMaterial}>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                </mesh>
                {/* Shoe */}
                <mesh position={[0, -0.85, 0.1]}>
                    <boxGeometry args={[0.15, 0.1, 0.3]} />
                    <meshStandardMaterial color={shoeItem.color || '#000000'} />
                </mesh>
            </group>
        </group>
    )
}

