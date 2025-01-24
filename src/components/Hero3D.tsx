import { ThreeDContainer } from './common/3DContainer';
import { Scene } from './common/Scene';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function SolarPanel({ position, color, isActive }: any) {
  const ref = useRef<THREE.Group>(null);
  const panelsRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !panelsRef.current || !sunRef.current) return;
    const t = clock.getElapsedTime();
    
    // Smooth panel rotation
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    
    // Panel tilt animation
    panelsRef.current.rotation.x = Math.sin(t * 0.5) * 0.1 + 0.3;
    
    // Sun glow effect
    if (isActive) {
      sunRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
      (sunRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 
        1.5 + Math.sin(t * 2) * 0.5;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        {/* Mounting Structure */}
        <mesh position={[0, -1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.4, 2, 8]} />
          <meshStandardMaterial color="#4A5568" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Main Panel Frame */}
        <group ref={panelsRef} position={[0, 0.5, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4, 0.1, 3]} />
            <meshStandardMaterial color="#2C3E50" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Solar Cells Grid */}
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <mesh
                key={`${row}-${col}`}
                position={[
                  (col - 3.5) * 0.45,
                  0.1,
                  (row - 2.5) * 0.45
                ]}
                castShadow
              >
                <boxGeometry args={[0.4, 0.05, 0.4]} />
                <meshStandardMaterial
                  color={color}
                  metalness={0.8}
                  roughness={0.2}
                  emissive={color}
                  emissiveIntensity={isActive ? 0.5 : 0.2}
                />
              </mesh>
            ))
          )}
        </group>

        {/* Sun Effect */}
        <mesh
          ref={sunRef}
          position={[2, 2, -1]}
          castShadow
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#FDB813"
            emissive="#FDB813"
            emissiveIntensity={2}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Light Beam Effect */}
        {isActive && (
          <mesh position={[1, 1, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.1, 0.3, 2, 8]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.2}
              emissive={color}
              emissiveIntensity={0.5}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}

export default function Hero3D() {
  const panels = [
    { position: [-6, 0, -2], color: '#FDB813' },
    { position: [0, 0, 0], color: '#10B981', isActive: true },
    { position: [6, 0, -2], color: '#3B82F6' }
  ];

  return (
    <ThreeDContainer 
      minHeight="700px"
      maxHeight="900px"
      scale={1.2}
      className="hero-3d"
    >
      <Scene>
        {panels.map((panel, index) => (
          <SolarPanel
            key={index}
            position={panel.position as [number, number, number]}
            color={panel.color}
            isActive={panel.isActive}
          />
        ))}
      </Scene>
    </ThreeDContainer>
  );
}