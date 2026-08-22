import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import {
  TECH_HUBS,
  DATA_CONNECTIONS,
  latLngToVector3,
  createArcCurve,
  createProceduralEarthTexture,
  createProceduralCloudsTexture,
  generateEarthPointMatrix,
  TechHub,
} from '../utils/earthTextures';

export type EarthMode = 'cyber_matrix' | 'blue_marble' | 'holo_vector';

// Helper to generate glowing circular orb texture
function createGlowSpriteTexture(colorHex = '#38bdf8'): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(165, 180, 252, 0.9)');
    gradient.addColorStop(0.5, colorHex);
    gradient.addColorStop(0.8, 'rgba(56, 189, 248, 0.15)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const ThreeBackground: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // User Preferences from localStorage
  const [earthMode] = useState<EarthMode>(() => {
    const saved = localStorage.getItem('portfolio_earth_mode');
    if (saved === 'cyber_matrix' || saved === 'blue_marble' || saved === 'holo_vector') {
      return saved;
    }
    return 'cyber_matrix';
  });

  const [isEnabled] = useState<boolean>(() => {
    return localStorage.getItem('three_bg_enabled') !== 'false';
  });

  const [speedMultiplier] = useState<number>(() => {
    const saved = localStorage.getItem('portfolio_earth_speed');
    return saved ? parseFloat(saved) : 1;
  });

  const [showDataArcs] = useState<boolean>(true);

  const isDark = theme === 'dark';

  // Manual rotation refs for drag
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const globeRotationVelocityRef = useRef({ x: 0, y: 0.0018 });

  useEffect(() => {
    if (!isEnabled || !containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // --- 1. Three.js Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const fogColor = isDark ? 0x050716 : 0xf1f5f9;
    scene.fog = new THREE.FogExp2(fogColor, 0.0006);

    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 4000);
    camera.position.z = 820;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(isDark ? 0x050716 : 0xf8fafc, isDark ? 1 : 0.95);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- 2. Ambient Deep Space Starfield & Constellation Network ---
    const starCount = window.innerWidth < 768 ? 90 : 180;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    const starPalette = isDark
      ? [
          new THREE.Color('#38bdf8'),
          new THREE.Color('#818cf8'),
          new THREE.Color('#c084fc'),
          new THREE.Color('#67e8f9'),
          new THREE.Color('#e0e7ff'),
        ]
      : [
          new THREE.Color('#4338ca'),
          new THREE.Color('#0284c7'),
          new THREE.Color('#6d28d9'),
          new THREE.Color('#2563eb'),
        ];

    const bound = 1400;
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * bound * 2;
      starPositions[i3 + 1] = (Math.random() - 0.5) * bound * 2;
      starPositions[i3 + 2] = (Math.random() - 0.5) * bound * 2 - 300;

      const col = starPalette[Math.floor(Math.random() * starPalette.length)];
      starColors[i3] = col.r;
      starColors[i3 + 1] = col.g;
      starColors[i3 + 2] = col.b;

      starSizes[i] = Math.random() * 16 + 10;
    }

    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const glowTexture = createGlowSpriteTexture('#818cf8');
    const starsMat = new THREE.PointsMaterial({
      size: isDark ? 20 : 15,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.85 : 0.6,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const starsMesh = new THREE.Points(starsGeo, starsMat);
    scene.add(starsMesh);

    // --- 3. Main 3D Earth Group ---
    const globeRadius = window.innerWidth < 768 ? 160 : 210;
    const earthGroup = new THREE.Group();
    // Realistic Earth Axial Tilt (23.5 degrees)
    earthGroup.rotation.z = 23.5 * (Math.PI / 180);
    // Center position offset slightly to right on desktop for great portfolio composition
    earthGroup.position.set(window.innerWidth > 1024 ? 120 : 0, 0, 0);
    scene.add(earthGroup);

    // --- 4. Earth Mode Specific Assets ---

    // A. Mode 1: Cyber Matrix Dot Grid
    let matrixPointsMesh: THREE.Points | null = null;
    let cyberInnerSphere: THREE.Mesh | null = null;

    if (earthMode === 'cyber_matrix') {
      const matrixData = generateEarthPointMatrix(globeRadius, 4200);
      const matrixGeo = new THREE.BufferGeometry();
      matrixGeo.setAttribute('position', new THREE.BufferAttribute(matrixData.positions, 3));
      matrixGeo.setAttribute('color', new THREE.BufferAttribute(matrixData.colors, 3));

      const matrixMat = new THREE.PointsMaterial({
        size: isDark ? 10 : 8,
        map: glowTexture,
        vertexColors: true,
        transparent: true,
        opacity: isDark ? 0.95 : 0.8,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      });

      matrixPointsMesh = new THREE.Points(matrixGeo, matrixMat);
      earthGroup.add(matrixPointsMesh);

      // Dark translucent inner ocean sphere
      const sphereGeo = new THREE.SphereGeometry(globeRadius - 2, 48, 48);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0x050b1e : 0xe0e7ff,
        transparent: true,
        opacity: isDark ? 0.85 : 0.6,
      });
      cyberInnerSphere = new THREE.Mesh(sphereGeo, sphereMat);
      earthGroup.add(cyberInnerSphere);
    }

    // B. Mode 2: Blue Marble Globe with Clouds
    let marbleMesh: THREE.Mesh | null = null;
    let cloudsMesh: THREE.Mesh | null = null;

    if (earthMode === 'blue_marble') {
      const earthTex = createProceduralEarthTexture(isDark);
      const marbleGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
      const marbleMat = new THREE.MeshBasicMaterial({
        map: earthTex,
        transparent: true,
        opacity: isDark ? 0.95 : 0.9,
      });
      marbleMesh = new THREE.Mesh(marbleGeo, marbleMat);
      earthGroup.add(marbleMesh);

      // Clouds Layer
      const cloudsTex = createProceduralCloudsTexture();
      const cloudsGeo = new THREE.SphereGeometry(globeRadius + 5, 48, 48);
      const cloudsMat = new THREE.MeshBasicMaterial({
        map: cloudsTex,
        transparent: true,
        opacity: isDark ? 0.35 : 0.45,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      });
      cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
      earthGroup.add(cloudsMesh);
    }

    // C. Mode 3: Holographic Vector Geodesic Wireframe
    let holoWireframeMesh: THREE.LineSegments | null = null;
    let holoIcosahedron: THREE.LineSegments | null = null;

    if (earthMode === 'holo_vector') {
      const holoGeo = new THREE.SphereGeometry(globeRadius, 28, 28);
      const wireframe = new THREE.WireframeGeometry(holoGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: isDark ? 0x38bdf8 : 0x4f46e5,
        transparent: true,
        opacity: isDark ? 0.45 : 0.3,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      });
      holoWireframeMesh = new THREE.LineSegments(wireframe, wireMat);
      earthGroup.add(holoWireframeMesh);

      // Inner Geodesic Core
      const icoGeo = new THREE.IcosahedronGeometry(globeRadius * 0.75, 2);
      const icoWire = new THREE.WireframeGeometry(icoGeo);
      const icoMat = new THREE.LineBasicMaterial({
        color: isDark ? 0xa855f7 : 0x7c3aed,
        transparent: true,
        opacity: isDark ? 0.35 : 0.2,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      });
      holoIcosahedron = new THREE.LineSegments(icoWire, icoMat);
      earthGroup.add(holoIcosahedron);
    }

    // --- 5. Atmospheric Fresnel Glow Halos ---
    const atmosphereRadius = globeRadius * 1.15;
    const atmosphereGeo = new THREE.SphereGeometry(atmosphereRadius, 36, 36);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 uColor;
        uniform float uIntensity;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8) * uIntensity;
          gl_FragColor = vec4(uColor, intensity);
        }
      `,
      uniforms: {
        uColor: { value: new THREE.Color(isDark ? '#38bdf8' : '#6366f1') },
        uIntensity: { value: isDark ? 1.6 : 0.9 },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    earthGroup.add(atmosphereMesh);

    // --- 6. Equatorial & Polar Orbital Telemetry Rings ---
    const orbitalGroup = new THREE.Group();
    earthGroup.add(orbitalGroup);

    const createRing = (radius: number, color: string, rotationX: number, rotationY: number) => {
      const ringGeo = new THREE.RingGeometry(radius - 1, radius + 1, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isDark ? 0.35 : 0.2,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotationX;
      ringMesh.rotation.y = rotationY;
      return ringMesh;
    };

    const ring1 = createRing(globeRadius * 1.35, isDark ? '#818cf8' : '#4f46e5', Math.PI / 2, 0);
    const ring2 = createRing(globeRadius * 1.5, isDark ? '#38bdf8' : '#0284c7', Math.PI / 3, Math.PI / 6);
    orbitalGroup.add(ring1);
    orbitalGroup.add(ring2);

    // --- 7. Tech Hub City Markers & Pulsating Radar Beacons ---
    const hubMarkersGroup = new THREE.Group();
    earthGroup.add(hubMarkersGroup);

    const hubBeacons: Array<{
      mesh: THREE.Mesh;
      ring: THREE.Mesh;
      baseScale: number;
      pulseSpeed: number;
      hub: TechHub;
    }> = [];

    TECH_HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, globeRadius + 2);

      // Core City Beacon Sphere
      const dotGeo = new THREE.SphereGeometry(hub.isHome ? 3.5 : 2.2, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: hub.isHome
          ? new THREE.Color(isDark ? '#38bdf8' : '#2563eb')
          : new THREE.Color(isDark ? '#f59e0b' : '#d97706'),
      });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.copy(pos);
      hubMarkersGroup.add(dotMesh);

      // Pulsating Radar Wave Ring
      const pulseGeo = new THREE.RingGeometry(2, hub.isHome ? 8 : 5, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: hub.isHome
          ? new THREE.Color(isDark ? '#38bdf8' : '#2563eb')
          : new THREE.Color(isDark ? '#f59e0b' : '#d97706'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.position.copy(pos);
      pulseMesh.lookAt(pos.clone().multiplyScalar(2));
      hubMarkersGroup.add(pulseMesh);

      hubBeacons.push({
        mesh: dotMesh,
        ring: pulseMesh,
        baseScale: 1,
        pulseSpeed: hub.isHome ? 2.5 : 1.8,
        hub,
      });
    });

    // --- 8. Dynamic 3D Curved Great-Circle Data Arcs & Traveling Photons ---
    const arcsGroup = new THREE.Group();
    earthGroup.add(arcsGroup);

    const activePhotons: Array<{
      curve: THREE.CubicBezierCurve3;
      mesh: THREE.Mesh;
      progress: number;
      speed: number;
    }> = [];

    if (showDataArcs) {
      DATA_CONNECTIONS.forEach(([fromIdx, toIdx]) => {
        const fromHub = TECH_HUBS[fromIdx];
        const toHub = TECH_HUBS[toIdx];
        if (!fromHub || !toHub) return;

        const p1 = latLngToVector3(fromHub.lat, fromHub.lng, globeRadius);
        const p2 = latLngToVector3(toHub.lat, toHub.lng, globeRadius);
        const curve = createArcCurve(p1, p2, 65);

        // Arc Tube Line
        const points = curve.getPoints(50);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
        const arcMat = new THREE.LineBasicMaterial({
          color: fromHub.isHome
            ? new THREE.Color(isDark ? '#38bdf8' : '#2563eb')
            : new THREE.Color(isDark ? '#a855f7' : '#7c3aed'),
          transparent: true,
          opacity: isDark ? 0.55 : 0.35,
          blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        arcsGroup.add(arcLine);

        // Traveling Photon Particle
        const photonGeo = new THREE.SphereGeometry(2.4, 8, 8);
        const photonMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(isDark ? '#ffffff' : '#38bdf8'),
          blending: THREE.AdditiveBlending,
        });
        const photonMesh = new THREE.Mesh(photonGeo, photonMat);
        arcsGroup.add(photonMesh);

        activePhotons.push({
          curve,
          mesh: photonMesh,
          progress: Math.random(),
          speed: Math.random() * 0.006 + 0.004,
        });
      });
    }

    // --- 9. Orbiting Communications Satellite (ISS / Relay) ---
    const satelliteGroup = new THREE.Group();
    earthGroup.add(satelliteGroup);

    const satBodyGeo = new THREE.BoxGeometry(4, 4, 8);
    const satBodyMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(isDark ? '#e0e7ff' : '#475569'),
    });
    const satBody = new THREE.Mesh(satBodyGeo, satBodyMat);
    satelliteGroup.add(satBody);

    // Solar panels
    const panelGeo = new THREE.BoxGeometry(16, 0.5, 5);
    const panelMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(isDark ? '#38bdf8' : '#0284c7'),
    });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    satelliteGroup.add(panel);

    const satOrbitRadius = globeRadius * 1.42;

    // --- 10. Mouse Interaction & Touch Drag Orbit Handling ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollYOffset = window.scrollY;

    const onMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetMouseX = (e.clientX - halfW) / halfW;
      targetMouseY = (e.clientY - halfH) / halfH;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;

        earthGroup.rotation.y += deltaX * 0.005;
        earthGroup.rotation.x += deltaY * 0.005;

        globeRotationVelocityRef.current = {
          x: deltaY * 0.002,
          y: deltaX * 0.002,
        };

        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Don't intercept clicks on interactive buttons or cards
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, select')) return;

      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onScroll = () => {
      scrollYOffset = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Touch Support
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDraggingRef.current) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - previousMousePositionRef.current.x;
        const deltaY = touch.clientY - previousMousePositionRef.current.y;

        earthGroup.rotation.y += deltaX * 0.006;
        earthGroup.rotation.x += deltaY * 0.006;

        previousMousePositionRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const target = e.target as HTMLElement;
        if (target.closest('button, a, input, textarea, select')) return;
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // --- 11. Window Resize Handling ---
    const onResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth || window.innerWidth;
      height = containerRef.current.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Reposition earth according to screen width
      earthGroup.position.x = width > 1024 ? 120 : 0;
    };

    window.addEventListener('resize', onResize);

    // --- 12. Main 60FPS Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      const speed = speedMultiplier;

      // Mouse Parallax Damping
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Camera Gentle Sway with Scroll Depth
      camera.position.x = mouseX * 60;
      camera.position.y = -mouseY * 60 - scrollYOffset * 0.12;
      camera.lookAt(earthGroup.position.x * 0.5, -scrollYOffset * 0.12, 0);

      // Auto Rotation & Inertia Damping
      if (!isDraggingRef.current) {
        earthGroup.rotation.y += 0.0018 * speed;
      } else {
        earthGroup.rotation.y += globeRotationVelocityRef.current.y;
        earthGroup.rotation.x += globeRotationVelocityRef.current.x;
        globeRotationVelocityRef.current.x *= 0.95;
        globeRotationVelocityRef.current.y *= 0.95;
      }

      // Rotate Clouds slightly faster than Earth (Realistic differential atmospheric rotation)
      if (cloudsMesh) {
        cloudsMesh.rotation.y += 0.0024 * speed;
      }

      // Rotate Holographic Geodesic Core
      if (holoIcosahedron) {
        holoIcosahedron.rotation.x += 0.004 * speed;
        holoIcosahedron.rotation.y += 0.006 * speed;
      }

      // Rotate Orbital Telemetry Rings
      ring1.rotation.z += 0.003 * speed;
      ring2.rotation.z -= 0.004 * speed;

      // Update Orbiting Satellite Position
      const satAngle = elapsedTime * 0.4 * speed;
      satelliteGroup.position.set(
        Math.cos(satAngle) * satOrbitRadius,
        Math.sin(satAngle * 1.5) * (satOrbitRadius * 0.4),
        Math.sin(satAngle) * satOrbitRadius
      );
      satelliteGroup.lookAt(earthGroup.position);

      // Animate City Pulsating Radar Waves
      hubBeacons.forEach(({ ring, pulseSpeed }) => {
        const s = ((elapsedTime * pulseSpeed) % 1.6) + 0.6;
        ring.scale.set(s, s, s);
        (ring.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (s - 0.6) / 1.6);
      });

      // Animate Traveling Photons along Data Arcs
      activePhotons.forEach((photon) => {
        photon.progress = (photon.progress + photon.speed * speed) % 1;
        const pt = photon.curve.getPoint(photon.progress);
        photon.mesh.position.copy(pt);
      });

      // Rotate Background Starfield slowly
      starsMesh.rotation.y += 0.0003 * speed;

      renderer.render(scene, camera);
    };

    animate();

    // --- 13. Cleanup on Unmount / Config Change ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);

      if (container && renderer.domElement) {
        container.innerHTML = '';
      }

      // Dispose Geometries & Materials
      starsGeo.dispose();
      starsMat.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      ring1.geometry.dispose();
      (ring1.material as THREE.Material).dispose();
      ring2.geometry.dispose();
      (ring2.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [isEnabled, isDark, earthMode, speedMultiplier, showDataArcs]);

  return (
    <>
      {/* 3D WebGL Fixed Canvas Covering the Full Viewport */}
      {isEnabled && (
        <div
          ref={containerRef}
          id="threejs-earth-canvas"
          className="fixed inset-0 w-full h-full pointer-events-auto -z-10 overflow-hidden cursor-grab active:cursor-grabbing"
          aria-hidden="true"
          title="Click and drag to spin 3D Earth"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 65% 50%, #0c122e 0%, #050716 65%, #02030a 100%)'
              : 'radial-gradient(ellipse at 65% 50%, #f1f5f9 0%, #e2e8f0 65%, #cbd5e1 100%)',
          }}
        />
      )}
    </>
  );
};
