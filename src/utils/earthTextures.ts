import * as THREE from 'three';

// City and Tech Hub Coordinates (Latitude, Longitude, Name)
export interface TechHub {
  name: string;
  lat: number;
  lng: number;
  country: string;
  isHome?: boolean; // Shibshankar's Location (Kolkata / West Bengal)
}

export const TECH_HUBS: TechHub[] = [
  { name: 'Kolkata / Barrackpore', lat: 22.76, lng: 88.37, country: 'India', isHome: true },
  { name: 'Bengaluru', lat: 12.97, lng: 77.59, country: 'India' },
  { name: 'Silicon Valley (SF)', lat: 37.77, lng: -122.42, country: 'USA' },
  { name: 'New York', lat: 40.71, lng: -74.01, country: 'USA' },
  { name: 'London', lat: 51.51, lng: -0.13, country: 'UK' },
  { name: 'Tokyo', lat: 35.68, lng: 139.69, country: 'Japan' },
  { name: 'Singapore', lat: 1.35, lng: 103.82, country: 'Singapore' },
  { name: 'Frankfurt', lat: 50.11, lng: 8.68, country: 'Germany' },
  { name: 'Sydney', lat: -33.87, lng: 151.21, country: 'Australia' },
  { name: 'Dubai', lat: 25.20, lng: 55.27, country: 'UAE' },
  { name: 'Toronto', lat: 43.65, lng: -79.38, country: 'Canada' },
  { name: 'Seoul', lat: 37.57, lng: 126.98, country: 'South Korea' },
];

export const DATA_CONNECTIONS: [number, number][] = [
  [0, 1], // Kolkata -> Bengaluru
  [0, 2], // Kolkata -> Silicon Valley
  [0, 4], // Kolkata -> London
  [0, 5], // Kolkata -> Tokyo
  [0, 6], // Kolkata -> Singapore
  [0, 9], // Kolkata -> Dubai
  [1, 6], // Bengaluru -> Singapore
  [2, 3], // SF -> NY
  [3, 4], // NY -> London
  [4, 7], // London -> Frankfurt
  [5, 8], // Tokyo -> Sydney
  [6, 8], // Singapore -> Sydney
  [2, 10], // SF -> Toronto
  [5, 11], // Tokyo -> Seoul
];

// Convert Lat/Lng to 3D Cartesian Vector on Sphere
export function latLngToVector3(lat: number, lng: number, radius: number, alt: number = 0): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const r = radius + alt;

  const x = -(r * Math.sin(phi) * Math.cos(theta));
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Generate 3D Great-Circle Arc Curve between two coordinates
export function createArcCurve(p1: THREE.Vector3, p2: THREE.Vector3, maxHeight: number = 60): THREE.CubicBezierCurve3 {
  const distance = p1.distanceTo(p2);
  const mid = p1.clone().add(p2).multiplyScalar(0.5);
  const midLength = mid.length();
  
  // Height scales with distance
  const arcHeight = Math.min(maxHeight, distance * 0.35 + 20);
  const normal = mid.clone().normalize();
  const controlPoint1 = p1.clone().add(normal.clone().multiplyScalar(arcHeight * 0.8));
  const controlPoint2 = p2.clone().add(normal.clone().multiplyScalar(arcHeight * 0.8));

  return new THREE.CubicBezierCurve3(p1, controlPoint1, controlPoint2, p2);
}

