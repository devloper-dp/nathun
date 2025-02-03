import { ThreeDContainer } from './common/3DContainer';
import { Scene } from './common/Scene';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectTrophyProps {
  position: [number, number, number];
  color: string;
  type: 'residential' | 'commercial' | 'industrial';
  isActive: boolean;
  scale?: number;
}

function ProjectTrophy({ position, color, type, isActive, scale = 1 }: ProjectTrophyProps) {
  const ref = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Group>(null);
  const cupRef = useRef<THREE.Group>(null);
  const detailsRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const starsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !baseRef.current || !cupRef.current || !detailsRef.current || !glowRef.current || !starsRef.current) return;
    const t = clock.getElapsedTime();

    ref.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    cupRef.current.position.y = Math.sin(t * 2) * 0.1;

    if (isActive) {
      glowRef.current.intensity = 2 + Math.sin(t * 2) * 0.5;
    }

    starsRef.current.rotation.y = t * 0.5;
    starsRef.current.children.forEach((star, i) => {
      star.position.y = Math.sin(t * 2 + i * 0.5) * 0.1;
    });

    detailsRef.current.children.forEach((detail, i) => {
      detail.rotation.z = Math.sin(t * 1.5 + i * 0.3) * 0.1;
    });
  });

  const getTrophyConfig = () => {
    switch (type) {
      case 'residential':
        return {
          baseSize: [1.2, 0.3, 1.2],
          cupSize: [0.8, 1, 16],
          detailCount: 3,
          starCount: 5,
        };
      case 'commercial':
        return {
          baseSize: [1.4, 0.4, 1.4],
          cupSize: [1, 1.2, 20],
          detailCount: 4,
          starCount: 6,
        };
      case 'industrial':
        return {
          baseSize: [1.6, 0.5, 1.6],
          cupSize: [1.2, 1.4, 24],
          detailCount: 5,
          starCount: 7,
        };
    }
  };

  const config = getTrophyConfig();

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={ref} position={position} scale={scale}>
        {/* Base Platform */}
        <group ref={baseRef}>
          <mesh receiveShadow>
            <cylinderGeometry args={[config.baseSize[0], config.baseSize[0] * 1.2, config.baseSize[1], 8]} />
            <meshStandardMaterial color="#1A202C" metalness={0.8} roughness={0.2} />
          </mesh>

          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.4, 0.6, 0.4, 8]} />
            <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
          </mesh>

          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.2, 1.6, 8]} />
            <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
          </mesh>
        </group>

        <group ref={cupRef} position={[0, 2.5, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={config.cupSize} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isActive ? 1.2 : 0.3}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          <group ref={detailsRef}>
            {Array.from({ length: config.detailCount }).map((_, i) => (
              <mesh key={i} position={[0, i * 0.2 - 0.3, 0]} castShadow>
                <torusGeometry args={[config.cupSize[0] - i * 0.1, 0.05, 16, 32]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.5}
                />
              </mesh>
            ))}
          </group>
        </group>

        <pointLight
          ref={glowRef}
          color={color}
          intensity={isActive ? 2 : 0.5}
          distance={5}
          decay={2}
          position={[0, 2.5, 0]}
        />

        <group ref={starsRef} position={[0, 2.5, 0]}>
          {Array.from({ length: config.starCount }).map((_, i) => {
            const angle = (i / config.starCount) * Math.PI * 2;
            return (
              <group
                key={i}
                position={[
                  Math.cos(angle) * 1.2,
                  Math.sin(angle) * 0.3,
                  Math.sin(angle) * 1.2,
                ]}
              >
                <mesh castShadow>
                  <boxGeometry args={[0.2, 0.2, 0.2]} />
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </mesh>
                {isActive && (
                  <pointLight color={color} intensity={0.5} distance={2} decay={2} />
                )}
              </group>
            );
          })}
        </group>

        <mesh position={[0, 0.2, 1.2]} castShadow>
          <boxGeometry args={[1.2, 0.3, 0.1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 1 : 0.3}
          />
        </mesh>

        {isActive && (
          <pointLight
            position={[0, 0.2, 0]}
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

export default function Projects3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width } = entry.contentRect;
        setScale(width / 600); // Dynamically scale based on a base width of 600px
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerHeight = 200; // The max height of the container
  const trophyHeight = 1; // The height of each trophy (adjust this based on your design)

  const projects = [
    { position: [-3, trophyHeight / 2, 0], color: '#FDB813', type: 'residential' as const },
    { position: [0, trophyHeight / 2, 0], color: '#10B981', type: 'commercial' as const, isActive: true },
    { position: [3, trophyHeight / 2, 0], color: '#3B82F6', type: 'industrial' as const },
  ];

  // Adjust the y-coordinate of each trophy based on the maximum height
  const adjustedProjects = projects.map(project => ({
    ...project,
    position: [project.position[0], Math.min(project.position[1] * scale, containerHeight - trophyHeight / 2), project.position[2]],
  }));

  const adjustedScale = Math.min(scale, 0.8); // Set a maximum scale to fit the trophies

  return (
    <ThreeDContainer
      minHeight="500px"
      maxHeight="700px"
      scale={adjustedScale}
      className="projects-3d"
      ref={containerRef}
    >
      <Scene>
        {adjustedProjects.map((project, index) => (
          <ProjectTrophy
            key={index}
            position={project.position.map((pos) => pos * adjustedScale) as [number, number, number]}
            color={project.color}
            type={project.type}
            isActive={project.isActive ?? false}
            scale={adjustedScale}
          />
        ))}
      </Scene>
    </ThreeDContainer>
  );
}
