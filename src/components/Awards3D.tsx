import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface Trophy3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}

const Trophy3D: React.FC<Trophy3DProps> = ({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#FDB813' }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Trophy Base */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 0.2, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Trophy Stem */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.2, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Trophy Cup */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.2, 0.8, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Trophy Handles */}
      <mesh position={[-0.5, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.2, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.2, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const Scene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Trophy3D position={[0, 0, 0]} rotation={[0, Math.PI * 0.25, 0]} />

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

const Awards3D: React.FC = () => {
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

export default Awards3D;
