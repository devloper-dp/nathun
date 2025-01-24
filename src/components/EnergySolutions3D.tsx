import { ThreeDContainer } from './common/3DContainer';
import { Scene } from './common/Scene';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function EnergySolutionModel({ position, color, isActive }: any) {
  const ref = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const flowRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !coreRef.current || !flowRef.current) return;
    const t = clock.getElapsedTime();
    
    // Smooth base rotation
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    
    // Energy core pulsing
    if (isActive) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 
        1.5 + Math.sin(t * 2) * 0.5;
    }
    
    // Energy flow rotation
    flowRef.current.rotation.y = t * 0.5;
    flowRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={ref} position={position}>
        {/* Base Platform */}
        <mesh receiveShadow>
          <cylinderGeometry args={[1.5, 1.8, 0.2, 8]} />
          <meshStandardMaterial color="#1A202C" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Energy Core */}
        <mesh ref={coreRef} position={[0, 1.5, 0]} castShadow>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 1.5 : 0.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Energy Flow Rings */}
        <group ref={flowRef} position={[0, 1.5, 0]}>
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh
              key={i}
              rotation={[Math.PI / 4 * i, Math.PI / 3 * i, 0]}
              castShadow
            >
              <torusGeometry args={[1.2 + i * 0.2, 0.05, 16, 32]} />
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

        {/* Energy Collectors */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          return (
            <group
              key={i}
              position={[
                Math.cos(angle) * 1.2,
                0.5,
                Math.sin(angle) * 1.2
              ]}
            >
              <mesh castShadow>
                <cylinderGeometry args={[0.2, 0.3, 1, 8]} />
                <meshStandardMaterial
                  color={color}
                  metalness={0.7}
                  roughness={0.3}
                />
              </mesh>
              {isActive && (
                <mesh position={[0, 0.8, 0]}>
                  <sphereGeometry args={[0.15, 16, 16]} />
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1}
                    transparent
                    opacity={0.8}
                  />
                </mesh>
              )}
            </group>
          );
        })}
      </group>
    </Float>
  );
}

export default function EnergySolutions3D() {
  const solutions = [
    { position: [-4, 0, 0], color: '#FDB813' },
    { position: [0, 0, 0], color: '#10B981', isActive: true },
    { position: [4, 0, 0], color: '#3B82F6' }
  ];

  return (
    <ThreeDContainer 
      minHeight="600px"
      maxHeight="800px"
      scale={1}
      className="energy-solutions-3d"
    >
      <Scene>
        {solutions.map((solution, index) => (
          <EnergySolutionModel
            key={index}
            position={solution.position as [number, number, number]}
            color={solution.color}
            isActive={solution.isActive}
          />
        ))}
      </Scene>
    </ThreeDContainer>
  );
}