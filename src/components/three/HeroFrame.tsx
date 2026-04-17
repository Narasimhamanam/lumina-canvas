import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const Frame = () => {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.4) * 0.2;
    group.current.rotation.x = Math.cos(t * 0.3) * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={group}>
        {/* Outer frame */}
        <mesh>
          <torusGeometry args={[2.2, 0.04, 16, 100]} />
          <meshStandardMaterial color="#ff1e3c" emissive="#ff1e3c" emissiveIntensity={1.2} toneMapped={false} />
        </mesh>
        {/* Inner ring */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[2.5, 0.015, 12, 100]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1.2} toneMapped={false} />
        </mesh>
        {/* Floating dots */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          const r = 2.85;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}>
              <sphereGeometry args={[0.025, 12, 12]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? "#ff1e3c" : "#ffffff"}
                emissive={i % 3 === 0 ? "#ff1e3c" : "#ffffff"}
                emissiveIntensity={2}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};

const HeroFrame = () => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ff1e3c" />
      <pointLight position={[-5, -3, 2]} intensity={0.8} color="#3b82f6" />
      <Suspense fallback={null}>
        <Frame />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default HeroFrame;
