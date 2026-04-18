import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

const Globe = () => {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.15;
    group.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.08;
  });

  // generate latitude/longitude rings on a sphere
  const lats = useMemo(() => Array.from({ length: 9 }, (_, i) => -1 + (i + 1) * 0.2), []);
  const lons = useMemo(() => Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI), []);

  return (
    <group ref={group} position={[0, 0, -0.5]} scale={1.4}>
      {/* glowing core sphere */}
      <mesh>
        <sphereGeometry args={[1.55, 48, 48]} />
        <meshBasicMaterial color="#0b1226" transparent opacity={0.55} />
      </mesh>

      {/* latitude rings */}
      {lats.map((y, i) => {
        const r = Math.sqrt(Math.max(0, 1 - y * y)) * 1.6;
        return (
          <mesh key={`lat-${i}`} position={[0, y * 1.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, 0.004, 6, 64]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.55} />
          </mesh>
        );
      })}

      {/* longitude rings */}
      {lons.map((rotY, i) => (
        <mesh key={`lon-${i}`} rotation={[0, rotY, 0]}>
          <torusGeometry args={[1.6, 0.004, 6, 64]} />
          <meshBasicMaterial color={i % 2 ? "#a855f7" : "#3b82f6"} transparent opacity={0.45} />
        </mesh>
      ))}

      {/* nodes on equator */}
      {Array.from({ length: 28 }).map((_, i) => {
        const a = (i / 28) * Math.PI * 2;
        return (
          <mesh key={`n-${i}`} position={[Math.cos(a) * 1.6, Math.sin(a) * 0.05, Math.sin(a) * 1.6]}>
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshBasicMaterial color={i % 4 === 0 ? "#a855f7" : "#60a5fa"} />
          </mesh>
        );
      })}
    </group>
  );
};

const Frame = () => {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.4) * 0.18;
    group.current.rotation.x = Math.cos(t * 0.3) * 0.07;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={group}>
        {/* Outer frame — electric blue */}
        <mesh>
          <torusGeometry args={[2.2, 0.045, 16, 100]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
        {/* Inner ring — neon purple */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[2.5, 0.018, 12, 100]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
        {/* Crimson signal accents */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          const r = 2.85;
          const isSignal = i % 8 === 0;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}>
              <sphereGeometry args={[0.028, 12, 12]} />
              <meshStandardMaterial
                color={isSignal ? "#ff1e3c" : i % 2 === 0 ? "#60a5fa" : "#c084fc"}
                emissive={isSignal ? "#ff1e3c" : i % 2 === 0 ? "#60a5fa" : "#c084fc"}
                emissiveIntensity={2.2}
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
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={1.1} color="#3b82f6" />
      <pointLight position={[-5, -3, 2]} intensity={0.9} color="#a855f7" />
      <pointLight position={[0, -5, 4]} intensity={0.4} color="#ff1e3c" />
      <Suspense fallback={null}>
        <Globe />
        <Frame />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default HeroFrame;
