import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Trail, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

interface TrophyProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}

function Trophy({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#FDB813' }: TrophyProps) {
  const ref = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const cupRef = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);

  // Enhanced particles with more dynamic properties
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 150; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 2.5;
      const y = (Math.random() - 0.5) * 4;
      temp.push({
        position: [r * Math.cos(t), y, r * Math.sin(t)],
        scale: Math.random() * 0.1 + 0.05,
        speed: 0.2 + Math.random() * 0.5
      });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Enhanced trophy animation
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.3;
      ref.current.position.y = Math.sin(t * 0.8) * 0.1;
    }

    // Enhanced cup animation
    if (cupRef.current) {
      cupRef.current.position.y = Math.sin(t * 2) * 0.05 + 0.5;
      cupRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
      cupRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
    }

    // Enhanced base animation
    if (baseRef.current) {
      baseRef.current.rotation.y = t * 0.5 + Math.sin(t) * 0.1;
      baseRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.05);
    }

    // Enhanced particles animation
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        const data = particles[i];
        const mesh = particle as THREE.Mesh;
        mesh.position.x += Math.sin(t * data.speed + i) * 0.01;
        mesh.position.y += Math.cos(t * data.speed + i) * 0.01;
        mesh.position.z += Math.sin(t * data.speed * 0.5 + i) * 0.01;
        mesh.scale.setScalar(data.scale * (1 + Math.sin(t * 2 + i) * 0.3));
      });
    }

    // Enhanced glow animation
    if (glowRef.current) {
      const pulseScale = 1.2 + Math.sin(t * 2) * 0.2;
      glowRef.current.scale.setScalar(pulseScale);
      if (glowRef.current.material instanceof THREE.Material) {
        glowRef.current.material.opacity = 0.3 + Math.sin(t * 2) * 0.15;
      }
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group ref={ref} position={position} rotation={rotation}>
        {/* Enhanced Base */}
        <group ref={baseRef}>
          <mesh position={[0, -1, 0]}>
            <cylinderGeometry args={[0.6, 0.8, 0.2, 32]} />
            <meshStandardMaterial
              color={color}
              metalness={0.9}
              roughness={0.1}
              envMapIntensity={2}
            />
          </mesh>
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.4, 0.6, 0.2, 32]} />
            <meshStandardMaterial
              color={color}
              metalness={0.9}
              roughness={0.1}
              envMapIntensity={2}
            />
          </mesh>
        </group>

        {/* Enhanced Stem */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1.2, 16]} />
          <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>

        {/* Enhanced Cup */}
        <group ref={cupRef}>
          <Trail
            width={2}
            length={8}
            color={color}
            attenuation={(t) => t * t}
          >
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.5, 0.3, 0.8, 32]} />
              <meshStandardMaterial
                color={color}
                metalness={0.9}
                roughness={0.1}
                envMapIntensity={2}
              />
            </mesh>
          </Trail>

          {/* Enhanced Handles */}
          {[-0.6, 0.6].map((x, i) => (
            <mesh key={i} position={[x, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.2, 0.05, 16, 32, Math.PI]} />
              <meshStandardMaterial
                color={color}
                metalness={0.9}
                roughness={0.1}
                envMapIntensity={2}
              />
            </mesh>
          ))}
        </group>

        {/* Enhanced Glow */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Enhanced Particles */}
        <group ref={particlesRef}>
          {particles.map((particle, i) => (
            <mesh key={i} position={particle.position as [number, number, number]}>
              <sphereGeometry args={[particle.scale, 16, 16]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

function Scene() {
  const trophies = [
    { color: '#FDB813', position: [-2.5, 0, 0] },
    { color: '#10B981', position: [0, 0.5, 0] },
    { color: '#3B82F6', position: [2.5, 0, 0] },
  ];

  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
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

      {trophies.map((trophy, index) => (
        <Trophy
          key={index}
          position={trophy.position as [number, number, number]}
          rotation={[0, Math.PI * 0.25, 0]}
          color={trophy.color}
        />
      ))}

      <Environment preset="sunset" />
    </Canvas>
  );
}

export default function Awards3D() {
  return (
    <div className="awards-3d-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <Scene />
      </motion.div>
    </div>
  );
}