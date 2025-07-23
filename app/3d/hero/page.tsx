"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Text,
  Float,
  Sphere,
  Box,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function HeroScene() {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Hub */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <Box args={[2, 0.5, 2]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#1e40af"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      </Float>

      {/* Orbiting Elements */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 4;
        return (
          <Float
            key={i}
            speed={1.5 + i * 0.1}
            rotationIntensity={0.3}
            floatIntensity={0.3}
          >
            <Sphere
              args={[0.3]}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 0.5,
                Math.sin(angle) * radius,
              ]}
            >
              <meshStandardMaterial
                color="#3b82f6"
                metalness={0.6}
                roughness={0.3}
              />
            </Sphere>
          </Float>
        );
      })}

      {/* Title */}
      <Text
        position={[0, 3, 0]}
        fontSize={1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        SmartSight
      </Text>

      <Text
        position={[0, 2, 0]}
        fontSize={0.4}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.ttf"
      >
        Next-Generation Security
      </Text>
    </group>
  );
}

export default function HeroPage() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-semibold text-lg">
              SmartSight Hero
            </span>
          </div>
          <div className="flex space-x-4">
            <a
              href="/3d"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              3D Model
            </a>
            <a
              href="/"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 2, 10]} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <Suspense fallback={null}>
          <HeroScene />
          <Environment preset="night" />
        </Suspense>
      </Canvas>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white max-w-2xl px-6">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            SmartSight
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Revolutionary AI-powered CCTV monitoring system with real-time
            threat detection and intelligent analytics.
          </p>
          <div className="flex justify-center space-x-4 pointer-events-auto">
            <a
              href="/"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              View Dashboard
            </a>
            <a
              href="/3d"
              className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-lg transition-colors"
            >
              Explore 3D
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
