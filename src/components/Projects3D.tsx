import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, PointMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

interface SolarPanelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  type: 'residential' | 'commercial' | 'industrial';
  isActive: boolean;
  onClick: () => void;
}

function SolarPanel({ position = [0, 0, 0], rotation = [0, 0, 0], type = 'residential', isActive, onClick }: SolarPanelProps) {
  const ref = useRef<THREE.Group | null>(null);
  const glowRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Group | null>(null);

  const panelConfig = {
    residential: {
      panels: { rows: 2, cols: 3, size: 0.6 },
      height: 0.8,
      angle: -0.3,
      color: '#FDB813',
      label: 'Residential'
    },
    commercial: {
      panels: { rows: 3, cols: 4, size: 0.5 },
      height: 1.2,
      angle: -0.4,
      color: '#3B82F6',
      label: 'Commercial'
    },
    industrial: {
      panels: { rows: 4, cols: 5, size: 0.4 },
      height: 1.5,
      angle: -0.5,
      color: '#10B981',
      label: 'Industrial'
    }
  };

  const config = panelConfig[type];

  // Enhanced particles with more dynamic properties
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 2 + Math.random() * 3;
      const x = r * Math.cos(t);
      const y = r * Math.sin(t);
      const z = (Math.random() - 0.5) * 2;
      temp.push({ x, y, z, speed: 0.2 + Math.random() * 0.5 });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Enhanced panel animation
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      ref.current.position.y = Math.sin(t * 0.8) * 0.1;
      
      // Add hover effect when active
      if (isActive) {
        ref.current.position.y += Math.sin(t * 2) * 0.1;
        ref.current.scale.setScalar(1.1 + Math.sin(t * 2) * 0.05);
      } else {
        ref.current.scale.setScalar(1);
      }
    }

    // Enhanced glow animation
    if (glowRef.current) {
      const glowIntensity = isActive ? 0.4 : 0.2;
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
      if ('opacity' in glowRef.current.material) {
        glowRef.current.material.opacity = glowIntensity + Math.sin(t * 2) * 0.1;
      }
    }

    // Enhanced particles animation
    if (particlesRef.current) {
      particles.forEach((p, i) => {
        const mesh = particlesRef.current?.children[i];
        if (mesh) {
          mesh.position.x = p.x + Math.sin(t * p.speed + i) * 0.2;
          mesh.position.y = p.y + Math.cos(t * p.speed + i) * 0.2;
          mesh.position.z = p.z + Math.sin(t * p.speed + i) * 0.2;
          mesh.scale.setScalar(isActive ? (0.5 + Math.sin(t * 2 + i) * 0.3) : 0.3);
        }
      });
    }
  });

  return (
    <group onClick={onClick} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'default'}>
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.5}
      >
        <group ref={ref} position={position} rotation={[config.angle, rotation[1], rotation[2]]}>
          {/* Label */}
          <Text
            position={[0, config.height + 0.5, 0]}
            fontSize={0.3}
            color={config.color}
            anchorX="center"
            anchorY="middle"
          >
            {config.label}
          </Text>

          {/* Base Structure */}
          <mesh position={[0, -config.height / 2, 0]}>
            <cylinderGeometry args={[0.1, 0.2, config.height, 32]} />
            <meshStandardMaterial
              color="#95A5A6"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Panel Array */}
          <group>
            {Array.from({ length: config.panels.rows }).map((_, row) =>
              Array.from({ length: config.panels.cols }).map((_, col) => (
                <group
                  key={`${row}-${col}`}
                  position={[
                    (col - (config.panels.cols - 1) / 2) * config.panels.size,
                    0,
                    (row - (config.panels.rows - 1) / 2) * config.panels.size
                  ]}
                >
                  <mesh>
                    <boxGeometry
                      args={[config.panels.size * 0.9, 0.05, config.panels.size * 0.9]}
                    />
                    <MeshDistortMaterial
                      color={config.color}
                      metalness={0.9}
                      roughness={0.1}
                      distort={isActive ? 0.3 : 0.1}
                      speed={2}
                      envMapIntensity={1}
                    />
                  </mesh>
                </group>
              ))
            )}
          </group>

          {/* Enhanced Glow Effect */}
          <mesh ref={glowRef}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshBasicMaterial
              color={config.color}
              transparent
              opacity={0.2}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Enhanced Particle System */}
          <group ref={particlesRef}>
            {particles.map((p, i) => (
              <mesh key={i} position={[p.x, p.y, p.z]}>
                <sphereGeometry args={[0.02, 16, 16]} />
                <meshStandardMaterial
                  color={config.color}
                  emissive={config.color}
                  emissiveIntensity={isActive ? 2 : 1}
                  transparent
                  opacity={0.8}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </mesh>
            ))}
          </group>
        </group>
      </Float>
    </group>
  );
}

interface SceneProps {
  activeType: 'residential' | 'commercial' | 'industrial' | 'all';
  onTypeSelect: (type: 'residential' | 'commercial' | 'industrial') => void;
}

function Scene({ activeType, onTypeSelect }: SceneProps) {
  const types: ('residential' | 'commercial' | 'industrial')[] = ['residential', 'commercial', 'industrial'];
  
  return (
    <Canvas camera={{ position: [4, 3, 4], fov: 50 }} dpr={[1, 2]}>
      <color attach="background" args={['#111827']} />

      <ambientLight intensity={0.5} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />

      {types.map((type, index) => (
        <SolarPanel
          key={type}
          type={type}
          position={[(index - 1) * 4, 0, 0]}
          rotation={[0, Math.PI * 0.25, 0]}
          isActive={activeType === 'all' || activeType === type}
          onClick={() => onTypeSelect(type)}
        />
      ))}

      <Environment preset="sunset" />
    </Canvas>
  );
}

interface Projects3DProps {
  activeType?: 'residential' | 'commercial' | 'industrial' | 'all';
  onTypeSelect?: (type: 'residential' | 'commercial' | 'industrial') => void;
}

export default function Projects3D({ activeType = 'all', onTypeSelect = () => {} }: Projects3DProps) {
  return (
    <div className="h-96 my-12 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <Scene activeType={activeType} onTypeSelect={onTypeSelect} />
      </motion.div>
    </div>
  );
}