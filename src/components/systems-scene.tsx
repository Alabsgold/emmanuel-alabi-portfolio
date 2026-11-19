"use client";

// The "systems world" behind the home page: a gold core wired to the stack the studio ships
// with, data pulses running along the links, and a camera that flies through it as the page
// scrolls. Per-frame work mutates refs inside useFrame (R3F v9 guidance), never React state.

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor, QuadraticBezierLine } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const GOLD = "#e3b54f";
const NODES = [
  { label: "Next.js", meta: "Storefronts" },
  { label: "Django", meta: "Payments API" },
  { label: "PostgreSQL", meta: "Orders" },
  { label: "Paystack", meta: "Checkout" },
  { label: "WhatsApp", meta: "Order desk" },
  { label: "Nginx", meta: "VPS hosting" },
];

// Camera keyframes along the page's scroll progress (0 = top, 1 = bottom).
type Stop = { p: number; pos: [number, number, number]; look: [number, number, number] };
const DESKTOP_STOPS: Stop[] = [
  { p: 0, pos: [0.4, 0.8, 10.5], look: [-3.6, 0, 0] }, // hero: core sits on the right
  { p: 0.22, pos: [6.5, 2.8, 5.6], look: [0, 0, 0] }, // services: swing round the nodes
  { p: 0.48, pos: [-7, 1.2, 4.6], look: [1, 0, 0] }, // work
  { p: 0.74, pos: [0.4, 9.5, 2.6], look: [0, 0, 0] }, // about: from above
  { p: 1, pos: [0, 0.2, 4.4], look: [0, 0, 0] }, // contact: into the core
];
const MOBILE_STOPS: Stop[] = DESKTOP_STOPS.map((s) => ({
  ...s,
  pos: [s.pos[0] * 0.8, s.pos[1], s.pos[2] * 1.45] as Stop["pos"],
  look: [0, s.look[1], 0],
}));

const smooth = (t: number) => t * t * (3 - 2 * t);

// Shared, mutable input read inside the render loop.
const input = { scroll: 0, px: 0, py: 0 };

function readScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  input.scroll = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

const tmpB = new THREE.Vector3();
function sample(stops: Stop[], p: number, pos: THREE.Vector3, look: THREE.Vector3) {
  let i = 0;
  while (i < stops.length - 2 && p > stops[i + 1].p) i++;
  const a = stops[i];
  const b = stops[i + 1];
  const t = smooth(Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p))));
  pos.set(...a.pos).lerp(tmpB.set(...b.pos), t);
  look.set(...a.look).lerp(tmpB.set(...b.look), t);
}

function CameraRig({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  const stops = mobile ? MOBILE_STOPS : DESKTOP_STOPS;
  // per-frame scratch vectors live in refs: they are mutated every frame
  const vecs = useRef({ target: new THREE.Vector3(), look: new THREE.Vector3(), lookNow: new THREE.Vector3(-3.6, 0, 0) });

  useFrame(({ camera }, delta) => {
    const { target, look, lookNow } = vecs.current;
    sample(stops, input.scroll, target, look);
    if (!reduced && !mobile) {
      target.x += input.px * 0.6;
      target.y += input.py * 0.35;
    }
    const k = reduced ? 1 : 1 - Math.exp(-3.2 * delta);
    camera.position.lerp(target, k);
    lookNow.lerp(look, k);
    camera.lookAt(lookNow);
  });
  return null;
}

function Core({ reduced }: { reduced: boolean }) {
  const cage = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (reduced) return;
    if (cage.current) {
      cage.current.rotation.y += delta * 0.18;
      cage.current.rotation.x += delta * 0.07;
    }
    if (ring.current) ring.current.rotation.z += delta * 0.25;
  });
  return (
    <group>
      <mesh ref={cage}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.42, 48, 48]} />
        <meshStandardMaterial color="#2a1d05" emissive={GOLD} emissiveIntensity={1.3} toneMapped={false} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.9, 0.012, 8, 160]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.55} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Node labels are painted once into a canvas and shown as camera-facing sprites: no DOM
// overlay per node (drei <Html> mounts a React root per label, which raced React's render).
function makeLabel(label: string, meta: string) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 160;
  const g = c.getContext("2d")!;
  g.textAlign = "center";
  g.fillStyle = "#ece8df";
  g.font = "500 54px ui-monospace, SFMono-Regular, Menlo, monospace";
  g.fillText(label, 256, 70);
  g.fillStyle = GOLD;
  g.font = "400 34px ui-monospace, SFMono-Regular, Menlo, monospace";
  g.fillText(meta, 256, 130);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function Label({ position, label, meta }: { position: THREE.Vector3; label: string; meta: string }) {
  const tex = useMemo(() => makeLabel(label, meta), [label, meta]);
  useEffect(() => () => tex.dispose(), [tex]);
  return (
    <sprite position={position} scale={[1.25, 0.39, 1]}>
      <spriteMaterial map={tex} transparent depthWrite={false} toneMapped={false} />
    </sprite>
  );
}

