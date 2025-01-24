import { ThreeDContainer } from './common/3DContainer';
import { Scene } from './common/Scene';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function ProcessStep({ position, color, step, isActive }: any) {
  const ref = useRef<THREE.Group>(null);
  const displayRef = useRef<THREE.Mesh>(null);
  const connectionRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !displayRef.current || !connectionRef.current) return;
    const t = clock.getElapsedTime();
    
    // Smooth base rotation
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    
    // Display panel animation
    if (isActive) {
      displayRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
      (displayRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 
        1 + Math.sin(t * 2) * 0.3;
    }
    
    // Connection flow animation
    connectionRef.current.children.forEach((connection, i) => {
      (connection as THREE.Mesh).position.x = Math.sin(t * 2 + i) * 0.1;
    });
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={ref} position={position}>
        {/* Base Platform */}
        <mesh receiveShadow>
          <cylinderGeometry args={[1.2, 1.4, 0.2, 8]} />
          <meshStandardMaterial color="#1A202C" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Central Pillar */}
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.3, 2, 16]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Step Display */}
        <mesh ref={displayRef} position={[0, 2, 0]} castShadow>
          <boxGeometry args={[1, 1, 0.2]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 0.8 : 0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Connection Lines */}
        {position[0] !== 6 && (
          <group ref={connectionRef} position={[1, 1, 0]}>
            {Array.from({ length: 3 }).map((_, i) => (
              <mesh key={i} position={[i * 0.8, 0, 0]}>
                <boxGeometry args={[0.6, 0.05, 0.05]} />
                <meshStandardMaterial
                  color={color}
                  transparent
                  opacity={0.5}
                  emissive={color}
                  emissiveIntensity={0.3}
                />
              </mesh>
            ))}
          </group>
        )}

        {/* Step Indicators */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 0.8,
                1.5,
                Math.sin(angle) * 0.8
              ]}
              castShadow
            >
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

export default function Process3D() {
  const steps = [
    { position: [-6, 0, 0], color: '#FDB813', step: '01' },
    { position: [-2, 0, 0], color: '#10B981', step: '02', isActive: true },
    { position: [2, 0, 0], color: '#3B82F6', step: '03' },
    { position: [6, 0, 0], color: '#8B5CF6', step: '04' }
  ];

  return (
    <ThreeDContainer 
      minHeight="600px"
      maxHeight="800px"
      scale={0.9}
      className="process-3d"
    >
      <Scene>
        {steps.map((step, index) => (
          <ProcessStep
            key={index}
            position={step.position as [number, number, number]}
            color={step.color}
            step={step.step}
            isActive={step.isActive}
          />
        ))}
      </Scene>
    </ThreeDContainer>
  );
}