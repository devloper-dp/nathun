import { ThreeDContainer } from './common/3DContainer';
import { Scene } from './common/Scene';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function TrophyModel({ position, color, isActive }: any) {
  const ref = useRef<THREE.Group>(null);
  const cupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !cupRef.current || !glowRef.current) return;
    const t = clock.getElapsedTime();
    
    // Smooth trophy rotation
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    
    // Cup floating animation
    cupRef.current.position.y = Math.sin(t * 2) * 0.1;
    
    // Glow intensity animation
    if (isActive) {
      glowRef.current.intensity = 2 + Math.sin(t * 2) * 0.5;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={ref} position={position}>
        {/* Trophy Base */}
        <mesh receiveShadow>
          <cylinderGeometry args={[0.8, 1, 0.3, 8]} />
          <meshStandardMaterial color="#1A202C" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Trophy Stem */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 1.2, 8]} />
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Trophy Cup */}
        <group ref={cupRef} position={[0, 1.8, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.6, 0.3, 0.8, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isActive ? 0.8 : 0.3}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          
          {/* Cup Details */}
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh
              key={i}
              position={[0, i * 0.2 - 0.2, 0]}
              castShadow
            >
              <torusGeometry args={[0.6 - i * 0.1, 0.05, 16, 32]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
        </group>

        {/* Trophy Glow */}
        <pointLight
          ref={glowRef}
          color={color}
          intensity={isActive ? 2 : 0.5}
          distance={5}
          decay={2}
          position={[0, 2, 0]}
        />

        {/* Award Stars */}
        {isActive && Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 0.8,
                2.5,
                Math.sin(angle) * 0.8
              ]}
              rotation={[0, angle, 0]}
              castShadow
            >
              <boxGeometry args={[0.2, 0.2, 0.2]} />
               <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

export default function Awards3D() {
  const awards = [
    { position: [-4, 0, 0], color: '#FDB813' },
    { position: [0, 0, 0], color: '#10B981', isActive: true },
    { position: [4, 0, 0], color: '#3B82F6' }
  ];

  return (
    <ThreeDContainer 
      minHeight="500px"
      maxHeight="700px"
      scale={1.1}
      className="awards-3d"
    >
      <Scene>
        {awards.map((award, index) => (
          <TrophyModel
            key={index}
            position={award.position as [number, number, number]}
            color={award.color}
            isActive={award.isActive}
          />
        ))}
      </Scene>
    </ThreeDContainer>
  );
}