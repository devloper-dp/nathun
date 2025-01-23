import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Trail, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

interface SolarSystemProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  isActive: boolean;
  onClick: () => void;
  label: string;
}

function SolarSystem({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#FDB813', isActive, onClick, label }: SolarSystemProps) {
  const ref = useRef<THREE.Group | null>(null);
  const sunRef = useRef<THREE.Group | null>(null);
  const panelsRef = useRef<THREE.Group | null>(null);
  const orbitsRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Group | null>(null);
  const glowRef = useRef<THREE.Mesh | null>(null);

  // Enhanced particles with more dynamic properties
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 200; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 2 + Math.random() * 3;
      const y = (Math.random() - 0.5) * 4;
      temp.push({
        position: [r * Math.cos(t), y, r * Math.sin(t)],
        scale: Math.random() * 0.1 + 0.05,
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Enhanced system rotation with active state
    if (ref.current) {
      ref.current.rotation.y = t * (isActive ? 0.2 : 0.1);
      ref.current.position.y = Math.sin(t * 0.5) * (isActive ? 0.3 : 0.2);
      ref.current.scale.setScalar(isActive ? 1.1 + Math.sin(t * 0.5) * 0.05 : 1);
    }

    // Enhanced sun animation
    if (sunRef.current) {
      sunRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * (isActive ? 0.15 : 0.1));
      sunRef.current.rotation.z = t * (isActive ? 0.3 : 0.2);
    }

    // Enhanced panels animation
    if (panelsRef.current) {
      panelsRef.current.children.forEach((panel, i) => {
        const angle = t + i * Math.PI * 0.5;
        const radius = isActive ? 3.5 : 3;
        panel.position.x = Math.cos(angle) * radius;
        panel.position.z = Math.sin(angle) * radius;
        panel.rotation.y = -angle;
        panel.rotation.x = Math.sin(t + i) * (isActive ? 0.3 : 0.2);
      });
    }

    // Enhanced orbits animation
    if (orbitsRef.current) {
      orbitsRef.current.rotation.y = t * (isActive ? 0.3 : 0.2);
      orbitsRef.current.rotation.x = Math.sin(t * 0.5) * (isActive ? 0.15 : 0.1);
    }

    // Enhanced particles animation
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        const data = particles[i];
        const mesh = particle as THREE.Mesh;
        const angle = t * data.speed + data.offset;
        mesh.position.x = data.position[0] + Math.cos(angle) * (isActive ? 0.4 : 0.3);
        mesh.position.y = data.position[1] + Math.sin(angle) * (isActive ? 0.4 : 0.3);
        mesh.position.z = data.position[2] + Math.cos(angle * 0.5) * (isActive ? 0.4 : 0.3);
        mesh.scale.setScalar(data.scale * (1 + Math.sin(t * 2 + i) * (isActive ? 0.4 : 0.3)));
      });
    }

    // Enhanced glow animation
    if (glowRef.current) {
      const pulseScale = isActive ? 1.3 + Math.sin(t * 2) * 0.3 : 1.2 + Math.sin(t * 2) * 0.2;
      glowRef.current.scale.setScalar(pulseScale);
      if (glowRef.current.material instanceof THREE.Material) {
        glowRef.current.material.opacity = (isActive ? 0.4 : 0.3) + Math.sin(t * 1.5) * 0.1;
      }
    }
  });

  return (
    <group onClick={onClick} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'default'}>
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      
      <group ref={ref} position={position} rotation={rotation}>
        {/* Enhanced Sun */}
        <group ref={sunRef}>
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isActive ? 3 : 2}
              toneMapped={false}
            />
          </mesh>
          <Trail
            width={2}
            length={8}
            color={color}
            attenuation={(t) => t * t}
          >
            <mesh>
              <sphereGeometry args={[1.2, 32, 32]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.2}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </Trail>
        </group>

        {/* Enhanced Orbiting Panels */}
        <group ref={panelsRef}>
          {[0, 1, 2, 3].map((i) => (
            <group key={i}>
              <mesh>
                <boxGeometry args={[1, 0.1, 1.5]} />
                <meshStandardMaterial
                  color="#2C3E50"
                  metalness={0.8}
                  roughness={0.2}
                  envMapIntensity={isActive ? 3 : 2}
                />
              </mesh>
              <mesh position={[0, 0.06, 0]}>
                <boxGeometry args={[0.9, 0.02, 1.4]} />
                <meshStandardMaterial
                  color="#1a365d"
                  metalness={0.9}
                  roughness={0.1}
                  envMapIntensity={isActive ? 4 : 3}
                />
              </mesh>
            </group>
          ))}
        </group>

        {/* Enhanced Orbital Rings */}
        <group ref={orbitsRef}>
          {[3, 3.5, 4].map((radius, i) => (
            <mesh key={i} rotation={[Math.PI / 2, 0, i * Math.PI / 6]}>
              <torusGeometry args={[radius, 0.02, 16, 100]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={(0.3 - i * 0.1) * (isActive ? 1.2 : 1)}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          ))}
        </group>

        {/* Enhanced Particles */}
        <group ref={particlesRef}>
          {particles.map((particle, i) => (
            <mesh key={i} position={particle.position as [number, number, number]}>
              <sphereGeometry args={[particle.scale, 16, 16]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={isActive ? 0.9 : 0.8}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          ))}
        </group>

        {/* Enhanced Glow */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[4, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

interface SceneProps {
  activeSolution: number;
  onSolutionSelect: (index: number) => void;
}

function Scene({ activeSolution, onSolutionSelect }: SceneProps) {
  const systems = [
    { color: '#FDB813', position: [-4, 0, 0], label: 'Solar Panels' },
    { color: '#10B981', position: [0, 0, 0], label: 'Energy Storage' },
    { color: '#3B82F6', position: [4, 0, 0], label: 'Smart Inverters' },
  ];

  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
      <color attach="background" args={['#111827']} />

      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {systems.map((system, index) => (
        <SolarSystem
          key={index}
          position={system.position as [number, number, number]}
          rotation={[0, Math.PI * 0.25, 0]}
          color={system.color}
          isActive={activeSolution === index}
          onClick={() => onSolutionSelect(index)}
          label={system.label}
        />
      ))}

      <Environment preset="sunset" />
    </Canvas>
  );
}

interface EnergySolutions3DProps {
  activeSolution?: number;
  onSolutionSelect?: (index: number) => void;
  children?: React.ReactNode;
}

export default function EnergySolutions3D({ activeSolution = 0, onSolutionSelect = () => {}, children }: EnergySolutions3DProps) {
  return (
    <div className="energy-solutions-3d-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <Scene activeSolution={activeSolution} onSolutionSelect={onSolutionSelect} />
      </motion.div>
      {children}
    </div>
  );
}