function Link({ end, index, reduced, mobile }: { end: THREE.Vector3; index: number; reduced: boolean; mobile: boolean }) {
  const start = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const mid = useMemo(() => end.clone().multiplyScalar(0.5).add(new THREE.Vector3(0, 0.9, 0)), [end]);
  const curve = useMemo(() => new THREE.QuadraticBezierCurve3(start, mid, end), [start, mid, end]);
  const labelPos = useMemo(() => end.clone().add(new THREE.Vector3(0, 0.38, 0)), [end]);
  const pulse = useRef<THREE.Mesh>(null);
  const node = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = reduced ? 0.55 : (clock.elapsedTime * 0.32 + index / NODES.length) % 1;
    // pulses run out to the tool and back, like a request and its answer
    const along = index % 2 ? 1 - t : t;
    pulse.current?.position.copy(curve.getPoint(along));
    if (node.current && !reduced) node.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2 + index) * 0.08);
  });

  const meta = NODES[index];
  return (
    <group>
      <QuadraticBezierLine start={start} end={end} mid={mid} color={GOLD} lineWidth={1} transparent opacity={0.45} />
      <mesh ref={pulse}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color="#fff1c9" toneMapped={false} />
      </mesh>
      <mesh ref={node} position={end}>
        <sphereGeometry args={[0.11, 32, 32]} />
        <meshStandardMaterial color="#141008" emissive={GOLD} emissiveIntensity={0.9} toneMapped={false} />
      </mesh>
      {!mobile && <Label position={labelPos} label={meta.label} meta={meta.meta} />}
    </group>
  );
}

function Stack({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ends = useMemo(
    () =>
      NODES.map((_, i) => {
        const a = (i / NODES.length) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(a) * 3.5, Math.sin(i * 1.7) * 1.15, Math.sin(a) * 3.5);
      }),
    [],
  );
  useFrame((_, delta) => {
    if (group.current && !reduced) group.current.rotation.y += delta * 0.05;
  });
  return (
    <group ref={group}>
      {ends.map((end, i) => (
        <Link key={NODES[i].label} end={end} index={i} reduced={reduced} mobile={mobile} />
      ))}
    </group>
  );
}

// Deterministic pseudo-random numbers so the starfield is the same on every visit.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Starfield({ count, reduced }: { count: number; reduced: boolean }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = seeded(42);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // a shell between radius 9 and 32, so the core stays clear
      const r = 9 + rand() * 23;
      const th = rand() * Math.PI * 2;
      const ph = Math.acos(2 * rand() - 1);
      arr.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.6, r * Math.sin(ph) * Math.sin(th)], i * 3);
    }
    return arr;
  }, [count]);
  useFrame((_, delta) => {
    if (points.current && !reduced) points.current.rotation.y -= delta * 0.012;
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#d9c08a" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function ScrollInvalidator() {
  // with frameloop="demand" (reduced motion) a frame is drawn only when the page scrolls
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const on = () => invalidate();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [invalidate]);
  return null;
}

export default function SystemsScene() {
  const [mobile] = useState(() => window.innerWidth < 768);
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [dpr, setDpr] = useState(1.5);
  const [glow, setGlow] = useState(!mobile);

  useEffect(() => {
    readScroll();
    const onScroll = () => readScroll();
    const onMove = (e: PointerEvent) => {
      input.px = (e.clientX / window.innerWidth) * 2 - 1;
      input.py = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : dpr}
      frameloop={reduced ? "demand" : "always"}
      camera={{ fov: 42, near: 0.1, far: 100, position: [0.6, 0.6, 9.5] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      fallback={<div className="scene-fallback" />}
      aria-hidden="true"
    >
      <color attach="background" args={["#07090d"]} />
      <fog attach="fog" args={["#07090d", 12, 34]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={12} color={GOLD} distance={10} />
      <PerformanceMonitor
        onDecline={() => {
          setDpr(1);
          setGlow(false);
        }}
        onIncline={() => setDpr(1.75)}
      />
      {reduced && <ScrollInvalidator />}
      <CameraRig mobile={mobile} reduced={reduced} />
      <Core reduced={reduced} />
      <Stack reduced={reduced} mobile={mobile} />
      <Starfield count={mobile ? 700 : 1600} reduced={reduced} />
      {glow && (
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.55} luminanceSmoothing={0.25} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
