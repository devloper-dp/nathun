import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Trail, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface SolarPanelProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

interface RayType {
  rotation: [number, number, number];
  scale: number;
  speed: number;
  offset: number;
}

interface ParticleType {
  position: [number, number, number];
  scale: number;
  speed: number;
}

interface PanelType {
  position: [number, number, number];
}

function SolarPanel({ position = [0, 0, 0], rotation = [0, Math.PI * 0.25, 0] }: SolarPanelProps) {
  const ref = useRef<THREE.Group>();
  const glowRef = useRef<THREE.Mesh>();
  const sunRef = useRef<THREE.Group>();
  const raysRef = useRef<THREE.Group>();
  const materialRef = useRef<THREE.MeshStandardMaterial>();
  const panelGroupRef = useRef<THREE.Group>();

  // Enhanced rays with more dynamic properties
  const rays = useMemo(() => {
    const temp: RayType[] = [];
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      temp.push({
        rotation: [0, 0, angle],
        scale: 1 + Math.random() * 0.5,
        speed: 0.5 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, []);

  // Enhanced particles
  const particles = useMemo(() => {
    const temp: ParticleType[] = [];
    for (let i = 0; i < 100; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2 + Math.random() * 2;
      temp.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ],
        scale: Math.random() * 0.1 + 0.05,
        speed: 0.2 + Math.random() * 0.5
      });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Enhanced panel animation
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      ref.current.position.y = Math.sin(t * 0.8) * 0.1;
      ref.current.rotation.z = Math.sin(t * 0.3) * 0.05;
    }

    // Enhanced sun animation
    if (sunRef.current) {
      sunRef.current.position.y = Math.sin(t) * 0.5 + 2;
      sunRef.current.rotation.z = t * 0.2;
      sunRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
    }

    // Enhanced rays animation
    if (raysRef.current) {
      raysRef.current.rotation.z = t * 0.5;
      raysRef.current.children.forEach((ray, i) => {
        const rayData = rays[i];
        ray.scale.x = rayData.scale * (1 + Math.sin(t * rayData.speed + rayData.offset) * 0.3);
        ray.scale.y = rayData.scale * (1 + Math.cos(t * rayData.speed + rayData.offset) * 0.3);
      });
    }

    // Enhanced panel group animation
    if (panelGroupRef.current) {
      panelGroupRef.current.children.forEach((panel, i) => {
        const y = Math.sin(t + i) * 0.1;
        const z = Math.cos(t + i) * 0.1;
        panel.position.y += y;
        panel.position.z += z;
        panel.rotation.x = Math.sin(t * 0.5 + i) * 0.1;
      });
    }

    // Enhanced glow animation
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.2 + Math.sin(t * 2) * 0.2);
      if (glowRef.current.material) {
        glowRef.current.material.opacity = 0.3 + Math.sin(t * 1.5) * 0.1;
      }
    }

    // Enhanced material animation
    if (materialRef.current) {
      materialRef.current.transmission = 0.6 + Math.sin(t) * 0.1;
      materialRef.current.thickness = 0.5 + Math.sin(t * 1.5) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Enhanced Sun */}
      <group ref={sunRef} position={[0, 2, -2]}>
        <mesh>
          <sphereGeometry args={[0.7, 64, 64]} />
          <meshStandardMaterial
            ref={materialRef}
            color="#FDB813"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Enhanced Sun Rays */}
        <group ref={raysRef}>
          {rays.map((ray, i) => (
            <Trail
              key={i}
              width={2}
              length={8}
              color="#FDB813"
              attenuation={(t) => t * t}
            >
              <mesh rotation={ray.rotation}>
                <boxGeometry args={[3, 0.05, 0.05]} />
                <meshBasicMaterial
                  color="#FDB813"
                  transparent
                  opacity={0.6}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            </Trail>
          ))}
        </group>
      </group>

      {/* Enhanced Panel Array */}
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.5}
      >
        <group ref={ref}>
          <group ref={panelGroupRef}>
            {Array.from({ length: 3 }).map((_, row) =>
              Array.from({ length: 2 }).map((_, col) => (
                <group
                  key={`${row}-${col}`}
                  position={[
                    (col - 0.5) * 1.2,
                    row * 0.1,
                    (row - 1) * 1.2
                  ]}
                >
                  {/* Enhanced Panel Frame */}
                  <mesh castShadow>
                    <boxGeometry args={[1, 0.05, 1.5]} />
                    <meshStandardMaterial
                      color="#2C3E50"
                      metalness={0.9}
                      roughness={0.1}
                      envMapIntensity={2}
                    />
                  </mesh>

                  {/* Enhanced Solar Cells */}
                  <mesh position={[0, 0.03, 0]}>
                    <boxGeometry args={[0.9, 0.02, 1.4]} />
                    <meshStandardMaterial
                      color="#1a365d"
                      metalness={0.9}
                      roughness={0.1}
                      envMapIntensity={2}
                    />
                  </mesh>

                  {/* Enhanced Reflective Surface */}
                  <mesh position={[0, 0.04, 0]}>
                    <planeGeometry args={[0.85, 1.35]} />
                    <meshStandardMaterial
                      color="#2C3E50"
                      metalness={0.9}
                      roughness={0.1}
                      envMapIntensity={2}
                    />
                  </mesh>
                </group>
              ))
            )}
          </group>
        </group>
      </Float>

      {/* Enhanced Particles */}
      <group>
        {particles.map((particle, i) => (
          <Trail
            key={i}
            width={0.5}
            length={4}
            color="#FDB813"
            attenuation={(t) => t * t}
          >
            <mesh position={particle.position}>
              <sphereGeometry args={[particle.scale, 16, 16]} />
              <meshBasicMaterial
                color="#FDB813"
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </Trail>
        ))}
      </group>

      {/* Enhanced Glow Effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#FDB813"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

interface SceneProps {
  children?: React.ReactNode;
}

function Scene({ children }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 50 }}
      dpr={[1, 2]}
      shadows
      style={{ width: '100%', height: '100%', position: 'absolute' }}
    >
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

      <SolarPanel />

      <Environment preset="sunset" />
      
      {/* Enhanced Atmospheric Effects */}
      <fog attach="fog" args={['#111827', 5, 15]} />
      
      {/* Enhanced Post-Processing */}
      <Effects />
      {children}
    </Canvas>
  );
}

interface EffectsProps {
  children?: React.ReactNode;
}

function Effects({ children }: EffectsProps) {
  const ref = useRef<THREE.Group>();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.3;
    }
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.1}
        />
      </mesh>
      {children}
    </group>
  );
}

interface Hero3DProps {
  rotation: [number, number, number];
  position: [number, number, number];
  scale: [number, number, number];
  children?: React.ReactNode;
}

const Hero3D: React.FC<Hero3DProps> = ({ rotation, position, scale, children }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', minHeight: '500px' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      >
        <Scene>
          {children}
        </Scene>
      </motion.div>
    </div>
  );
}

export default Hero3D;