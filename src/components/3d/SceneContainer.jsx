import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { RunwayScene } from './RunwayScene'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

const CameraUpdater = ({ target }) => {
    const { camera } = useThree()
    useEffect(() => {
        camera.lookAt(...target)
        camera.updateProjectionMatrix()
    }, [camera, target])
    return null
}

export const SceneContainer = ({ children, cameraPosition = [0, 2, 5], target = [0, 0, 0], enableControls = false }) => {
    return (
        <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-inner border-4 border-brand-purple bg-gradient-to-b from-purple-900 to-black">
            <Canvas shadows camera={{ position: cameraPosition, fov: 50 }}>
                <Suspense fallback={null}>
                    <color attach="background" args={['#2a0a2a']} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />

                    {children || <RunwayScene />}

                    <CameraUpdater target={target} />

                    <Environment preset="city" />
                    {enableControls && <OrbitControls target={target} />}
                </Suspense>
            </Canvas>
        </div>
    )
}
