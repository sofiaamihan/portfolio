import { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { ClipPath, Defs, Polygon, Rect } from "react-native-svg";

const DARKEST = "#6c5946";
const LIGHT = "#c4b8a4";
const CREAM = "#e8dcc8";
const TECH_BOX_BG = "#e5ddd5";

const { width: screenWidth } = Dimensions.get("window");

const projectsData = [
  {
    title: "healthcare-application",
    description:
      "Cloud-Integrated Healthcare Application leveraging AWS, with Real-Time Sensor Data, Offline Persistence, and MVVM Architecture via Kotlin and Jetpack Compose",
    image:
      "https://raw.githubusercontent.com/sofiaamihan/healthcare-application/refs/heads/main/data/main.png",
    techStack: ["Kotlin", "Jetpack Compose"],
    githubUrl: "https://github.com/sofiaamihan/healthcare-application",
  },
  {
    title: "box-office-analyser",
    description:
      "Worldwide Gross Revenue($) Predictive Model of Films via Categorical Boosting Regression Techniques",
    image:
      "https://raw.githubusercontent.com/sofiaamihan/box-office-analyser/refs/heads/main/data/application.png",
    techStack: ["Python", "Machine Learning"],
    githubUrl: "https://github.com/sofiaamihan/box-office-analyser",
  },
  {
    title: "wefie-hunt-ai",
    description:
      "Developed for Temasek Polytechnic, an AI-Driven Telegram Bot that automates Image Processing Tasks for Scavenger Hunts",
    image:
      "https://raw.githubusercontent.com/sofiaamihan/wefie-hunt-ai/refs/heads/main/Data/student-interface.png",
    techStack: ["Python", "OpenCV", "AWS"],
    githubUrl: "https://github.com/sofiaamihan/wefie-hunt-ai",
  },
  {
    title: "twcc",
    description:
      "Interactive Memory Game integrating Flask Web App with Raspberry Pi GPIO Hardware",
    image:
      "https://raw.githubusercontent.com/Troaxx/twcc/refs/heads/main/data/hardware.png",
    techStack: ["Python", "Raspberry-Pi", "Flask"],
    githubUrl: "https://github.com/sofiaamihan/twcc",
  },
  {
    title: "smart-wealth-management",
    description:
      "An AI-Driven Smart Wealth Management Application for UBS through Decentralised Data Management with PODs",
    image:
      "https://raw.githubusercontent.com/Troaxx/aura/refs/heads/main/data/main.png",
    techStack: ["TypeScript", "ReactNative", "AI Chatbot"],
    githubUrl: "https://github.com/sofiaamihan/smart-wealth-management",
  },
  {
    title: "alchemy-saga",
    description:
      "Decomposition and Abstraction in a Turn-Based Strategy Game Inspired by Pokémon Showdown",
    image:
      "https://raw.githubusercontent.com/sofiaamihan/alchemy-saga/refs/heads/main/data/battle-screen.png",
    techStack: ["Python", "Tkinter"],
    githubUrl: "https://github.com/sofiaamihan/alchemy-saga",
  },
  {
    title: "fourier-transform-extraction",
    description: "Extract frequencies from your desired audio via FFT",
    image:
      "https://raw.githubusercontent.com/sofiaamihan/fourier-transform-extraction/refs/heads/main/data/sample.png",
    techStack: ["Python", "Fast Fourier Transform"],
    githubUrl: "https://github.com/sofiaamihan/fourier-transform-extraction",
  },
  {
    title: "eco-explore",
    description:
      "Sustainable Tourism Platform developed with Flutter, Dart, and Firebase",
    image:
      "https://raw.githubusercontent.com/sofiaamihan/eco-explore/refs/heads/main/data/main-screens.png",
    techStack: ["Dart", "Flutter", "Firebase"],
    githubUrl: "https://github.com/sofiaamihan/eco-explore",
  },
];

const ProjectFrame = ({
  project,
  index,
}: {
  project: (typeof projectsData)[0];
  index: number;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  const handleProjectPress = async (githubUrl: string) => {
    try {
      const supported = await Linking.canOpenURL(githubUrl);
      if (supported) {
        await Linking.openURL(githubUrl);
      } else {
        console.error("Cannot open URL:", githubUrl);
      }
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  const handleMouseEnter = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1.05,
        useNativeDriver: true,
        friction: 8,
        tension: 100,
      }),
      Animated.spring(translateYAnim, {
        toValue: -8,
        useNativeDriver: true,
        friction: 8,
        tension: 100,
      }),
    ]).start();
  };

  const handleMouseLeave = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 100,
      }),
      Animated.spring(translateYAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 100,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.frameWrapper,
        {
          transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
        },
      ]}
      // @ts-ignore - onMouseEnter/Leave work on web but aren't in RN types
      onMouseEnter={Platform.OS === "web" ? handleMouseEnter : undefined}
      onMouseLeave={Platform.OS === "web" ? handleMouseLeave : undefined}
    >
      <TouchableOpacity
        onPress={() => handleProjectPress(project.githubUrl)}
        activeOpacity={0.9}
        style={styles.touchableContent}
      >
        <Svg
          height="100%"
          width="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={StyleSheet.absoluteFill}
        >
          <Defs>
            <ClipPath id={`clip-${index}`}>
              <Polygon points="20,0 85,0 100,15 100,100 56,100 46,90 0,90 0,0" />
            </ClipPath>
          </Defs>
          <Rect
            width="100"
            height="100"
            fill={LIGHT}
            clipPath={`url(#clip-${index})`}
          />
        </Svg>

        {/* Content overlay */}
        <View style={styles.frameContent}>
          <View>
            <Text style={styles.subHeader}>{project.title}</Text>
            <Text style={styles.normalText}>{project.description}</Text>
          </View>
          <View>
            <Image
              source={{ uri: project.image }}
              style={styles.projectImage}
              resizeMode="contain"
            />
            <View style={styles.techStackContainer}>
              {project.techStack.map((tech, idx) => (
                <View key={idx} style={styles.techBox}>
                  <Text style={styles.normalText}>{tech}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export function Projects() {
  const perforations = Array.from({ length: 48 }, (_, i) => i);

  return (
    <View style={styles.container}>
      <View style={styles.filmStripContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.filmStrip}>
            {/* Top perforations */}
            <View style={styles.perforationRow}>
              {perforations.map((i) => (
                <View key={`top-${i}`} style={styles.perforation} />
              ))}
            </View>

            {/* Film frames */}
            <View style={styles.framesContainer}>
              {projectsData.map((project, i) => (
                <ProjectFrame key={`frame-${i}`} project={project} index={i} />
              ))}
            </View>

            {/* Bottom perforations */}
            <View style={styles.perforationRow}>
              {perforations.map((i) => (
                <View key={`bottom-${i}`} style={styles.perforation} />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subHeader: {
    fontFamily: "Inconsolata-Bold",
    fontSize: 14,
    color: DARKEST,
    marginBottom: 4,
  },
  normalText: {
    fontFamily: "Inconsolata-Regular",
    fontSize: 12,
    color: DARKEST,
  },

  filmStripContainer: {
    width: "100%",
    maxWidth: screenWidth - 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  filmStrip: {
    backgroundColor: DARKEST,
    padding: 20,
  },
  perforationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  perforation: {
    width: 35,
    height: 18,
    backgroundColor: CREAM,
    minWidth: 35,
  },
  framesContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
    marginBottom: 20,
    height: 300,
  },
  frameWrapper: {
    width: (screenWidth - 140) / 4,
    minWidth: 300,
    position: "relative",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 8,
    elevation: 5,
    cursor: "pointer",
  },
  touchableContent: {
    flex: 1,
  },
  frameContent: {
    flex: 1,
    padding: 15,
    paddingTop: 15,
    justifyContent: "space-between",
    // paddingBottom: 40,
  },
  projectImage: {
    width: "100%",
    height: 140,
    backgroundColor: TECH_BOX_BG,
    marginBottom: 8,
    borderRadius: 4,
  },
  techStackContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  techBox: {
    backgroundColor: TECH_BOX_BG,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
});
