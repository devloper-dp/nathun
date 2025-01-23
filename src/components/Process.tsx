import { useRef, useMemo, MutableRefObject } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Trail, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
import { MeshDistanceMaterial } from 'three'; // Corrected import

type ProcessProps = {
  position: { x: number; y: number; z: number };
  color: string;
  number: string;
  isActive: boolean;
};

type Particle = {
  x: number;
  y: number;
  z: number;
};

function ProcessStep({ position, color, number, isActive }: ProcessProps) {
  const ref: MutableRefObject<THREE.Group | null> = useRef(null);
  const glowRef: MutableRefObject<THREE.Mesh | null> = useRef(null);
  const particlesRef: MutableRefObject<THREE.Group | null> = useRef(null);
  const materialRef: MutableRefObject<MeshDistanceMaterial | null> = useRef(null); // Corrected type

  // Create particles
  const particles: Particle[] = useMemo(() => {
    const temp: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 1 + Math.random() * 2;
      const x = r * Math.cos(t);
      const y = r * Math.sin(t);
      const z = -Math.random() * 2;
      temp.push({ x, y, z });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      ref.current.position.y = Math.sin(t * 0.8) * 0.1;
    }

    if (glowRef.current?.material && glowRef.current.material instanceof THREE.MeshBasicMaterial) {
      glowRef.current.material.opacity = (0.3 + Math.sin(t * 2) * 0.1) * (isActive ? 1 : 0.5);
    }


    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const particle = particles[i];
        mesh.position.x = particle.x + Math.sin(t + i) * 0.1;
        mesh.position.y = particle.y + Math.cos(t + i) * 0.1;
        mesh.position.z = particle.z + Math.sin(t + i) * 0.1;
        mesh.scale.setScalar(Math.sin(t * 2 + i) * 0.2 + 0.8);
      });
    }

    if (materialRef.current && materialRef.current instanceof THREE.MeshStandardMaterial) {
      materialRef.current.metalness = 0.3 + Math.sin(t) * 0.2;
    }    
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group ref={ref} position={new THREE.Vector3(position.x, position.y, position.z)}>
        <Trail
          width={2}
          length={8}
          color={color}
          attenuation={(t) => t * t}
        >
          <mesh castShadow>
            <cylinderGeometry args={[1, 1, 0.5, 32]} />
            <meshStandardMaterial
              ref={materialRef as MutableRefObject<THREE.MeshStandardMaterial | null>}
              color={color}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={isActive ? 1 : 0.7}
            />
          </mesh>
        </Trail>


        <Text
          position={new THREE.Vector3(0, 0, 0.3)}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {number}
        </Text>

        {/* Glow Effect */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Particle System */}
        <group ref={particlesRef}>
          {particles.map((p, i) => (
            <mesh key={i} position={new THREE.Vector3(p.x, p.y, p.z)}>
              <sphereGeometry args={[0.02, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                transparent
                opacity={isActive ? 1 : 0.5}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

function Scene({ activeStep = 0 }: { activeStep: number }) {
  const steps = [
    { color: '#FDB813', number: '01' },
    { color: '#3B82F6', number: '02' },
    { color: '#10B981', number: '03' },
    { color: '#8B5CF6', number: '04' }
  ];

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }} shadows>
      <color attach="background" args={['#111827']} />

      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
      />

      <group position={new THREE.Vector3(-6, 0, 0)}>
        {steps.map((step, index) => (
          <ProcessStep
            key={index}
            position={new THREE.Vector3(index * 4, 0, 0)}
            color={step.color}
            number={step.number}
            isActive={index === activeStep}
          />
        ))}
      </group>

      <Environment preset="sunset" />
      <Effects />
      <Points />
    </Canvas>
  );
}

function Effects() {
  const ref: MutableRefObject<THREE.Group | null> = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const meshData: { rotation: THREE.Euler } = ref.current as unknown as { rotation: THREE.Euler };
      meshData.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
      meshData.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.3;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

    </group>
  );
}

function Points() {
  const ref: MutableRefObject<THREE.Points | null> = useRef(null);
  const count = 1000;
  const positions: Float32Array = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const meshData: { rotation: THREE.Euler } = ref.current as unknown as { rotation: THREE.Euler };
      meshData.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
      meshData.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#FDB813"
        sizeAttenuation
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Process3D() {
  const [activeStep, setActiveStep] = React.useState<number>(0); // Added type annotation

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev: number) => (prev + 1) % 4); // Added type annotation
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-96 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <Scene activeStep={activeStep} />
      </motion.div>
    </div>
  );
}