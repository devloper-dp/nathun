import { ThreeDContainer } from './common/3DContainer';
import { Scene } from './common/Scene';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function SolarPanel({ position, color, isActive }: any) {
  const ref = useRef<THREE.Group>(null);
  const panelsRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.Mesh>(null);
  const houseRef = useRef<THREE.Group>(null);
  const energyFlowRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !panelsRef.current || !sunRef.current || !houseRef.current || !energyFlowRef.current || !cloudsRef.current) return;
    const t = clock.getElapsedTime();
    
    // Smooth base rotation
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    
    // Panel tilt animation - follows sun position
    panelsRef.current.rotation.x = Math.sin(t * 0.2) * 0.1 + 0.3;
    
    // Sun glow and pulse effect
    if (isActive) {
      sunRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.1);
      (sunRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 
        2 + Math.sin(t * 1.5) * 0.5;
    }

    // House windows lighting effect
    houseRef.current.children.forEach((window, i) => {
      if (window instanceof THREE.Mesh) {
        (window.material as THREE.MeshStandardMaterial).emissiveIntensity = 
          0.5 + Math.sin(t * 1.5 + i * 0.2) * 0.3;
      }
    });

    // Energy flow animation
    energyFlowRef.current.children.forEach((flow, i) => {
      flow.position.y = Math.sin(t * 2 + i * 0.5) * 0.2;
      flow.rotation.z = t * 0.5 + i * Math.PI / 4;
    });

    // Clouds movement
    cloudsRef.current.rotation.y = t * 0.1;
    cloudsRef.current.children.forEach((cloud, i) => {
      cloud.position.x = Math.sin(t * 0.2 + i * Math.PI / 4) * 2;
      cloud.position.y = Math.cos(t * 0.2 + i * Math.PI / 4) * 0.5 + 5;
    });
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        {/* Enhanced Ground with Grass Effect */}
        <mesh receiveShadow position={[0, -2, 0]}>
          <cylinderGeometry args={[4, 4.2, 0.3, 32]} />
          <meshStandardMaterial 
            color="#4B5563"
            metalness={0.2}
            roughness={0.8}
            normalScale={new THREE.Vector2(0.5, 0.5)}
          />
        </mesh>

        {/* Modern House Structure */}
        <group ref={houseRef} position={[0, 0, 0]}>
          {/* Main Building with Better Architecture */}
          <mesh castShadow position={[0, 0, 0]}>
            <boxGeometry args={[3.5, 3, 3.5]} />
            <meshStandardMaterial
              color="#E5E7EB"
              metalness={0.2}
              roughness={0.8}
              envMapIntensity={1}
            />
          </mesh>

          {/* Modern Slanted Roof */}
          <mesh castShadow position={[0, 2, 0]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshStandardMaterial
              color="#4B5563"
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>

          {/* Smart Windows with Dynamic Lighting */}
          {[[-1.2, 0, 1.76], [1.2, 0, 1.76], [-1.2, 1, 1.76], [1.2, 1, 1.76]].map((pos, i) => (
            <mesh key={i} position={pos as [number, number, number]} castShadow>
              <boxGeometry args={[0.8, 0.8, 0.1]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isActive ? 1 : 0.2}
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.9}
              />
            </mesh>
          ))}

          {/* Modern Door */}
          <mesh position={[0, -1, 1.76]} castShadow>
            <boxGeometry args={[1.2, 1.8, 0.1]} />
            <meshStandardMaterial
              color="#4B5563"
              metalness={0.6}
              roughness={0.4}
              envMapIntensity={1}
            />
          </mesh>
        </group>

        {/* Enhanced Solar Panel Array */}
        <group ref={panelsRef} position={[0, 2.5, 0]}>
          {Array.from({ length: 3 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => (
              <mesh
                key={`panel-${row}-${col}`}
                position={[
                  (col - 1.5) * 1,
                  row * 0.1,
                  row * 0.5
                ]}
                rotation={[0.3, 0, 0]}
                castShadow
              >
                <boxGeometry args={[0.9, 0.05, 0.7]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.5}
                  metalness={0.9}
                  roughness={0.1}
                  envMapIntensity={2}
                />
              </mesh>
            ))
          )}
        </group>

        {/* Enhanced Sun with Corona Effect */}
        <mesh
          ref={sunRef}
          position={[3, 4, -2]}
          castShadow
        >
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color="#FDB813"
            emissive="#FDB813"
            emissiveIntensity={2}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Dynamic Energy Flow System */}
        <group ref={energyFlowRef}>
          {isActive && Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * 2,
                  1,
                  Math.sin(angle) * 2
                ]}
                rotation={[0, angle, Math.PI / 6]}
              >
                <cylinderGeometry args={[0.05, 0.15, 2, 8]} />
                <meshStandardMaterial
                  color={color}
                  transparent
                  opacity={0.3}
                  emissive={color}
                  emissiveIntensity={0.5}
                />
              </mesh>
            );
          })}
        </group>

        {/* Decorative Clouds */}
        <group ref={cloudsRef}>
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.sin(i * Math.PI / 2.5) * 3,
                4 + Math.cos(i * Math.PI / 2.5) * 0.5,
                Math.cos(i * Math.PI / 2.5) * 3
              ]}
            >
              <sphereGeometry args={[0.4, 16, 16]} />
              <meshStandardMaterial
                color="white"
                transparent
                opacity={0.8}
                roughness={1}
              />
            </mesh>
          ))}
        </group>

        {/* Enhanced Ambient Lighting */}
        {isActive && (
          <>
            <pointLight
              position={[0, 4, 0]}
              color={color}
              intensity={1}
              distance={8}
              decay={2}
            />
            <pointLight
              position={[3, 4, -2]}
              color="#FDB813"
              intensity={2}
              distance={10}
              decay={2}
            />
          </>
        )}
      </group>
    </Float>
  );
}

export default function Hero3D() {
  const panels = [
    { position: [-6, 0, -2], color: '#FDB813' },
    { position: [0, 0, 0], color: '#10B981', isActive: true },
    { position: [6, 0, -2], color: '#3B82F6' }
  ];

  return (
    <ThreeDContainer 
      minHeight="700px"
      maxHeight="900px"
      scale={1.2}
      className="hero-3d"
    >
      <Scene>
        {panels.map((panel, index) => (
          <SolarPanel
            key={index}
            position={panel.position as [number, number, number]}
            color={panel.color}
            isActive={panel.isActive}
          />
        ))}
      </Scene>
    </ThreeDContainer>
  );
}