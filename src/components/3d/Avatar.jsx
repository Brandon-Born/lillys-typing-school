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
    // We strictly map the texture to the front using Decal or Box Mapping
    // For now, simpler approach: Box Geometry with texture on Front Face only?
    // Actually, using Decal for the "Clothing Item" is the safest way to avoid wrapping distortion.
    // The "Fabric" base can be the color.

    // HOWEVER, the user wants the "Denim Jacket" which is a full garment. 
    // The "Box Mapping" approach:
    // BoxGeometry has 6 faces. Material index 4 is usually Front (or 0/1 depending on ThreeJS version and UVs).
    // Let's use a standard Box and apply material array.

    // Better for this style:
    // Base Torso Mesh (Color of the item)
    // + Decal for the graphic/texture on the front.

    // BUT the Denim Jacket texture was full body.
    // Let's try the BoxGeometry with the texture applied to all sides but with `repeat` set to avoid stretching?
    // No, wrapping a 2D front-view image around a Box also looks weird on sides.

    // Solution:
    // 1. Torso is a Box.
    // 2. Texture is applied to the FRONT face only (Index 4 in standard Box UVs?).
    // 3. Other faces get the dominant color.

    const materials = useMemo(() => {
        const matColor = new THREE.MeshStandardMaterial({ color: topItem.color || '#ffffff' })
        const matTexture = new THREE.MeshStandardMaterial({
            map: topTexture,
            color: 'white',
            transparent: true // In case we fix transparency later
        })

        // BoxGeometry materials order: right, left, top, bottom, front, back
        // We want the texture on FRONT (index 4) and maybe BACK (index 5) if we had a back texture.
        // For now, Front = texture, others = color.
        return [matColor, matColor, matColor, matColor, matTexture, matColor]
    }, [topItem.color, topTexture])

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

    // Helper: Determine if bottom is skirt or pants
    // For now, only 'neon-skirt' is explicitly a skirt. We can add a property to items later.
    const isSkirt = bottomItem.id?.includes('skirt')

    // Skin Color
    const skinColor = "#ffccaa"

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
                <mesh position={[0, 1.05, 0]} castShadow> {/* 0.35 + 0.7 */}
                    <coneGeometry args={[0.5, 0.5, 32]} />
                    <meshStandardMaterial color={bottomItem.color || '#ff00ff'} />
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
                <mesh position={[0, -0.4, 0]}>
                    <capsuleGeometry args={[0.1, 0.8, 4, 8]} />
                    {/* If skirt, legs are skin (tights?). If pants, legs are pants color. */}
                    <meshStandardMaterial color={isSkirt ? skinColor : (bottomItem.color || '#3366cc')} />
                </mesh>
                {/* Shoe */}
                <mesh position={[0, -0.85, 0.1]}>
                    <boxGeometry args={[0.15, 0.1, 0.3]} />
                    <meshStandardMaterial color={shoeItem.color || '#000000'} />
                </mesh>
            </group>
            <group position={[0.2, 0.9, 0]} ref={rightLegRef}> {/* 0.2 + 0.7 */}
                <mesh position={[0, -0.4, 0]}>
                    <capsuleGeometry args={[0.1, 0.8, 4, 8]} />
                    <meshStandardMaterial color={isSkirt ? skinColor : (bottomItem.color || '#3366cc')} />
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

