import { LIGHTPINK, PINK } from "@/constants/constants";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { useRef } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import * as THREE from "three";

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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 4000);
    camera.position.z = 1600; // How far it is

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    const maxParticleCount = 1000;
    let particleCount = 400;
    const sphereRadius = 600; // Groups together

    const particlesData = particlesDataRef.current;
    const particlePositions = new Float32Array(maxParticleCount * 3);

    for (let i = 0; i < maxParticleCount; i++) {
      const radius = Math.pow(Math.random(), 0.5) * sphereRadius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      particlesData.push({
        velocity: new THREE.Vector3(
          -0.5 + Math.random(),
          -0.5 + Math.random(),
          -0.5 + Math.random(),
        ),
        numConnections: 0,
      });
    }

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

    const darkColor = new THREE.Color(PINK);
    const lightColor = new THREE.Color(LIGHTPINK);

    const animate = () => {
      requestAnimationFrame(animate);

      let vertexpos = 0;
      let colorpos = 0;
      let numConnected = 0;
      const minDistance = 200; // Adjust this alongside distribution

      for (let i = 0; i < particleCount; i++) {
        particlesData[i].numConnections = 0;
      }

      for (let i = 0; i < particleCount; i++) {
        const particleData = particlesData[i];

        particlePositions[i * 3] += particleData.velocity.x;
        particlePositions[i * 3 + 1] += particleData.velocity.y;
        particlePositions[i * 3 + 2] += particleData.velocity.z;

        const x = particlePositions[i * 3];
        const y = particlePositions[i * 3 + 1];
        const z = particlePositions[i * 3 + 2];
        const distFromCenter = Math.sqrt(x * x + y * y + z * z);

        if (distFromCenter > sphereRadius) {
          const nx = (x / distFromCenter) * sphereRadius * 0.9;
          const ny = (y / distFromCenter) * sphereRadius * 0.9;
          const nz = (z / distFromCenter) * sphereRadius * 0.9;
          particlePositions[i * 3] = -nx;
          particlePositions[i * 3 + 1] = -ny;
          particlePositions[i * 3 + 2] = -nz;
        }

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

      group.rotation.x = rotationRef.current.x;
      group.rotation.y = rotationRef.current.y;

      rotationRef.current.y += 0.001; // horizontal spin speed
      rotationRef.current.x += 0.0005; // gentle tilt speed
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
    overflow: "hidden",
  },
  glView: {
    ...StyleSheet.absoluteFillObject,
  },
});
