import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Trail, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { forwardRef } from 'react';

// Create a forwarded ref component for MeshDistanceMaterial
const MeshDistanceMaterialComponent = forwardRef((props: any, ref) => (
  <meshStandardMaterial ref={ref} {...props} />
));

MeshDistanceMaterialComponent.displayName = 'MeshDistanceMaterialComponent';

interface FeatureIconProps {
  position: [number, number, number];
  color: string;
}

interface ParticleType {
  position: [number, number, number];
  scale: number;
}

function FeatureIcon({ position, color }: FeatureIconProps) {
  const ref = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Create orbital particles
  const particles = useMemo(() => {
    const temp: ParticleType[] = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 1.2;
      temp.push({
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        ],
        scale: Math.random() * 0.2 + 0.1
      });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Animate main icon
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      ref.current.position.y = Math.sin(t * 0.8) * 0.1;
    }

    // Animate glow
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
      if (glowRef.current.material instanceof THREE.Material) {
        glowRef.current.material.opacity = 0.5 + Math.sin(t) * 0.2;
      }
    }

    // Animate material
    if (materialRef.current) {
      materialRef.current.metalness = 0.3 + Math.sin(t) * 0.2;
    }

    // Animate particles
    if (trailRef.current) {
      trailRef.current.children.forEach((particle, i) => {
        const mesh = particle as THREE.Mesh;
        const particleData = particles[i];
        if (particleData && mesh) {
          mesh.position.x = particleData.position[0] + Math.sin(t + i) * 0.1;
          mesh.position.y = particleData.position[1] + Math.cos(t + i) * 0.1;
          mesh.position.z = particleData.position[2] + Math.sin(t + i) * 0.1;
          mesh.scale.setScalar(0.1 + Math.sin(t * 2 + i) * 0.05);
        }
      });
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group ref={ref} position={position}>
        <Trail
          width={2}
          length={8}
          color={color}
          attenuation={(t) => t * t}
        >
          <mesh castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <MeshDistanceMaterialComponent
              ref={materialRef}
              color={color}
              metalness={0.9}
              roughness={0.1}
              envMapIntensity={2}
            />
          </mesh>
        </Trail>

        <mesh ref={glowRef}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <group ref={trailRef}>
          {particles.map((particle, i) => (
            <Trail
              key={i}
              width={0.5}
              length={4}
              color={color}
              attenuation={(t) => t * t}
            >
              <mesh position={particle.position}>
                <sphereGeometry args={[particle.scale, 8, 8]} />
                <meshBasicMaterial
                  color={color}
                  transparent
                  opacity={0.8}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            </Trail>
          ))}
        </group>
      </group>
    </Float>
  );
}

interface SceneProps {
  features: {
    color: string;
    position: [number, number, number];
  }[];
}

function Scene({ features }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      shadows
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

      {features.map((feature, index) => (
        <FeatureIcon
          key={index}
          position={feature.position}
          color={feature.color}
        />
      ))}
      
      <Environment preset="sunset" />
      <Effects />
      <Grid />
    </Canvas>
  );
}

function Effects() {
  const ref = useRef<THREE.Group>(null);

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
        <MeshDistanceMaterialComponent
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          distance={0.4}
          speed={2}
        />
      </mesh>
    </group>
  );
}

function Grid() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
      ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  return (
    <group ref={ref} position={[0, 0, -2]}>
      <gridHelper
        args={[40, 40, '#FDB813', '#FDB813']}
        position={[0, -2, 0]}
      />
      <gridHelper
        args={[40, 40, '#3B82F6', '#3B82F6']}
        position={[0, -2, 0]}
        rotation={[0, Math.PI / 4, 0]}
      />
    </group>
  );
}

export default function Features3D() {
  const features = [
    { color: '#FDB813', position: [-2.5, 0, 0] },
    { color: '#3B82F6', position: [0, 0, 0] },
    { color: '#10B981', position: [2.5, 0, 0] },
  ];

  return (
    <div className="h-96 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <Scene features={features} />
      </motion.div>
    </div>
  );
}