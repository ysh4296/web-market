import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DemoView() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // ===== SCENE =====
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#87CEEB");
    scene.fog = new THREE.Fog("#87CEEB", 20, 150);

    // ===== CAMERA (FPS) =====
    const camera = new THREE.PerspectiveCamera(110, 800 / 600, 0.1, 500);

    const yawGroup = new THREE.Object3D();
    const pitchGroup = new THREE.Object3D();

    yawGroup.position.set(0, 2, 5);
    yawGroup.add(pitchGroup);
    pitchGroup.add(camera);
    scene.add(yawGroup);

    // ===== RENDERER =====
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 600);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // ===== LIGHT =====
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(10, 20, 10);
    sun.castShadow = true;
    scene.add(sun);

    // ===== FLOOR =====
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshPhongMaterial({ color: "#8B4513" }),
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // ===== GRID =====
    const grid = new THREE.GridHelper(200, 60, "#ffffff", "#cccccc");
    grid.position.y = 0.02;
    scene.add(grid);

    // ===== BOUNDARY AREA =====
    const AREA = 40;

    const wallMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.05,
      transparent: true,
      side: THREE.DoubleSide,
    });

    function createWall(x: number, z: number, rotY: number) {
      const wall = new THREE.Mesh(new THREE.PlaneGeometry(80, 8), wallMaterial);
      wall.position.set(x, 4, z);
      wall.rotation.y = rotY;
      scene.add(wall);
    }

    createWall(AREA, 0, Math.PI);
    createWall(-AREA, 0, 0);
    createWall(0, AREA, -Math.PI / 2);
    createWall(0, -AREA, Math.PI / 2);

    // =====================================================
    // ========== TREE GENERATION (UNCHANGED) ==============
    // =====================================================

    for (let i = 0; i < 60; i++) {
      const x = (Math.random() - 0.5) * AREA * 2;
      const z = (Math.random() - 0.5) * AREA * 2;

      const trunkHeight = 2 + Math.random() * 4;

      const trunk = new THREE.Mesh(
        new THREE.BoxGeometry(1, trunkHeight, 1),
        new THREE.MeshPhongMaterial({ color: "#000000" }),
      );
      trunk.position.set(x, trunkHeight / 2, z);
      scene.add(trunk);

      const canopyCount = 2 + Math.floor(Math.random() * 3);

      for (let j = 0; j < canopyCount; j++) {
        const size = 2 + Math.random() * 1.5;

        const canopy = new THREE.Mesh(
          new THREE.BoxGeometry(size, size, size),
          new THREE.MeshPhongMaterial({ color: "#1FAF1F" }),
        );

        canopy.position.set(
          x + (Math.random() - 0.5) * 1.5,
          trunkHeight + size / 2 + Math.random() * 1.2,
          z + (Math.random() - 0.5) * 1.5,
        );

        scene.add(canopy);
      }
    }

    // ===== INPUT =====
    const keys = { w: false, s: false, a: false, d: false, space: false };

    window.addEventListener("keydown", (e) => {
      if (e.code === "KeyW") keys.w = true;
      if (e.code === "KeyS") keys.s = true;
      if (e.code === "KeyA") keys.a = true;
      if (e.code === "KeyD") keys.d = true;
      if (e.code === "Space") keys.space = true;
    });

    window.addEventListener("keyup", (e) => {
      if (e.code === "KeyW") keys.w = false;
      if (e.code === "KeyS") keys.s = false;
      if (e.code === "KeyA") keys.a = false;
      if (e.code === "KeyD") keys.d = false;
      if (e.code === "Space") keys.space = false;
    });

    // ===== MOUSE LOOK =====
    let yaw = 0;
    let pitch = 0;

    window.addEventListener("mousemove", (e) => {
      if (document.pointerLockElement !== renderer.domElement) return;

      yaw -= e.movementX * 0.002;
      pitch -= e.movementY * 0.002;

      pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

      yawGroup.rotation.y = yaw;
      pitchGroup.rotation.x = pitch;
    });

    renderer.domElement.onclick = () => {
      renderer.domElement.requestPointerLock();
    };

    // ===== MOVEMENT (now with jump!) =====
    const velocity = new THREE.Vector3();

    // 기존: 0.12 → 절반
    const accel = 0.03;

    // 기존: 0.88 (마찰은 그대로 둬도 됨)
    const friction = 0.88;

    // 점프 및 중력도 절반
    let verticalVel = 0;
    const gravity = -0.005; // 기존 -0.02 → -0.01
    const jumpPower = 0.3; // 기존 0.45 → 0.225

    let onGround = true;

    // ===== LOOP =====
    function animate() {
      requestAnimationFrame(animate);

      const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
      const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));

      if (keys.w) velocity.addScaledVector(forward, -accel);
      if (keys.s) velocity.addScaledVector(forward, accel);
      if (keys.a) velocity.addScaledVector(right, -accel);
      if (keys.d) velocity.addScaledVector(right, accel);

      velocity.multiplyScalar(friction);

      // ===== JUMP =====
      if (keys.space && onGround) {
        verticalVel = jumpPower;
        onGround = false;
      }

      // Apply gravity
      verticalVel += gravity;
      yawGroup.position.y += verticalVel;

      // Hit the ground
      if (yawGroup.position.y <= 2) {
        yawGroup.position.y = 2;
        verticalVel = 0;
        onGround = true;
      }

      // Horizontal movement
      yawGroup.position.add(new THREE.Vector3(velocity.x, 0, velocity.z));

      // Boundary
      yawGroup.position.x = Math.max(
        -AREA + 1,
        Math.min(AREA - 1, yawGroup.position.x),
      );
      yawGroup.position.z = Math.max(
        -AREA + 1,
        Math.min(AREA - 1, yawGroup.position.z),
      );

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "800px", height: "600px", background: "#87CEEB" }}
    />
  );
}
