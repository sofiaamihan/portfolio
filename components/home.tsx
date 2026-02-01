import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { useRef } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import * as THREE from "three";

const DARKEST = "#6c5946";
const DARK = "#b87466";
const LIGHT = "#e2b59a";

export function Home() {
  const particlesDataRef = useRef<any[]>([]);
  const rotationRef = useRef({ x: 0, y: 0 });
  const lastTouchRef = useRef({ x: 0, y: 0 });
  const groupRef = useRef<THREE.Group | null>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        lastTouchRef.current = {
          x: evt.nativeEvent.pageX,
          y: evt.nativeEvent.pageY,
        };
      },
      onPanResponderMove: (evt) => {
        const deltaX = evt.nativeEvent.pageX - lastTouchRef.current.x;
        const deltaY = evt.nativeEvent.pageY - lastTouchRef.current.y;

        rotationRef.current.y += deltaX * 0.005;
        rotationRef.current.x += deltaY * 0.005;

        lastTouchRef.current = {
          x: evt.nativeEvent.pageX,
          y: evt.nativeEvent.pageY,
        };
      },
    }),
  ).current;

  const onContextCreate = async (gl: any) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // Setup scene, camera, renderer
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(DARKEST);
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 4000);
    camera.position.z = 1750;

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    // Create group for rotation
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Particle setup - spherical distribution for endless feel
    const maxParticleCount = 1000;
    let particleCount = 800;
    const sphereRadius = 1200;

    const particlesData = particlesDataRef.current;
    const particlePositions = new Float32Array(maxParticleCount * 3);

    // Initialize particles in spherical distribution
    for (let i = 0; i < maxParticleCount; i++) {
      // Random position within sphere
      // const radius = Math.random() * sphereRadius;
      const radius = Math.pow(Math.random(), 0.7) * sphereRadius; // Change distribution level, 0.1 means super dispersed
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particlesData.push({
        velocity: new THREE.Vector3(
          -0.5 + Math.random(),
          -0.5 + Math.random(),
          -0.5 + Math.random(),
        ),
        numConnections: 0,
      });
    }

    // Create point cloud
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    particlesGeometry.setDrawRange(0, particleCount);

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3,
      transparent: true,
    });

    const pointCloud = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(pointCloud);

    // Create lines
    const segments = maxParticleCount * maxParticleCount;
    const positions = new Float32Array(segments * 3);
    const colors = new Float32Array(segments * 3);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    linesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    linesGeometry.setDrawRange(0, 0);

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    group.add(linesMesh);

    // Convert hex colors to RGB values (0-1 range)
    const darkColor = new THREE.Color(DARK);
    const lightColor = new THREE.Color(LIGHT);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      let vertexpos = 0;
      let colorpos = 0;
      let numConnected = 0;
      const minDistance = 150;

      // Reset connections
      for (let i = 0; i < particleCount; i++) {
        particlesData[i].numConnections = 0;
      }

      // Update particles and check connections
      for (let i = 0; i < particleCount; i++) {
        const particleData = particlesData[i];

        particlePositions[i * 3] += particleData.velocity.x;
        particlePositions[i * 3 + 1] += particleData.velocity.y;
        particlePositions[i * 3 + 2] += particleData.velocity.z;

        // Wrap particles around sphere instead of bouncing
        const x = particlePositions[i * 3];
        const y = particlePositions[i * 3 + 1];
        const z = particlePositions[i * 3 + 2];
        const distFromCenter = Math.sqrt(x * x + y * y + z * z);

        // If particle goes too far, wrap it back to the opposite side
        if (distFromCenter > sphereRadius) {
          particlePositions[i * 3] = -x * 0.5;
          particlePositions[i * 3 + 1] = -y * 0.5;
          particlePositions[i * 3 + 2] = -z * 0.5;
        }

        // Check connections with other particles
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particlePositions[i * 3] - particlePositions[j * 3];
          const dy =
            particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
          const dz =
            particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < minDistance) {
            particleData.numConnections++;
            particlesData[j].numConnections++;

            const alpha = 1.0 - dist / minDistance;

            positions[vertexpos++] = particlePositions[i * 3];
            positions[vertexpos++] = particlePositions[i * 3 + 1];
            positions[vertexpos++] = particlePositions[i * 3 + 2];

            positions[vertexpos++] = particlePositions[j * 3];
            positions[vertexpos++] = particlePositions[j * 3 + 1];
            positions[vertexpos++] = particlePositions[j * 3 + 2];

            // Interpolate between DARK and LIGHT based on distance
            const color = new THREE.Color().lerpColors(
              lightColor,
              darkColor,
              1 - alpha,
            );

            colors[colorpos++] = color.r * alpha;
            colors[colorpos++] = color.g * alpha;
            colors[colorpos++] = color.b * alpha;

            colors[colorpos++] = color.r * alpha;
            colors[colorpos++] = color.g * alpha;
            colors[colorpos++] = color.b * alpha;

            numConnected++;
          }
        }
      }

      linesMesh.geometry.setDrawRange(0, numConnected * 2);
      linesMesh.geometry.attributes.position.needsUpdate = true;
      linesMesh.geometry.attributes.color.needsUpdate = true;

      pointCloud.geometry.attributes.position.needsUpdate = true;

      // Apply user rotation
      group.rotation.x = rotationRef.current.x;
      group.rotation.y = rotationRef.current.y;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <GLView style={styles.glView} onContextCreate={onContextCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: DARKEST, // Theres really cool particles flying around but theyre too bright
  },
  glView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
