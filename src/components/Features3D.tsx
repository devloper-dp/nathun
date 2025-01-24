import { ThreeDContainer } from './common/3DContainer';
import { Scene } from './common/Scene';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FeatureModel({ position, color, isActive }: any) {
  const ref = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !coreRef.current || !ringsRef.current) return;
    const t = clock.getElapsedTime();
    
    // Smooth base rotation
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    
    // Core pulsing effect
    if (isActive) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 
        1 + Math.sin(t * 2) * 0.3;
    }
    
    // Rotating rings
    ringsRef.current.rotation.y = t * 0.5;
    ringsRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        {/* Base Platform */}
        <mesh receiveShadow>
          <cylinderGeometry args={[1.5, 1.8, 0.2, 8]} />
          <meshStandardMaterial color="#1A202C" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Central Core */}
        <mesh ref={coreRef} position={[0, 1.5, 0]} castShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 0.8 : 0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Feature Rings */}
        <group ref={ringsRef} position={[0, 1.5, 0]}>
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh
              key={i}
              rotation={[Math.PI / 4 * i, Math.PI / 3 * i, 0]}
              castShadow
            >
              <torusGeometry args={[1 + i * 0.2, 0.05, 16, 32]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.6}
                emissive={color}
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
        </group>

        {/* Feature Icons */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <group
              key={i}
              position={[
                Math.cos(angle) * 1.2,
                1,
                Math.sin(angle) * 1.2
              ]}
              rotation={[0, -angle, 0]}
            >
              <mesh castShadow>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.5}
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </Float>
  );
}

export default function Features3D() {
  const features = [
    { position: [-4, 0, 0], color: '#FDB813' },
    { position: [0, 0, 0], color: '#10B981', isActive: true },
    { position: [4, 0, 0], color: '#3B82F6' }
  ];

  return (
    <ThreeDContainer 
      minHeight="600px"
      maxHeight="800px"
      scale={1.1}
      className="features-3d"
    >
      <Scene>
        {features.map((feature, index) => (
          <FeatureModel
            key={index}
            position={feature.position as [number, number, number]}
            color={feature.color}
            isActive={feature.isActive}
          />
        ))}
      </Scene>
    </ThreeDContainer>
  );
}