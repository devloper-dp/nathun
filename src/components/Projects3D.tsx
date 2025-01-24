import { ThreeDContainer } from './common/3DContainer';
import { Scene } from './common/Scene';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function ProjectModel({ position, color, isActive }: any) {
  const ref = useRef<THREE.Group>(null);
  const buildingRef = useRef<THREE.Group>(null);
  const solarPanelsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !buildingRef.current || !solarPanelsRef.current) return;
    const t = clock.getElapsedTime();
    
    // Smooth base rotation
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    
    // Building lights animation
    if (isActive) {
      buildingRef.current.children.forEach((window, i) => {
        (window as THREE.Mesh).material.emissiveIntensity = 
          0.5 + Math.sin(t * 2 + i * 0.2) * 0.3;
      });
    }
    
    // Solar panels tracking
    solarPanelsRef.current.rotation.x = Math.sin(t * 0.5) * 0.1 + 0.3;
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={ref} position={position}>
        {/* Building Base */}
        <mesh position={[0, -1, 0]} receiveShadow>
          <boxGeometry args={[3, 0.2, 3]} />
          <meshStandardMaterial color="#1A202C" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Main Building Structure */}
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[2.5, 6, 2.5]} />
          <meshStandardMaterial color="#2D3748" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Building Windows */}
        <group ref={buildingRef} position={[0, 2, 1.26]}>
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => (
              <mesh
                key={`${row}-${col}`}
                position={[
                  (col - 1.5) * 0.5,
                  (row - 2) * 1,
                  0
                ]}
                castShadow
              >
                <boxGeometry args={[0.3, 0.6, 0.1]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={isActive ? 0.5 : 0.2}
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>
            ))
          )}
        </group>

        {/* Roof Solar Array */}
        <group ref={solarPanelsRef} position={[0, 5.1, 0]}>
          {Array.from({ length: 2 }).map((_, row) =>
            Array.from({ length: 2 }).map((_, col) => (
              <mesh
                key={`panel-${row}-${col}`}
                position={[
                  (col - 0.5) * 1,
                  0,
                  (row - 0.5) * 1
                ]}
                rotation={[0.3, 0, 0]}
                castShadow
              >
                <boxGeometry args={[0.8, 0.05, 0.8]} />
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

        {/* Energy Flow Indicators */}
        {isActive && Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 1.5,
                3,
                Math.sin(angle) * 1.5
              ]}
              castShadow
            >
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1}
                transparent
                opacity={0.8}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

export default function Projects3D() {
  const projects = [
    { position: [-4, 0, 0], color: '#FDB813' },
    { position: [0, 0, 0], color: '#10B981', isActive: true },
    { position: [4, 0, 0], color: '#3B82F6' }
  ];

  return (
    <ThreeDContainer 
      minHeight="600px"
      maxHeight="800px"
      scale={1}
      className="projects-3d"
    >
      <Scene>
        {projects.map((project, index) => (
          <ProjectModel
            key={index}
            position={project.position as [number, number, number]}
            color={project.color}
            isActive={project.isActive}
          />
        ))}
      </Scene>
    </ThreeDContainer>
  );
}