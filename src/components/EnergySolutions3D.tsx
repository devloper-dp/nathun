import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface SolarPanelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}

const SolarPanel: React.FC<SolarPanelProps> = ({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#FDB813' }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Panel Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      
      {/* Solar Cells */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 2 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              (row - 1.5) * 0.45,
              0.06,
              (col - 0.5) * 0.45
            ]}
          >
            <boxGeometry args={[0.4, 0.02, 0.4]} />
            <meshStandardMaterial
              color={color}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))
      )}
      
      {/* Support Stand */}
      <mesh position={[0, -0.5, 0]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#95A5A6" />
      </mesh>
    </group>
  );
};

const Scene: React.FC = () => {
  return (
    <Canvas camera={{ position: [4, 3, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <SolarPanel
        position={[0, 0, 0]}
        rotation={[-0.2, Math.PI * 0.25, 0]}
      />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={4}
      />
    </Canvas>
  );
};

const EnergySolutions3D: React.FC = () => {
  return (
    <div className="h-64 my-12 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-64 h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg overflow-hidden">
          <Scene />
        </div>
      </motion.div>
    </div>
  );
};

export default EnergySolutions3D;