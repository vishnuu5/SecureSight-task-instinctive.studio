"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Text,
  Float,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

function SmartSightModel() {
  const meshRef = useRef<Mesh>(null);

  // Rotate the model continuously
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        {/* Placeholder for the SmartSight model - replace with actual GLTF loader when model is converted */}
        <boxGeometry args={[2, 1, 0.5]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function CameraModel({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.rotation.z =
        Math.cos(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <cylinderGeometry args={[0.2, 0.3, 0.8, 8]} />
        <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.3} />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Main SmartSight Device */}
      <SmartSightModel />

      {/* Security Cameras */}
      <CameraModel position={[-4, 2, -2]} />
      <CameraModel position={[4, 2, -2]} />
      <CameraModel position={[0, 3, -4]} />

      {/* Text Labels */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.5}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        SmartSight Security System
      </Text>

      <Text
        position={[0, -2.8, 0]}
        fontSize={0.3}
        color="#64748b"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.ttf"
      >
        AI-Powered CCTV Monitoring
      </Text>

      {/* Environment */}
      <Environment preset="studio" />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-white text-xl">Loading 3D Scene...</div>
    </div>
  );
}

export default function ThreeDPage() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-semibold text-lg">
              SmartSight 3D
            </span>
          </div>
          <a
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
        />
        <Suspense fallback={<LoadingFallback />}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Info Panel */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
          <h3 className="text-lg font-semibold mb-2">
            SmartSight 3D Visualization
          </h3>
          <p className="text-sm text-gray-300 mb-2">
            Interactive 3D model of the SmartSight security system with animated
            cameras and monitoring devices.
          </p>
          <div className="flex space-x-4 text-xs text-gray-400">
            <span>• Drag to rotate</span>
            <span>• Scroll to zoom</span>
            <span>• Right-click to pan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
