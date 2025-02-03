import { ThreeDContainer } from './common/3DContainer';
import { Scene } from './common/Scene';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface TrophyModelProps {
  position: [number, number, number];
  color: string;
  title: string;
  isActive: boolean;
  scale?: number;
}

function TrophyModel({ position, color, title, isActive, scale = 1 }: TrophyModelProps) {
  const ref = useRef<THREE.Group>(null);
  const cupRef = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Group>(null);
  const detailsRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const starsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !cupRef.current || !baseRef.current || !detailsRef.current || !glowRef.current || !starsRef.current) return;
    const t = clock.getElapsedTime();
    
    // Trophy base rotation
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    
    // Cup floating animation
    cupRef.current.position.y = Math.sin(t * 2) * 0.1;
    
    // Base glow
    if (isActive) {
      glowRef.current.intensity = 2 + Math.sin(t * 2) * 0.5;
    }

    // Details animation
    detailsRef.current.children.forEach((detail, i) => {
      detail.rotation.z = Math.sin(t * 1.5 + i * 0.3) * 0.1;
    });

    // Stars rotation
    starsRef.current.rotation.y = t * 0.5;
    starsRef.current.children.forEach((star, i) => {
      star.position.y = Math.sin(t * 2 + i * 0.5) * 0.1;
    });
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={ref} position={position} scale={scale}>
        {/* Base Platform with Details */}
        <group ref={baseRef}>
          {/* Main Base */}
          <mesh receiveShadow>
            <cylinderGeometry args={[1.5, 1.7, 0.3, 8]} />
            <meshStandardMaterial 
              color="#1A202C" 
              metalness={0.8} 
              roughness={0.2}
              envMapIntensity={1}
            />
          </mesh>

          {/* Base Decorative Elements */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * 1.4,
                  0.2,
                  Math.sin(angle) * 1.4
                ]}
                castShadow
              >
                <boxGeometry args={[0.2, 0.05, 0.2]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.3}
                />
              </mesh>
            );
          })}

          {/* Base Ring */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <torusGeometry args={[1.6, 0.05, 16, 32]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>

        {/* Trophy Cup Structure */}
        <group ref={cupRef} position={[0, 2.5, 0]}>
          {/* Main Cup Body */}
          <mesh castShadow>
            <cylinderGeometry args={[1, 0.6, 1.2, 32]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isActive ? 1.2 : 0.3}
              metalness={0.9}
              roughness={0.1}
              envMapIntensity={1.5}
            />
          </mesh>

          {/* Cup Details */}
          <group ref={detailsRef}>
            {Array.from({ length: 3 }).map((_, i) => (
              <mesh
                key={i}
                position={[0, i * 0.3 - 0.4, 0]}
                castShadow
              >
                <torusGeometry args={[1 - i * 0.1, 0.05, 16, 32]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.5}
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>
            ))}
          </group>

          {/* Cup Top */}
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[1.2, 1, 0.2, 32]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Cup Handles */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 1.1, -0.2, 0]}>
              <mesh castShadow>
                <torusGeometry args={[0.2, 0.04, 16, 32, Math.PI]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.4}
                />
              </mesh>
            </group>
          ))}
        </group>

        {/* Trophy Stem with Details */}
        <group>
          {/* Main Stem */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.3, 2, 16]} />
            <meshStandardMaterial
              color={color}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Stem Decorative Rings */}
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh
              key={i}
              position={[0, 0.8 + i * 0.7, 0]}
              castShadow
            >
              <torusGeometry args={[0.3, 0.03, 16, 32]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.4}
              />
            </mesh>
          ))}
        </group>

        {/* Orbiting Stars */}
        <group ref={starsRef} position={[0, 2.5, 0]}>
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i / 5) * Math.PI * 2;
            return (
              <group
                key={i}
                position={[
                  Math.cos(angle) * 1.5,
                  Math.sin(angle) * 0.3,
                  Math.sin(angle) * 1.5
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
                  <pointLight
                    color={color}
                    intensity={0.5}
                    distance={2}
                    decay={2}
                  />
                )}
              </group>
            );
          })}
        </group>

        {/* Trophy Glow System */}
        <pointLight
          ref={glowRef}
          color={color}
          intensity={isActive ? 2 : 0.5}
          distance={5}
          decay={2}
          position={[0, 2.5, 0]}
        />

        {/* Award Title Display */}
        <mesh position={[0, 0.2, 1.4]} castShadow>
          <boxGeometry args={[1.5, 0.3, 0.1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 1 : 0.3}
          />
        </mesh>

        {/* Base Lighting System */}
        {isActive && (
          <>
            <pointLight
              position={[0, 0.2, 0]}
              color={color}
              intensity={1}
              distance={3}
              decay={2}
            />
            <pointLight
              position={[0, 3, 0]}
              color={color}
              intensity={0.5}
              distance={4}
              decay={2}
            />
          </>
        )}
      </group>
    </Float>
  );
}

export default function Awards3D() {
  const awards = [
    { 
      position: [-4, 0, 0], 
      color: '#FDB813', 
      title: 'Best Solar Company',
      scale: 0.9
    },
    { 
      position: [0, 0, 0], 
      color: '#10B981', 
      title: 'Innovation Award', 
      isActive: true,
      scale: 1.1
    },
    { 
      position: [4, 0, 0], 
      color: '#3B82F6', 
      title: 'Quality Excellence',
      scale: 0.9
    }
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
            title={award.title}
            isActive={award.isActive ?? false}
            scale={award.scale}
          />
        ))}
      </Scene>
    </ThreeDContainer>
  );
}