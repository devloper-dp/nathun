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
  const iconsRef = useRef<THREE.Group>(null);
  const beamsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !coreRef.current || !ringsRef.current || !iconsRef.current || !beamsRef.current) return;
    const t = clock.getElapsedTime();
    
    // Base rotation
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    
    // Core pulsing
    if (isActive) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 
        1.5 + Math.sin(t * 2) * 0.5;
    }
    
    // Rings rotation
    ringsRef.current.rotation.y = t * 0.5;
    ringsRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;

    // Icons orbit
    iconsRef.current.rotation.y = t * 0.2;

    // Beams movement
    beamsRef.current.children.forEach((beam, i) => {
      beam.position.y = Math.sin(t * 1.5 + i * 0.5) * 0.2;
      beam.rotation.z = Math.sin(t * 0.5 + i * 0.3) * 0.1;
    });
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        {/* Base Platform */}
        <mesh receiveShadow>
          <cylinderGeometry args={[2, 2.2, 0.3, 8]} />
          <meshStandardMaterial color="#1A202C" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Central Column */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.4, 3, 16]} />
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Core Sphere */}
        <mesh ref={coreRef} position={[0, 3, 0]} castShadow>
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

        {/* Orbiting Rings */}
        <group ref={ringsRef} position={[0, 3, 0]}>
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

        {/* Feature Icons */}
        <group ref={iconsRef} position={[0, 3, 0]}>
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <group
                key={i}
                position={[
                  Math.cos(angle) * 1.8,
                  Math.sin(angle) * 0.5,
                  Math.sin(angle) * 1.8
                ]}
              >
                <mesh castShadow>
                  <boxGeometry args={[0.4, 0.4, 0.4]} />
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </mesh>
                {isActive && (
                  <pointLight
                    color={color}
                    intensity={0.5}
                    distance={2}
                    decay={2}
                  />
                )}
              </group>
            );
          })}
        </group>

        {/* Energy Beams */}
        <group ref={beamsRef}>
          {isActive && Array.from({ length: 4 }).map((_, i) => {
            const angle = (i / 4) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * 1.2,
                  2,
                  Math.sin(angle) * 1.2
                ]}
                rotation={[0, angle, Math.PI / 4]}
              >
                <cylinderGeometry args={[0.05, 0.15, 1.5, 8]} />
                <meshStandardMaterial
                  color={color}
                  transparent
                  opacity={0.3}
                  emissive={color}
                  emissiveIntensity={0.5}
                />
              </mesh>
            );
          })}
        </group>

        {/* Base Glow */}
        {isActive && (
          <pointLight
            position={[0, 0.5, 0]}
            color={color}
            intensity={1}
            distance={3}
            decay={2}
          />
        )}
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