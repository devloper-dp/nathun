import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  position: [number, number, number];
  color: string;
  isActive?: boolean;
  step?: string;
}

const getMaterial = (color: string) => {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: 0.8,
    roughness: 0.2,
    emissive: color,
    emissiveIntensity: 0.5,
  });
};

export const SolarPanel: React.FC<ModelProps> = ({ position, color, isActive }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    if (isActive) {
      ref.current.scale.setScalar(1.1 + Math.sin(t * 2) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 0.1, 2]} />
          <meshStandardMaterial {...getMaterial(color)} />
        </mesh>
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (i % 4 - 1.5) * 0.6,
              0.1,
              (Math.floor(i / 4) - 1) * 0.5
            ]}
            castShadow
          >
            <boxGeometry args={[0.5, 0.05, 0.4]} />
            <meshStandardMaterial {...getMaterial(color)} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

export const Building: React.FC<ModelProps> = ({ position, color, isActive }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    if (isActive) {
      ref.current.scale.setScalar(1.1 + Math.sin(t * 2) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        {[0, 1, 2].map((floor) => (
          <mesh
            key={floor}
            position={[0, floor * 1.2, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[2, 1, 2]} />
            <meshStandardMaterial {...getMaterial(color)} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

export const Trophy: React.FC<ModelProps> = ({ position, color, isActive }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    if (isActive) {
      ref.current.scale.setScalar(1.1 + Math.sin(t * 2) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.5, 0.2, 32]} />
          <meshStandardMaterial {...getMaterial(color)} />
        </mesh>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.2, 0.6, 32]} />
          <meshStandardMaterial {...getMaterial(color)} />
        </mesh>
      </group>
    </Float>
  );
};

export const ProcessStep: React.FC<ModelProps> = ({ position, color, isActive, step }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    if (isActive) {
      ref.current.scale.setScalar(1.1 + Math.sin(t * 2) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.8, 0.1]} />
          <meshStandardMaterial {...getMaterial(color)} />
        </mesh>
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
          <meshStandardMaterial {...getMaterial(color)} />
        </mesh>
      </group>
    </Float>
  );
};

export const EnergySolution: React.FC<ModelProps> = ({ position, color, isActive }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    if (isActive) {
      ref.current.scale.setScalar(1.1 + Math.sin(t * 2) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 1, 2]} />
          <meshStandardMaterial {...getMaterial(color)} />
        </mesh>
        <mesh position={[0, 0.75, 0]} castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#FDB813"
            emissive="#FDB813"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
    </Float>
  );
};