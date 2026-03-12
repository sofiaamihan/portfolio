import { BACKGROUND, DARKEST, LIGHTPINK, PINK } from "@/constants/constants";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { useEffect, useRef, useState } from "react";
import { PanResponder, Platform, StyleSheet, Text, View } from "react-native";
import * as THREE from "three";

const TOOLTIP_NODES = [
  {
    title: "Nodes → Film Characters",
    body: "Each glowing point is like a character in a film. Each carrying potential, with its true meaning only emerging through their relationships with others.",
  },
  {
    title: "Edges → Narrative Connections",
    body: "Lines between nodes mirror how characters, themes, and plot points link together. The strength of a connection reflects emotional or narrative weight.",
  },
  {
    title: "Weighted Signals",
    body: "In a neural network, edges carry weights that amplify or dampen signals. In film, a single scene can recontextualise every relationship that came before it.",
  },
  {
    title: "Hidden Layers → Cinema Subtext",
    body: "Neural networks hide computation in intermediate layers invisible to the input. Great films do the same: the surface story masks a deeper symbolic or emotional layer processing underneath.",
  },
  {
    title: "Activation → Human Emotion",
    body: "A neuron 'fires' when its inputs exceed a threshold. A film moment lands when accumulated tension, music, and performance cross the audience's emotional threshold simultaneously.",
  },
  {
    title: "Training → Genre Memory",
    body: "Networks learn from data; audiences learn from films. Genre conventions are a kind of collective training, with our weights pre-set by every genre we've seen.",
  },
];

export function Home() {
  const particlesDataRef = useRef<any[]>([]);
  const rotationRef = useRef({ x: 0, y: 0 });
  const lastTouchRef = useRef({ x: 0, y: 0 });
  const groupRef = useRef<THREE.Group | null>(null);

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    node: (typeof TOOLTIP_NODES)[0];
  } | null>(null);
  const tooltipIndexRef = useRef(0);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    let particleCount = 120;
    const sphereRadius = 600; // Groups together

    const particlesData = particlesDataRef.current;
    const particlePositions = new Float32Array(maxParticleCount * 3);

    for (let i = 0; i < maxParticleCount; i++) {
      // Uniform surface-biased distribution — particles spread to edges, not center
      const radius = sphereRadius * (0.3 + Math.random() * 0.7);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      particlesData.push({
        velocity: new THREE.Vector3(
          (-0.5 + Math.random()) * 0.4,
          (-0.5 + Math.random()) * 0.4,
          (-0.5 + Math.random()) * 0.4,
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
      const minDistance = 350;

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

      // Adjust rotation
      rotationRef.current.y += 0.0008;
      rotationRef.current.x += 0.0003;

      group.rotation.x = rotationRef.current.x;
      group.rotation.y = rotationRef.current.y;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  const containerRef = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const el = containerRef.current;
    if (!el) return;

    const domNode: HTMLElement = el;

    const handleMouseMove = (e: MouseEvent) => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = setTimeout(() => {
        const rect = domNode.getBoundingClientRect();
        const node =
          TOOLTIP_NODES[tooltipIndexRef.current % TOOLTIP_NODES.length];
        tooltipIndexRef.current += 1;
        setTooltip({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          node,
        });
      }, 500);
    };

    const handleMouseLeave = () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      setTooltip(null);
    };

    domNode.addEventListener("mousemove", handleMouseMove);
    domNode.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      domNode.removeEventListener("mousemove", handleMouseMove);
      domNode.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <View
      ref={containerRef}
      style={styles.container}
      {...panResponder.panHandlers}
    >
      <GLView style={styles.glView} onContextCreate={onContextCreate} />

      {tooltip && (
        <View
          style={[
            styles.tooltip,
            { left: tooltip.x + 16, top: tooltip.y - 20 },
          ]}
          pointerEvents="none"
        >
          <Text style={styles.tooltipTitle}>{tooltip.node.title}</Text>
          <View style={styles.tooltipDivider} />
          <Text style={styles.tooltipBody}>{tooltip.node.body}</Text>
        </View>
      )}
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
  tooltip: {
    position: "absolute",
    maxWidth: 280,
    backgroundColor: DARKEST,
    borderLeftWidth: 3,
    borderLeftColor: PINK,
    paddingVertical: 12,
    paddingHorizontal: 16,
    ...(Platform.OS === "web"
      ? ({ boxShadow: "0 4px 24px rgba(0,0,0,0.18)" } as any)
      : {}),
  },
  tooltipTitle: {
    fontFamily: "Inconsolata-Bold",
    fontSize: 13,
    color: LIGHTPINK,
    marginBottom: 6,
    letterSpacing: 0.4,
  },
  tooltipDivider: {
    height: 1,
    backgroundColor: PINK,
    opacity: 0.4,
    marginBottom: 8,
  },
  tooltipBody: {
    fontFamily: "Inconsolata-Regular",
    fontSize: 12,
    color: BACKGROUND,
    lineHeight: 18,
  },
});
