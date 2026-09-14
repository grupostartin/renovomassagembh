import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface SplashScreenProps {
  onFinished: () => void;
  onLeaving?: () => void;
}

const SPLASH_DURATION = 3800;

export function SplashScreen({ onFinished, onLeaving }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  /* ─── Three.js scene ─── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const isMobileInitial = window.innerWidth < 768;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      isMobileInitial ? 48 : 42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, isMobileInitial ? 10.4 : 8.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd9ecd6, 1.3);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfff7df, 1.9);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xa5cfa8, 1.6, 14);
    pointLight.position.set(0, 1.5, 4);
    scene.add(pointLight);

    // Materials
    const leafMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#4f5844"),
      roughness: 0.32,
      metalness: 0.08,
      clearcoat: 0.55,
      clearcoatRoughness: 0.2,
    });

    const ringMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#4f5844"),
      roughness: 0.3,
      metalness: 0.14,
      clearcoat: 0.65,
    });

    // Leaf geometry helper
    function createLeafGeometry(length: number, width: number, depth: number) {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(-width * 0.85, length * 0.34, -width * 0.85, length * 0.68, 0, length);
      shape.bezierCurveTo(width * 0.85, length * 0.68, width * 0.85, length * 0.34, 0, 0);

      const geo = new THREE.ExtrudeGeometry(shape, {
        steps: 2,
        depth,
        bevelEnabled: true,
        bevelThickness: 0.055,
        bevelSize: 0.045,
        bevelSegments: 7,
      });

      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const spineCurve = Math.sin((y / length) * Math.PI) * 0.06;
        pos.setZ(i, z - spineCurve);
      }
      geo.computeVertexNormals();
      return geo;
    }

    const basePivot = { x: -0.02, y: -0.85 };

    // Logo group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Center leaf
    const centerMesh = new THREE.Mesh(createLeafGeometry(2.4, 0.86, 0.14), leafMaterial);
    centerMesh.position.set(basePivot.x + 0.05, basePivot.y, 0.06);
    centerMesh.rotation.set(-0.06, 0.05, -0.22);
    logoGroup.add(centerMesh);

    // Left leaf
    const leftMesh = new THREE.Mesh(createLeafGeometry(1.68, 0.76, 0.12), leafMaterial);
    leftMesh.position.set(basePivot.x - 0.04, basePivot.y + 0.03, 0.03);
    leftMesh.rotation.set(-0.08, 0.1, 0.64);
    logoGroup.add(leftMesh);

    // Right leaf
    const rightMesh = new THREE.Mesh(createLeafGeometry(1.52, 0.72, 0.12), leafMaterial);
    rightMesh.position.set(basePivot.x + 0.12, basePivot.y + 0.02, 0.04);
    rightMesh.rotation.set(0.06, -0.09, -1.22);
    logoGroup.add(rightMesh);

    // Arc
    const arcRadius = 1.62;
    const arcCenter = { x: -0.16, y: 0.28 };
    const startAngle = Math.PI * 1.18;
    const endAngle = Math.PI * 0.22;
    const arcPoints: THREE.Vector3[] = [];
    const steps = 60;
    const totalSpan = 2 * Math.PI - startAngle + endAngle;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = startAngle + t * totalSpan;
      arcPoints.push(
        new THREE.Vector3(
          arcCenter.x + arcRadius * Math.cos(angle),
          arcCenter.y + arcRadius * Math.sin(angle),
          Math.sin(t * Math.PI) * 0.05
        )
      );
    }

    const arcCurve = new THREE.CatmullRomCurve3(arcPoints);
    const arcMesh = new THREE.Mesh(new THREE.TubeGeometry(arcCurve, 64, 0.038, 16, false), ringMaterial);
    logoGroup.add(arcMesh);
    logoGroup.position.set(0.08, -0.15, 0);

    // Particles
    const pCount = 35;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i]     = (Math.random() - 0.5) * 8.5;
      pPos[i + 1] = (Math.random() - 0.5) * 7;
      pPos[i + 2] = (Math.random() - 0.5) * 4;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.09, color: 0x98b898, transparent: true, opacity: 0.65 })));

    // Mouse & touch parallax
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      pointer.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        pointer.targetX = (touch.clientX / window.innerWidth) * 2 - 1;
        pointer.targetY = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };
    const onTouchEnd = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    // Entry animation
    logoGroup.scale.set(0.01, 0.01, 0.01);
    const getTargetScale = () => (window.innerWidth < 768 ? 0.98 : 1.45);
    const startTime = performance.now();
    let rafId = 0;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) / 1000;
      const targetScale = getTargetScale();
      const isMobile = window.innerWidth < 768;

      if (logoGroup.scale.x < targetScale) {
        logoGroup.scale.x += (targetScale - logoGroup.scale.x) * 0.055;
        logoGroup.scale.y = logoGroup.scale.x;
        logoGroup.scale.z = logoGroup.scale.x;
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      // Vertical floating motion centered harmoniously on both mobile and desktop
      const baseY = isMobile ? -0.10 : -0.28;
      const floatAmp = isMobile ? 0.05 : 0.08;
      logoGroup.position.y = baseY + Math.sin(elapsed * 1.35) * floatAmp;

      // Dynamic auto-sway gives living light reflections even on mobile without pointer movement
      const autoSwayY = Math.sin(elapsed * 0.6) * 0.22;
      const autoSwayX = Math.cos(elapsed * 0.9) * 0.05;
      logoGroup.rotation.y = autoSwayY + pointer.x * 0.38;
      logoGroup.rotation.x = autoSwayX - pointer.y * 0.28;

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      const isMob = window.innerWidth < 768;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.fov = isMob ? 48 : 42;
      camera.position.z = isMob ? 10.4 : 8.2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  /* ─── Progress + exit timer ─── */
  useEffect(() => {
    const interval = 25;
    let current = 0;
    const timer = setInterval(() => {
      current += (interval / SPLASH_DURATION) * 100;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(() => {
          setLeaving(true);
          onLeaving?.();
          setTimeout(onFinished, 850);
        }, 350);
      }
      setProgress(current);
    }, interval);
    return () => clearInterval(timer);
  }, [onFinished, onLeaving]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at 50% 46%, #f6fbf6 0%, #e5f0e6 50%, #d8e8da 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: leaving ? 0 : 1,
        transform: leaving ? "scale(1.04)" : "scale(1)",
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      {/* Brand Title — Renovo Massagem acima de tudo */}
      <div
        style={{
          position: "absolute",
          top: "calc(max(20px, 5.5vh) + env(safe-area-inset-top, 0px))",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          pointerEvents: "none",
          userSelect: "none",
          animation: "splashTitleIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.1rem, 6.5vw, 3.25rem)",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "#343d2c",
            textTransform: "uppercase",
            lineHeight: 1.1,
            textShadow: "0 2px 18px rgba(79, 88, 68, 0.12)",
          }}
        >
          Renovo
        </span>
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(0.72rem, 2.2vw, 0.88rem)",
            fontWeight: 600,
            letterSpacing: "0.42em",
            color: "#546048",
            textTransform: "uppercase",
            marginTop: "6px",
            paddingLeft: "0.42em",
          }}
        >
          Massagem
        </span>
        <div
          style={{
            width: "36px",
            height: "1.5px",
            background: "linear-gradient(90deg, transparent, rgba(79, 88, 68, 0.4), transparent)",
            marginTop: "10px",
          }}
        />
      </div>

      {/* Three.js canvas */}
      <div
        ref={containerRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
      />

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: "calc(max(28px, 4.5vh) + env(safe-area-inset-bottom, 0px))",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 9,
          width: "clamp(150px, 42vw, 190px)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 3,
            background: "rgba(79, 88, 68, 0.15)",
            borderRadius: 999,
            overflow: "hidden",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.min(progress, 100)}%`,
              background: "linear-gradient(90deg, #788a6d, #4f5844)",
              borderRadius: 999,
              transition: "width 0.08s linear",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(78, 87, 67, 0.75)",
            fontWeight: 600,
            fontFamily: "'Plus Jakarta Sans', monospace, sans-serif",
            paddingLeft: "0.28em",
          }}
        >
          Carregando
        </span>
      </div>
    </div>
  );
}
