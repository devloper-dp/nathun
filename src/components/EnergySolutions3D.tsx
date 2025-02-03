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
  const panelsRef = useRef<THREE.Group>(null);
  const beamsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !coreRef.current || !flowRef.current || !panelsRef.current || !beamsRef.current) return;
    const t = clock.getElapsedTime();
    
    // Base rotation
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

    // Solar panels tracking
    panelsRef.current.rotation.x = Math.sin(t * 0.5) * 0.1 + 0.3;

    // Energy beams movement
    beamsRef.current.children.forEach((beam, i) => {
      beam.position.y = Math.sin(t * 1.5 + i * 0.5) * 0.2;
      beam.rotation.z = Math.sin(t * 0.5 + i * 0.3) * 0.1;
    });
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={ref} position={position}>
        {/* Base Platform */}
        <mesh receiveShadow>
          <cylinderGeometry args={[2, 2.2, 0.3, 8]} />
          <meshStandardMaterial color="#1A202C" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Energy Core */}
        <mesh ref={coreRef} position={[0, 2, 0]} castShadow>
          <sphereGeometry args={[1, 32, 32]} />
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

        {/* Energy Flow System */}
        <group ref={flowRef} position={[0, 2, 0]}>
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh
              key={i}
              rotation={[Math.PI / 4 * i, Math.PI / 3 * i, 0]}
              castShadow
            >
              <torusGeometry args={[1.5 + i * 0.2, 0.05, 16, 32]} />
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

        {/* Solar Panel Array */}
        <group ref={panelsRef} position={[0, 3.5, 0]}>
          {Array.from({ length: 2 }).map((_, row) =>
            Array.from({ length: 3 }).map((_, col) => (
              <mesh
                key={`panel-${row}-${col}`}
                position={[
                  (col - 1) * 1.2,
                  row * 0.1,
                  row * 0.5
                ]}
                rotation={[0.3, 0, 0]}
                castShadow
              >
                <boxGeometry args={[1, 0.05, 0.8]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.5}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
            ))
          )}
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