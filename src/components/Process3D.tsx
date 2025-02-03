import { ThreeDContainer } from './common/3DContainer';
import { Scene } from './common/Scene';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function ProcessStep({ position, color, step, isActive }: any) {
  const ref = useRef<THREE.Group>(null);
  const platformRef = useRef<THREE.Group>(null);
  const hologramRef = useRef<THREE.Group>(null);
  const connectorsRef = useRef<THREE.Group>(null);
  const indicatorsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !platformRef.current || !hologramRef.current || !connectorsRef.current || !indicatorsRef.current) return;
    const t = clock.getElapsedTime();
    
    // Smooth base rotation
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    
    // Platform effects
    platformRef.current.children.forEach((platform, i) => {
      if (platform instanceof THREE.Mesh) {
        (platform.material as THREE.MeshStandardMaterial).emissiveIntensity = 
          0.5 + Math.sin(t * 1.5 + i * 0.2) * 0.3;
      }
    });
    
    // Hologram animation
    hologramRef.current.rotation.y = t * 0.5;
    if (isActive) {
      hologramRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
    }

    // Connectors flow animation
    connectorsRef.current.children.forEach((connector, i) => {
      connector.position.y = Math.sin(t * 2 + i * 0.5) * 0.1;
      if (connector instanceof THREE.Mesh) {
        (connector.material as THREE.MeshStandardMaterial).opacity = 
          0.5 + Math.sin(t * 2 + i * 0.3) * 0.3;
      }
    });

    // Step indicators animation
    indicatorsRef.current.children.forEach((indicator, i) => {
      indicator.rotation.z = Math.sin(t * 1.5 + i * 0.3) * 0.1;
      if (indicator instanceof THREE.Mesh) {
        (indicator.material as THREE.MeshStandardMaterial).emissiveIntensity = 
          0.8 + Math.sin(t * 2 + i * 0.5) * 0.2;
      }
    });
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={ref} position={position}>
        {/* Enhanced Platform */}
        <group ref={platformRef}>
          <mesh receiveShadow>
            <cylinderGeometry args={[1.8, 2, 0.4, 16]} />
            <meshStandardMaterial
              color={color}
              metalness={0.6}
              roughness={0.4}
              emissive={color}
              emissiveIntensity={isActive ? 0.5 : 0.2}
              envMapIntensity={1}
            />
          </mesh>

          {/* Platform Details */}
          {Array.from({ length: 4 }).map((_, i) => {
            const angle = (i / 4) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * 1.9,
                  0.2,
                  Math.sin(angle) * 1.9
                ]}
                rotation={[0, angle, 0]}
                receiveShadow
              >
                <boxGeometry args={[0.4, 0.1, 0.1]} />
                <meshStandardMaterial
                  color={color}
                  metalness={0.8}
                  roughness={0.2}
                  emissive={color}
                  emissiveIntensity={0.3}
                />
              </mesh>
            );
          })}
        </group>

        {/* Central Structure */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.3, 3, 16]} />
          <meshStandardMaterial
            color={color}
            metalness={0.7}
            roughness={0.3}
            envMapIntensity={1}
          />
        </mesh>

        {/* Holographic Display */}
        <group ref={hologramRef} position={[0, 2.5, 0]}>
          {/* Main Display */}
          <mesh castShadow>
            <boxGeometry args={[2, 1.5, 0.05]} />
            <meshStandardMaterial
              color={color}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.7}
              emissive={color}
              emissiveIntensity={isActive ? 1 : 0.3}
            />
          </mesh>

          {/* Display Content */}
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh
              key={i}
              position={[0, -0.4 + i * 0.4, 0.1]}
              castShadow
            >
              <boxGeometry args={[1.5, 0.1, 0.02]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.9}
                emissive={color}
                emissiveIntensity={0.8}
              />
            </mesh>
          ))}
        </group>

        {/* Process Step Indicators */}
        <group ref={indicatorsRef}>
          {Array.from({ length: 4 }).map((_, i) => {
            const angle = (i / 4) * Math.PI * 2;
            return (
              <group
                key={i}
                position={[
                  Math.cos(angle) * 1.2,
                  1.5,
                  Math.sin(angle) * 1.2
                ]}
              >
                <mesh castShadow>
                  <sphereGeometry args={[0.15, 16, 16]} />
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isActive ? 1 : 0.3}
                    metalness={0.7}
                    roughness={0.3}
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

        {/* Connecting Lines */}
        <group ref={connectorsRef}>
          {position[0] !== 6 && Array.from({ length: 5 }).map((_, i) => (
            <mesh 
              key={i} 
              position={[2 + i * 0.5, 1.5, 0]}
              castShadow
            >
              <boxGeometry args={[0.3, 0.05, 0.05]} />
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

        {/* Step Number Display */}
        <mesh position={[0, 0.3, 1.9]} castShadow>
          <boxGeometry args={[1, 0.4, 0.1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 1 : 0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Enhanced Lighting */}
        {isActive && (
          <>
            <pointLight
              position={[0, 2.5, 0]}
              color={color}
              intensity={1.5}
              distance={4}
              decay={2}
            />
            <pointLight
              position={[0, 0.2, 0]}
              color={color}
              intensity={1}
              distance={3}
              decay={2}
            />
          </>
        )}
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