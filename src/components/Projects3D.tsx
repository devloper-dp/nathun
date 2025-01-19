import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Define types for the props of SolarPanel component
interface SolarPanelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  type: 'residential' | 'commercial' | 'industrial';
}

function SolarPanel({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#FDB813', type = 'residential' }: SolarPanelProps) {
  const panelConfig = {
    residential: {
      panels: { rows: 2, cols: 3, size: 0.6 },
      height: 0.8,
      angle: -0.3,
      color: '#FDB813'
    },
    commercial: {
      panels: { rows: 3, cols: 4, size: 0.5 },
      height: 1.2,
      angle: -0.4,
      color: '#3498DB'
    },
    industrial: {
      panels: { rows: 4, cols: 5, size: 0.4 },
      height: 1.5,
      angle: -0.5,
      color: '#2ECC71'
    }
  };

  const config = panelConfig[type];

  return (
    <group position={position} rotation={[config.angle, rotation[1], rotation[2]]}>
      {/* Base Structure */}
      <mesh position={[0, -config.height/2, 0]}>
        <boxGeometry args={[0.1, config.height, 0.1]} />
        <meshStandardMaterial color="#95A5A6" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Panel Frame */}
      <group position={[0, 0, 0]}>
        <mesh>
          <boxGeometry 
            args={[config.panels.cols * config.panels.size + 0.1, 0.05, config.panels.rows * config.panels.size + 0.1]} 
          />
          <meshStandardMaterial color="#FFFFFF" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Solar Cells */}
        {Array.from({ length: config.panels.rows }).map((_, row) =>
          Array.from({ length: config.panels.cols }).map((_, col) => (
            <group
              key={`${row}-${col}`}
              position={[
                (col - (config.panels.cols - 1) / 2) * config.panels.size,
                0.03,
                (row - (config.panels.rows - 1) / 2) * config.panels.size
              ]}
            >
              <mesh>
                <boxGeometry 
                  args={[config.panels.size * 0.9, 0.02, config.panels.size * 0.9]} 
                />
                <meshStandardMaterial
                  color={config.color}
                  metalness={0.9}
                  roughness={0.1}
                  envMapIntensity={1}
                />
              </mesh>
              
              {/* Cell Details */}
              <mesh position={[0, 0.011, 0]}>
                <planeGeometry 
                  args={[config.panels.size * 0.8, config.panels.size * 0.8]}
                />
                <meshStandardMaterial
                  color={config.color}
                  metalness={1}
                  roughness={0}
                  transparent
                  opacity={0.5}
                />
              </mesh>
            </group>
          ))
        )}
      </group>

      {/* Support Brackets */}
      <mesh position={[-0.4, -config.height/4, 0]} rotation={[0, 0, Math.PI/4]}>
        <boxGeometry args={[0.05, 0.6, 0.05]} />
        <meshStandardMaterial color="#D3D3D3" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.4, -config.height/4, 0]} rotation={[0, 0, -Math.PI/4]}>
        <boxGeometry args={[0.05, 0.6, 0.05]} />
        <meshStandardMaterial color="#D3D3D3" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Define types for the Scene component
interface SceneProps {
  type: 'Residential' | 'Commercial' | 'Industrial';
}

function Scene({ type }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [4, 3, 4], fov: 50 }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#1a1a1a']} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Key Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Fill Light */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
        color="#FDB813"
      />

      <group position={[0, 0, 0]}>
        <SolarPanel
          position={[0, 0, 0]}
          rotation={[0, Math.PI * 0.25, 0]}
          type={type.toLowerCase() as 'residential' | 'commercial' | 'industrial'}
        />
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={4}
      />

      {/* Environment Map */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#1a1a1a"
          side={THREE.BackSide}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Canvas>
  );
}

export default function Projects3D() {
  return (
    <div className="h-96 my-12 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="grid grid-cols-3 gap-12">
          {['Residential', 'Commercial', 'Industrial'].map((type, index) => (
            <motion.div
              key={type}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg overflow-hidden">
                <Scene type={type} />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{type}</h3>
                <p className="text-sm text-gray-600">
                  {type === 'Residential' && 'Home Solar Solutions'}
                  {type === 'Commercial' && 'Business Installations'}
                  {type === 'Industrial' && 'Large Scale Projects'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
