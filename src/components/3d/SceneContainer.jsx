import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { RunwayScene } from './RunwayScene'

export const SceneContainer = () => {
    return (
        <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-inner border-4 border-brand-purple bg-gradient-to-b from-purple-900 to-black">
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
                <Suspense fallback={null}>
                    <color attach="background" args={['#2a0a2a']} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />

                    <RunwayScene />

                    <Environment preset="city" />
                    {/* <OrbitControls /> Disable controls for gameplay, maybe enable for debug */}
                </Suspense>
            </Canvas>
        </div>
    )
}