// Generate procedural Canvas-based Realistic Earth Day Texture
export function createProceduralEarthTexture(isDark: boolean): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // 1. Deep Ocean Base
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    if (isDark) {
      oceanGrad.addColorStop(0, '#0a1026');
      oceanGrad.addColorStop(0.5, '#060c1e');
      oceanGrad.addColorStop(1, '#030712');
    } else {
      oceanGrad.addColorStop(0, '#1e3a8a');
      oceanGrad.addColorStop(0.5, '#1e40af');
      oceanGrad.addColorStop(1, '#172554');
    }
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 2048, 1024);

    // 2. Latitude/Longitude Grid Lines
    ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 2048; x += 2048 / 24) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }
    for (let y = 0; y <= 1024; y += 1024 / 12) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(2048, y);
      ctx.stroke();
    }

    // 3. Procedural Continents Drawing
    ctx.fillStyle = isDark ? '#1e293b' : '#15803d';
    ctx.strokeStyle = isDark ? '#38bdf8' : '#86efac';
    ctx.lineWidth = 1.5;

    // Simplified polygon landmasses for major continents
    const drawLandmass = (pts: [number, number][], fill: string, stroke?: string) => {
      ctx.fillStyle = fill;
      if (stroke) ctx.strokeStyle = stroke;
      ctx.beginPath();
      pts.forEach(([px, py], i) => {
        const x = (px / 360) * 2048;
        const y = ((180 - py) / 180) * 1024;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
      if (stroke) ctx.stroke();
    };

    const landColor = isDark ? '#1e293b' : '#166534';
    const landGlow = isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(74, 222, 128, 0.3)';

    // Eurasia & Africa
    drawLandmass([
      [170, 160], [190, 165], [210, 160], [250, 155], [280, 140], [290, 115],
      [270, 105], [260, 95], [270, 75], [250, 60], [240, 75], [225, 90],
      [205, 100], [195, 80], [180, 70], [170, 95], [175, 120], [165, 140]
    ], landColor, landGlow);

    // India Subcontinent
    drawLandmass([
      [245, 125], [260, 120], [268, 105], [258, 90], [248, 102], [242, 115]
    ], isDark ? '#312e81' : '#15803d', isDark ? '#818cf8' : '#4ade80');

    // Africa
    drawLandmass([
      [170, 125], [210, 125], [225, 105], [220, 70], [200, 50], [180, 55],
      [165, 80], [155, 100], [160, 115]
    ], landColor, landGlow);

    // North America
    drawLandmass([
      [50, 160], [90, 165], [120, 155], [110, 130], [95, 115], [85, 100],
      [65, 110], [55, 130], [45, 145]
    ], landColor, landGlow);

    // South America
    drawLandmass([
      [85, 100], [115, 95], [125, 75], [110, 50], [95, 40], [80, 60], [75, 85]
    ], landColor, landGlow);

    // Australia
    drawLandmass([
      [290, 70], [330, 70], [335, 50], [310, 45], [285, 55]
    ], landColor, landGlow);

    // 4. City Night Glow / Lights Points
    if (isDark) {
      TECH_HUBS.forEach((hub) => {
        const x = ((hub.lng + 180) / 360) * 2048;
        const y = ((90 - hub.lat) / 180) * 1024;

        const rad = ctx.createRadialGradient(x, y, 0, x, y, hub.isHome ? 24 : 14);
        rad.addColorStop(0, '#ffffff');
        rad.addColorStop(0.3, hub.isHome ? '#38bdf8' : '#f59e0b');
        rad.addColorStop(0.7, hub.isHome ? 'rgba(56, 189, 248, 0.4)' : 'rgba(245, 158, 11, 0.2)');
        rad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = rad;
        ctx.beginPath();
        ctx.arc(x, y, hub.isHome ? 24 : 14, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Generate procedural Clouds Texture for Earth Atmosphere
export function createProceduralCloudsTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, 1024, 512);

    // Generate soft, swirling cloud patches
    for (let i = 0; i < 45; i++) {
      const cx = Math.random() * 1024;
      const cy = Math.random() * 380 + 60;
      const r = Math.random() * 120 + 40;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      grad.addColorStop(0.4, 'rgba(240, 249, 255, 0.2)');
      grad.addColorStop(0.8, 'rgba(224, 242, 254, 0.08)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 1.8, r * 0.6, (Math.random() - 0.5) * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Generate high-density Continental Dot Matrix Grid Points
export function generateEarthPointMatrix(radius: number, density: number = 3800): {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
} {
  const positions: number[] = [];
  const colors: number[] = [];
  const sizes: number[] = [];

  // Approximate land test function (returns true if lat/lng is approximately on land)
  function isLand(lat: number, lng: number): boolean {
    // Eurasia
    if (lat > 5 && lat < 75 && lng > -10 && lng < 170) {
      if (lat > 10 && lat < 30 && lng > 68 && lng < 92) return true; // India Subcontinent
      if (lat > 15 && lat < 55 && lng > 95 && lng < 145) return true; // East Asia
      if (lat > 35 && lat < 70 && lng > -10 && lng < 60) return true; // Europe
      if (lat > 50 && lat < 75 && lng > 60 && lng < 170) return true; // Russia
      return Math.random() > 0.35;
    }
    // Africa
    if (lat > -35 && lat < 38 && lng > -20 && lng < 52) {
      return Math.random() > 0.3;
    }
    // North America
    if (lat > 15 && lat < 72 && lng > -168 && lng < -50) {
      return Math.random() > 0.35;
    }
    // South America
    if (lat > -56 && lat < 12 && lng > -82 && lng < -34) {
      return Math.random() > 0.32;
    }
    // Australia
    if (lat > -44 && lat < -10 && lng > 112 && lng < 154) {
      return Math.random() > 0.38;
    }
    return false;
  }

  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < density; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / density);

    const lat = 90 - (phi * 180) / Math.PI;
    const lng = (theta * 180) / Math.PI - 180;

    const onLand = isLand(lat, lng);
    
    // Only keep points that form the continents and a few ocean grid nodes
    if (onLand || Math.random() < 0.08) {
      const vec = latLngToVector3(lat, lng, radius, onLand ? 0 : -2);
      positions.push(vec.x, vec.y, vec.z);

      if (onLand) {
        // Vibrant neon cyan / electric purple / bright white for land nodes
        if (Math.abs(lat - 22.76) < 8 && Math.abs(lng - 88.37) < 15) {
          // India highlight
          colors.push(0.98, 0.45, 0.95); // Bright neon magenta
          sizes.push(16);
        } else if (Math.random() > 0.6) {
          colors.push(0.22, 0.74, 0.97); // Cyan
          sizes.push(11);
        } else {
          colors.push(0.51, 0.55, 0.97); // Indigo
          sizes.push(8);
        }
      } else {
        // Dim ocean node
        colors.push(0.12, 0.18, 0.38);
        sizes.push(4);
      }
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    sizes: new Float32Array(sizes),
  };
}
