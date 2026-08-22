import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Eye, EyeOff, Sliders, RefreshCw, Zap } from 'lucide-react';
import { playUiSound } from '../utils/soundEffects';

// Helper to generate glowing circular orb particle texture dynamically
function createGlowSpriteTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(165, 180, 252, 0.9)');
    gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.5)');
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

  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    return localStorage.getItem('three_bg_enabled') !== 'false';
  });
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [activeGeometry, setActiveGeometry] = useState<'sphere' | 'torus' | 'icosahedron'>('sphere');

  const isDark = theme === 'dark';

  useEffect(() => {
    if (!isEnabled || !containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // --- 1. Three.js Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    
    // Cosmic Fog
    const fogColor = isDark ? 0x070919 : 0xf1f5f9;
    scene.fog = new THREE.FogExp2(fogColor, 0.0008);

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 3000);
    camera.position.z = 850;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(isDark ? 0x060814 : 0xf8fafc, isDark ? 1 : 0.95);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- 2. Celestial Nodes (Starfield Particles) ---
    const particleCount = window.innerWidth < 768 ? 85 : 150;
    const maxDistance = 175;
    const maxConnections = particleCount * 6;

    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: Array<{ x: number; y: number; z: number }> = [];
    const particleColors = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    const colorPaletteDark = [
      new THREE.Color('#38bdf8'), // Electric cyan
      new THREE.Color('#818cf8'), // Soft indigo
      new THREE.Color('#c084fc'), // Vivid lavender purple
      new THREE.Color('#a855f7'), // Deep purple
      new THREE.Color('#67e8f9'), // Light sky
    ];

    const colorPaletteLight = [
      new THREE.Color('#4f46e5'), // Rich Indigo
      new THREE.Color('#0284c7'), // Deep Sky Blue
      new THREE.Color('#7c3aed'), // Royal Violet
      new THREE.Color('#2563eb'), // Cobalt
    ];

    const palette = isDark ? colorPaletteDark : colorPaletteLight;

    const boundX = 900;
    const boundY = 700;
    const boundZ = 600;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * boundX * 2;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * boundY * 2;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * boundZ * 2;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.45,
        y: (Math.random() - 0.5) * 0.45,
        z: (Math.random() - 0.5) * 0.3,
      });

      const color = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i3] = color.r;
      particleColors[i3 + 1] = color.g;
      particleColors[i3 + 2] = color.b;

      particleSizes[i] = Math.random() * 18 + 12;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const glowTexture = createGlowSpriteTexture();

    const particlesMaterial = new THREE.PointsMaterial({
      size: isDark ? 22 : 16,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.95 : 0.75,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // --- 3. Dynamic Connecting Constellation Lines ---
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const linesPositionAttr = new THREE.BufferAttribute(linePositions, 3);
    linesPositionAttr.setUsage(THREE.DynamicDrawUsage);
    const linesColorAttr = new THREE.BufferAttribute(lineColors, 3);
    linesColorAttr.setUsage(THREE.DynamicDrawUsage);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', linesPositionAttr);
    linesGeometry.setAttribute('color', linesColorAttr);

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.65 : 0.35,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // --- 4. 3D Floating Wireframe Meshes (Matching Reference Geodesic Structure) ---
    const geometryGroup = new THREE.Group();
    scene.add(geometryGroup);

    // Primary Geodesic Polyhedron (Sphere / Icosahedron)
    const sphereGeo = new THREE.IcosahedronGeometry(130, 2);
    const sphereWireframe = new THREE.WireframeGeometry(sphereGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x6366f1 : 0x4f46e5,
      transparent: true,
      opacity: isDark ? 0.4 : 0.25,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const sphereMesh = new THREE.LineSegments(sphereWireframe, wireframeMat);
    sphereMesh.position.set(400, -220, -100);
    geometryGroup.add(sphereMesh);

    // Secondary Floating Orbiting Torus Knot
    const torusGeo = new THREE.TorusKnotGeometry(75, 18, 80, 16);
    const torusWireframe = new THREE.WireframeGeometry(torusGeo);
    const torusMat = new THREE.LineBasicMaterial({
      color: isDark ? 0xa855f7 : 0x7c3aed,
      transparent: true,
      opacity: isDark ? 0.3 : 0.2,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const torusMesh = new THREE.LineSegments(torusWireframe, torusMat);
    torusMesh.position.set(-450, 180, -200);
    geometryGroup.add(torusMesh);

    // Third Floating Octahedron Accent
    const octaGeo = new THREE.OctahedronGeometry(60, 1);
    const octaWireframe = new THREE.WireframeGeometry(octaGeo);
    const octaMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.45 : 0.3,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const octaMesh = new THREE.LineSegments(octaWireframe, octaMat);
    octaMesh.position.set(-250, -280, 50);
    geometryGroup.add(octaMesh);

    // --- 5. Mouse Parallax & Interaction Tracking ---
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
    };

    const onScroll = () => {
      scrollYOffset = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- 6. Responsive Window Resize Handler ---
    const onResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth || window.innerWidth;
      height = containerRef.current.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // --- 7. Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const speed = speedMultiplier;

      // Mouse Smooth Damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Camera Gentle Sway with Scroll Depth
      camera.position.x = mouseX * 90;
      camera.position.y = -mouseY * 90 - scrollYOffset * 0.15;
      camera.lookAt(0, -scrollYOffset * 0.15, 0);

      // Rotate Wireframe Geometries
      sphereMesh.rotation.x += 0.003 * speed;
      sphereMesh.rotation.y += 0.005 * speed;

      torusMesh.rotation.x += 0.004 * speed;
      torusMesh.rotation.z += 0.006 * speed;

      octaMesh.rotation.y += 0.008 * speed;
      octaMesh.rotation.z += 0.005 * speed;

      // Update Celestial Particles
      const positions = particlesGeometry.attributes.position.array as Float32Array;

      let vertexIndex = 0;
      let colorIndex = 0;
      let connectionCount = 0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Position Updates
        positions[i3] += particleVelocities[i].x * speed;
        positions[i3 + 1] += particleVelocities[i].y * speed;
        positions[i3 + 2] += particleVelocities[i].z * speed;

        // Boundary Wrap / Bounce
        if (positions[i3] < -boundX || positions[i3] > boundX) particleVelocities[i].x *= -1;
        if (positions[i3 + 1] < -boundY || positions[i3 + 1] > boundY) particleVelocities[i].y *= -1;
        if (positions[i3 + 2] < -boundZ || positions[i3 + 2] > boundZ) particleVelocities[i].z *= -1;

        // Dynamic Connecting Constellation Lines
        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const dx = positions[i3] - positions[j3];
          const dy = positions[i3 + 1] - positions[j3 + 1];
          const dz = positions[i3 + 2] - positions[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance && connectionCount < maxConnections) {
            const alpha = 1.0 - dist / maxDistance;

            // Point A
            linePositions[vertexIndex++] = positions[i3];
            linePositions[vertexIndex++] = positions[i3 + 1];
            linePositions[vertexIndex++] = positions[i3 + 2];

            // Point B
            linePositions[vertexIndex++] = positions[j3];
            linePositions[vertexIndex++] = positions[j3 + 1];
            linePositions[vertexIndex++] = positions[j3 + 2];

            // Colors with distance fade
            const c1r = particleColors[i3] * alpha;
            const c1g = particleColors[i3 + 1] * alpha;
            const c1b = particleColors[i3 + 2] * alpha;

            const c2r = particleColors[j3] * alpha;
            const c2g = particleColors[j3 + 1] * alpha;
            const c2b = particleColors[j3 + 2] * alpha;

            lineColors[colorIndex++] = c1r;
            lineColors[colorIndex++] = c1g;
            lineColors[colorIndex++] = c1b;

            lineColors[colorIndex++] = c2r;
            lineColors[colorIndex++] = c2g;
            lineColors[colorIndex++] = c2b;

            connectionCount++;
          }
        }
      }

      particlesGeometry.attributes.position.needsUpdate = true;

      linesGeometry.setDrawRange(0, connectionCount * 2);
      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      if (container && renderer.domElement) {
        container.innerHTML = '';
      }

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      sphereGeo.dispose();
      sphereWireframe.dispose();
      wireframeMat.dispose();
      torusGeo.dispose();
      torusWireframe.dispose();
      torusMat.dispose();
      octaGeo.dispose();
      octaWireframe.dispose();
      octaMat.dispose();
      renderer.dispose();
    };
  }, [isEnabled, isDark, speedMultiplier]);

  const toggleEnabled = () => {
    const next = !isEnabled;
    setIsEnabled(next);
    localStorage.setItem('three_bg_enabled', String(next));
    playUiSound('click');
  };

  const handleSpeedChange = (spd: number) => {
    setSpeedMultiplier(spd);
    playUiSound('click');
  };

  return (
    <>
      {/* 3D WebGL Fixed Canvas Covering the Full Viewport */}
      {isEnabled && (
        <div
          ref={containerRef}
          id="threejs-canvas-container"
          className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden"
          aria-hidden="true"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at center, #0a0d24 0%, #060814 70%, #04050d 100%)'
              : 'radial-gradient(ellipse at center, #f8fafc 0%, #edf2f7 70%, #e2e8f0 100%)',
          }}
        />
      )}

      {/* Floating 3D Background HUD Pill (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {showControls && isEnabled && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl text-xs text-slate-700 dark:text-slate-200 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <span className="font-semibold text-slate-500 dark:text-slate-400">Speed:</span>
            {[0.5, 1, 1.5, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => handleSpeedChange(spd)}
                className={`px-2 py-1 rounded-lg font-mono text-[11px] transition-colors ${
                  speedMultiplier === spd
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        )}

        <button
          id="three-toggle-hud-btn"
          onClick={() => {
            setShowControls(!showControls);
            playUiSound('click');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full backdrop-blur-md border shadow-xl transition-all duration-200 hover:scale-105 ${
            isEnabled
              ? 'bg-slate-900/80 text-white border-indigo-500/40 shadow-indigo-500/10 hover:border-indigo-400'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-500 border-slate-200 dark:border-slate-800'
          }`}
          title="3D Background Settings"
        >
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              {isEnabled && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isEnabled ? 'bg-indigo-500' : 'bg-slate-400'
                }`}
              />
            </span>
            <span className="text-xs font-semibold">3D Space</span>
          </div>

          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
        </button>

        {/* Quick Power Toggle */}
        <button
          id="three-power-btn"
          onClick={toggleEnabled}
          className="p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 shadow-xl hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all"
          title={isEnabled ? 'Turn 3D background off' : 'Turn 3D background on'}
        >
          {isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
        </button>
      </div>
    </>
  );
};
