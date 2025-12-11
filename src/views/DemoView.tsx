import { useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

type DemoViewProps = {
  showFullscreenButton?: boolean;
  overlay?: ReactNode;
  onMountRefChange?: (el: HTMLDivElement | null) => void;
  onFullscreenChange?: (isFs: boolean) => void;
  inputsDisabled?: boolean;
};

export default function DemoView({
  showFullscreenButton = true,
  overlay,
  onMountRefChange,
  onFullscreenChange,
  inputsDisabled = false,
}: DemoViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onMountRefChange?.(mountRef.current);
    return () => onMountRefChange?.(null);
  }, [onMountRefChange]);

  useEffect(() => {
    if (!mountRef.current) return;

    // ===== SCENE =====
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#87CEEB");
    scene.fog = new THREE.Fog("#87CEEB", 20, 150);

    // ===== CAMERA (FPS) =====
    const camera = new THREE.PerspectiveCamera(125, 800 / 600, 0.05, 500);

    const yawGroup = new THREE.Object3D();
    const pitchGroup = new THREE.Object3D();

    yawGroup.position.set(0, 2, 5);
    yawGroup.add(pitchGroup);
    pitchGroup.add(camera);
    scene.add(yawGroup);

    // ===== RENDERER =====
    const getSize = () => {
      const rect = mountRef.current?.getBoundingClientRect();
      return rect
        ? { width: rect.width, height: rect.height }
        : { width: 800, height: 600 };
    };

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const initialSize = getSize();
    renderer.setSize(initialSize.width, initialSize.height);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // ===== LIGHT =====
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(10, 20, 10);
    sun.castShadow = true;
    scene.add(sun);

    // ===== FLOOR =====
    const groundTexture = (() => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, "#8c6a48");
      gradient.addColorStop(1, "#6d5236");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);

      const image = ctx.getImageData(0, 0, 512, 512);
      for (let i = 0; i < image.data.length; i += 4) {
        const n = Math.floor((Math.random() - 0.5) * 35);
        image.data[i] = Math.min(165, Math.max(90, image.data[i] + n));
        image.data[i + 1] = Math.min(140, Math.max(70, image.data[i + 1] + n));
        image.data[i + 2] = Math.min(115, Math.max(60, image.data[i + 2] + n));
      }
      ctx.putImageData(image, 0, 0);

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(10, 10);
      texture.anisotropy = 8;
      return texture;
    })();

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({
        map: groundTexture ?? undefined,
        color: groundTexture ? undefined : "#8c6a48",
        roughness: 0.92,
        metalness: 0,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // ===== GRID =====
    const grid = new THREE.GridHelper(200, 60, "#ffffff", "#cccccc");
    grid.position.y = 0.02;
    scene.add(grid);

    // ===== GROUND DOTS =====
    const dotGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 6);
    const dotMaterial = new THREE.MeshStandardMaterial({
      color: "#f5f5f5",
      emissive: "#dddddd",
      emissiveIntensity: 0.35,
      roughness: 0.4,
      metalness: 0,
    });
    const dots = new THREE.InstancedMesh(dotGeometry, dotMaterial, 50 * 50);
    let dotIndex = 0;
    for (let x = -50; x < 50; x += 2) {
      for (let z = -50; z < 50; z += 2) {
        const matrix = new THREE.Matrix4();
        matrix.makeTranslation(x, 0.02, z);
        dots.setMatrixAt(dotIndex++, matrix);
      }
    }
    dots.instanceMatrix.needsUpdate = true;
    dots.castShadow = false;
    dots.receiveShadow = true;
    scene.add(dots);

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

    // ===== OBSTACLES =====
    const obstacleGroup = new THREE.Group();
    scene.add(obstacleGroup);

    const spawnRadiusBuffer = 6;
    const spawnRange = AREA - 2;

    const randomXZ = () => {
      let x = 0;
      let z = 0;
      do {
        x = (Math.random() - 0.5) * spawnRange * 2;
        z = (Math.random() - 0.5) * spawnRange * 2;
      } while (Math.hypot(x, z) < spawnRadiusBuffer);
      return new THREE.Vector3(x, 0, z);
    };

    const addRock = (count: number) => {
      for (let i = 0; i < count; i++) {
        const radius = 0.8 + Math.random() * 1.8;
        const rock = new THREE.Mesh(
          new THREE.DodecahedronGeometry(radius, 0),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(
              0.08,
              0.25,
              0.3 + Math.random() * 0.1,
            ),
            roughness: 1,
            metalness: 0.05,
          }),
        );
        const pos = randomXZ();
        rock.position.copy(pos);
        rock.rotation.y = Math.random() * Math.PI;
        rock.castShadow = true;
        rock.receiveShadow = true;
        obstacleGroup.add(rock);
      }
    };

    const addTree = (count: number) => {
      for (let i = 0; i < count; i++) {
        const height = 4 + Math.random() * 3.5;
        const trunkRadius = 0.18 + Math.random() * 0.08;
        const canopyHeight = height * 0.75;
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(
            trunkRadius * 0.85,
            trunkRadius * 1.05,
            height * 0.35,
            12,
          ),
          new THREE.MeshStandardMaterial({
            color: "#5a3b1e",
            roughness: 0.8,
            metalness: 0.05,
          }),
        );
        const canopy = new THREE.Mesh(
          new THREE.ConeGeometry(trunkRadius * 3.4, canopyHeight, 12),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(
              0.32,
              0.6,
              0.28 + Math.random() * 0.05,
            ),
            roughness: 0.58,
            metalness: 0.05,
          }),
        );
        const pos = randomXZ();
        trunk.position.copy(pos);
        trunk.position.y = (height * 0.35) / 2;
        canopy.position.copy(pos);
        canopy.position.y = height * 0.35 + canopyHeight / 2;

        trunk.castShadow = true;
        trunk.receiveShadow = true;
        canopy.castShadow = true;
        canopy.receiveShadow = true;

        obstacleGroup.add(trunk);
        obstacleGroup.add(canopy);
      }
    };

    const addCrate = (count: number) => {
      for (let i = 0; i < count; i++) {
        const size = 1 + Math.random() * 0.8;
        const crate = new THREE.Mesh(
          new THREE.BoxGeometry(size, size, size),
          new THREE.MeshStandardMaterial({
            color: "#8a5a2d",
            roughness: 0.7,
            metalness: 0.05,
          }),
        );
        const pos = randomXZ();
        crate.position.copy(pos);
        crate.position.y = size / 2;
        crate.rotation.y = Math.random() * Math.PI;
        crate.castShadow = true;
        crate.receiveShadow = true;
        obstacleGroup.add(crate);
      }
    };

    const addLog = (count: number) => {
      for (let i = 0; i < count; i++) {
        const length = 2.5 + Math.random() * 2;
        const radius = 0.25 + Math.random() * 0.2;
        const log = new THREE.Mesh(
          new THREE.CylinderGeometry(radius, radius * 1.05, length, 12),
          new THREE.MeshStandardMaterial({
            color: "#5c3b1f",
            roughness: 0.85,
            metalness: 0.02,
          }),
        );
        const pos = randomXZ();
        log.position.copy(pos);
        log.position.y = radius;
        log.rotation.set(
          Math.random() * 0.3,
          Math.random() * Math.PI,
          Math.random() * 0.1,
        );
        log.castShadow = true;
        log.receiveShadow = true;
        obstacleGroup.add(log);
      }
    };

    const addShrub = (count: number) => {
      for (let i = 0; i < count; i++) {
        const size = 0.6 + Math.random() * 0.6;
        const shrub = new THREE.Mesh(
          new THREE.SphereGeometry(size, 12, 10),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(
              0.33,
              0.65,
              0.32 + Math.random() * 0.08,
            ),
            roughness: 0.7,
            metalness: 0.05,
          }),
        );
        const pos = randomXZ();
        shrub.position.copy(pos);
        shrub.position.y = size * 0.7;
        shrub.scale.setScalar(0.95 + Math.random() * 0.35);
        shrub.castShadow = true;
        shrub.receiveShadow = true;
        obstacleGroup.add(shrub);
      }
    };

    const addLowWall = (segments: number) => {
      for (let i = 0; i < segments; i++) {
        const length = 3 + Math.random() * 3;
        const height = 0.8 + Math.random() * 0.5;
        const depth = 0.5 + Math.random() * 0.2;
        const wall = new THREE.Mesh(
          new THREE.BoxGeometry(length, height, depth),
          new THREE.MeshStandardMaterial({
            color: "#b6b0a5",
            roughness: 0.9,
            metalness: 0,
          }),
        );
        const pos = randomXZ();
        wall.position.copy(pos);
        wall.position.y = height / 2;
        wall.rotation.y = Math.random() * Math.PI;
        wall.castShadow = true;
        wall.receiveShadow = true;
        obstacleGroup.add(wall);
      }
    };

    addRock(18);
    addCrate(14);
    addLog(10);
    addShrub(18);
    addTree(20);
    addLowWall(8);

    // ===== INPUT =====
    const keys = { w: false, s: false, a: false, d: false, space: false };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (inputsDisabled) return;
      if (e.code === "KeyW") keys.w = true;
      if (e.code === "KeyS") keys.s = true;
      if (e.code === "KeyA") keys.a = true;
      if (e.code === "KeyD") keys.d = true;
      if (e.code === "Space") keys.space = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (inputsDisabled) return;
      if (e.code === "KeyW") keys.w = false;
      if (e.code === "KeyS") keys.s = false;
      if (e.code === "KeyA") keys.a = false;
      if (e.code === "KeyD") keys.d = false;
      if (e.code === "Space") keys.space = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // ===== MOUSE LOOK =====
    let yaw = 0;
    let pitch = 0;
    let renderYaw = 0;
    let renderPitch = 0;
    let fovPhase = 0;

    window.addEventListener("mousemove", (e) => {
      if (document.pointerLockElement !== renderer.domElement) return;

      yaw -= e.movementX * 0.002;
      pitch -= e.movementY * 0.002;

      pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

    });

    renderer.domElement.onclick = () => {
      renderer.domElement.requestPointerLock();
    };

    const handleResize = () => {
      const { width, height } = getSize();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const handleFullscreenChange = () => {
      const fs = Boolean(document.fullscreenElement);
      setIsFullscreen(fs);
      onFullscreenChange?.(fs);
      handleResize();
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // ===== MOVEMENT (now with jump!) =====
    const velocity = new THREE.Vector3();

    // 기존: 0.12 → 절반
    const accel = 0.007;

    // 기존: 0.88 (마찰은 그대로 둬도 됨)
    const friction = 0.88;

    // 점프 및 중력도 절반
    let verticalVel = 0;
    const gravity = -0.005; // 기존 -0.02 → -0.01
    const jumpPower = 0.3; // 기존 0.45 → 0.225

    let onGround = true;
    let rollOffset = 0;
    let pitchSwayOffset = 0;
    let bobPhase = 0;
    let rollBobOffset = 0;
    let pitchBobOffset = 0;
    let bobOffset = 0;
    let landingRoll = 0;
    let landingPitch = 0;

    // ===== LOOP =====
    function animate() {
      requestAnimationFrame(animate);

      renderYaw = THREE.MathUtils.lerp(renderYaw, yaw, 0.14);
      renderPitch = THREE.MathUtils.lerp(renderPitch, pitch, 0.14);

      yawGroup.rotation.y = renderYaw;
      pitchGroup.rotation.x = renderPitch;

      const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
      const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));

      if (keys.w) velocity.addScaledVector(forward, -accel);
      if (keys.s) velocity.addScaledVector(forward, accel);
      if (keys.a) velocity.addScaledVector(right, -accel);
      if (keys.d) velocity.addScaledVector(right, accel);

      velocity.multiplyScalar(friction);

      const speed = new THREE.Vector2(velocity.x, velocity.z).length();
      const speedNorm = Math.min(speed / 0.25, 1);

      const rightVel = velocity.dot(right.clone().normalize());
      const forwardVel = velocity.dot(forward.clone().normalize());
      const targetRoll = THREE.MathUtils.clamp(-rightVel * 0.625, -0.02, 0.02);
      const targetPitchSway = THREE.MathUtils.clamp(
        forwardVel * -0.45,
        -0.0125,
        0.0125,
      );

      bobPhase += speed * 3;
      const targetRollBob = Math.sin(bobPhase) * 0.01 * speedNorm;
      const targetPitchBob =
        Math.sin(bobPhase + Math.PI / 2) * 0.02 * speedNorm;
      const targetBob = Math.sin(bobPhase) * 0.04 * speedNorm;

      rollOffset = THREE.MathUtils.lerp(rollOffset, targetRoll, 0.2);
      pitchSwayOffset = THREE.MathUtils.lerp(
        pitchSwayOffset,
        targetPitchSway,
        0.2,
      );
      rollBobOffset = THREE.MathUtils.lerp(rollBobOffset, targetRollBob, 0.24);
      pitchBobOffset = THREE.MathUtils.lerp(
        pitchBobOffset,
        targetPitchBob,
        0.24,
      );
      bobOffset = THREE.MathUtils.lerp(bobOffset, targetBob, 0.28);

      camera.rotation.z = rollOffset + rollBobOffset + landingRoll;
      camera.rotation.x = pitchSwayOffset + pitchBobOffset + landingPitch;
      camera.position.y = bobOffset;

      // ===== JUMP =====
      if (keys.space && onGround) {
        verticalVel = jumpPower;
        onGround = false;
      }

      // Apply gravity
      verticalVel += gravity;
      yawGroup.position.y += verticalVel;

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

      // Ground clamp + landing jolt
      if (yawGroup.position.y <= 2) {
        if (!onGround && verticalVel < -0.02) {
          landingRoll = (Math.random() - 0.5) * 0.04;
          landingPitch = -0.025;
        }
        yawGroup.position.y = 2;
        verticalVel = 0;
        onGround = true;
      } else {
        onGround = false;
      }

      landingRoll *= 0.88;
      landingPitch *= 0.88;

      // FOV pulsing based on speed
      fovPhase += speed * 2;
      const baseFov = 125;
      const fovPulse = Math.sin(fovPhase) * 2 * speedNorm;
      camera.fov = baseFov + fovPulse;
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [inputsDisabled]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "relative",
        width: isFullscreen ? "100vw" : "800px",
        maxWidth: "100%",
        height: isFullscreen ? "100vh" : "640px",
        background: "#87CEEB",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
      }}
    >
      {overlay}

      {showFullscreenButton && (
        // biome-ignore lint/a11y/useButtonType: <explanation>
        <button
          onClick={() => {
            if (!mountRef.current) return;
            if (document.fullscreenElement) {
              document.exitFullscreen().catch(() => {});
            } else {
              mountRef.current.requestFullscreen?.().catch(() => {});
            }
          }}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(20,22,35,0.55)",
            color: "#f5f5f5",
            cursor: "pointer",
            fontWeight: 600,
            backdropFilter: "blur(6px)",
          }}
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      )}
    </div>
  );
}
