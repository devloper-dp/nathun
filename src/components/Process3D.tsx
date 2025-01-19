import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface SolarInstallationProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  type: 'residential' | 'commercial' | 'industrial';
}

const SolarInstallation: React.FC<SolarInstallationProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  type
}) => {
  const config = {
    residential: {
      panels: { rows: 2, cols: 3, size: 0.4 },
      height: 0.5,
      color: '#FDB813'
    },
    commercial: {
      panels: { rows: 3, cols: 4, size: 0.3 },
      height: 0.8,
      color: '#3498DB'
    },
    industrial: {
      panels: { rows: 4, cols: 5, size: 0.25 },
      height: 1,
      color: '#2ECC71'
    }
  }[type];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Base Structure */}
      <mesh position={[0, -config.height/2, 0]}>
        <boxGeometry args={[0.2, config.height, 0.2]} />
        <meshStandardMaterial color="#95A5A6" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Panel Array */}
      <group position={[0, 0, 0]} rotation={[Math.PI * -0.2, 0, 0]}>
        {Array.from({ length: config.panels.rows }).map((_, row) =>
          Array.from({ length: config.panels.cols }).map((_, col) => (
            <group
              key={`${row}-${col}`}
              position={[
                (col - (config.panels.cols - 1) / 2) * config.panels.size * 1.1,
                0,
                (row - (config.panels.rows - 1) / 2) * config.panels.size * 1.1
              ]}
            >
              {/* Panel Frame */}
              <mesh>
                <boxGeometry 
                  args={[config.panels.size, 0.05, config.panels.size]} 
                />
                <meshStandardMaterial color="#2C3E50" metalness={0.7} roughness={0.3} />
              </mesh>

              {/* Solar Cells */}
              <mesh position={[0, 0.026, 0]}>
                <boxGeometry 
                  args={[config.panels.size * 0.9, 0.01, config.panels.size * 0.9]} 
                />
                <meshStandardMaterial
                  color={config.color}
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>
            </group>
          ))
        )}
      </group>
    </group>
  );
};

const Scene: React.FC<{ type: 'residential' | 'commercial' | 'industrial' }> = ({ type }) => {
  return (
    <Canvas
      camera={{ position: [4, 3, 4], fov: 50 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#1a1a1a']} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />
      
      <SolarInstallation
        type={type}
        position={[0, 0, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={4}
      />

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
};

const Projects3D: React.FC = () => {
  return (
    <div className="h-96 my-12 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="grid grid-cols-3 gap-12">
          {(['residential', 'commercial', 'industrial'] as const).map((type, index) => (
            <motion.div
              key={type}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden">
                <Scene type={type} />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-white capitalize">{type}</h3>
                <p className="text-sm text-gray-400">
                  {type === 'residential' && 'Home Solar Solutions'}
                  {type === 'commercial' && 'Business Installations'}
                  {type === 'industrial' && 'Large Scale Projects'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects3D;