import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import LoadingSpinner from './LoadingSpinner';

interface SceneProps {
  children: React.ReactNode;
}

export const Scene: React.FC<SceneProps> = ({ children }) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 2]}
        shadows
      >
        <color attach="background" args={['#1a1a1a']} />
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow
        />
        
        {children}
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
        <Environment preset="city" />
        <fog attach="fog" args={['#1a1a1a', 5, 20]} />
      </Canvas>
    </Suspense>
  );
};