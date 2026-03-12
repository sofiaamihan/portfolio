import { DARKEST } from "@/constants/constants";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Platform,
  StyleSheet,
  View,
} from "react-native";

const educationData = [
  { origin: "tp", styleType: "image" },
  { origin: "dss", styleType: "image" },
];

const movieData = [
  { origin: "littlewomen", styleType: "movie" },
  { origin: "bones", styleType: "movie" },
  { origin: "substance", styleType: "movie" },
  { origin: "eternal", styleType: "movie" },
];

const badgeMap: Record<string, any> = {
  tp: require("../assets/cards/education-card-tp.png"),
  dss: require("../assets/cards/education-card-dss.png"),
  littlewomen: require("../assets/cards/movie-card-littlewomen.png"),
  bones: require("../assets/cards/movie-card-bones.png"),
  substance: require("../assets/cards/movie-card-substance.png"),
  eternal: require("../assets/cards/movie-card-eternal.png"),
};

const ALL_CARDS = [...educationData, ...movieData];
const EducationFrame = ({
  element,
  entranceDelay,
  triggered,
}: {
  element: (typeof ALL_CARDS)[0];
  entranceDelay: number;
  triggered: boolean;
}) => {
  const entranceOpacity = useRef(new Animated.Value(0)).current;
  const entranceY = useRef(new Animated.Value(22)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!triggered) {
      entranceOpacity.setValue(0);
      entranceY.setValue(22);
      return;
    }
    Animated.parallel([
      Animated.timing(entranceOpacity, {
        toValue: 1,
        duration: 420,
        delay: entranceDelay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(entranceY, {
        toValue: 0,
        duration: 420,
        delay: entranceDelay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [triggered]);

  const handleMouseEnter = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1.005,
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
      style={{
        opacity: entranceOpacity,
        transform: [
          { translateY: Animated.add(entranceY, translateYAnim) },
          { scale: scaleAnim },
        ],
      }}
      // @ts-ignore
      onMouseEnter={Platform.OS === "web" ? handleMouseEnter : undefined}
      onMouseLeave={Platform.OS === "web" ? handleMouseLeave : undefined}
    >
      <Image
        source={badgeMap[element.origin]}
        style={element.styleType === "image" ? styles.image : styles.movieCard}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export function Education({ isActive }: { isActive?: boolean }) {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (isActive && !triggered) {
      const t = setTimeout(() => setTriggered(true), 80);
      return () => clearTimeout(t);
    }
    if (!isActive) {
      setTriggered(false);
    }
  }, [isActive]);

  const getDelay = (index: number) => index * 150;

  return (
    <View style={styles.container}>
      <View style={styles.cardRow}>
        {educationData.map((edu, i) => (
          <EducationFrame
            key={`edu-${i}`}
            element={edu}
            entranceDelay={getDelay(i)}
            triggered={triggered}
          />
        ))}
        <View style={styles.image}>
          <View style={styles.cardRow}>
            {movieData.slice(0, 2).map((movie, i) => (
              <EducationFrame
                key={`movie-top-${i}`}
                element={movie}
                entranceDelay={getDelay(educationData.length + i)}
                triggered={triggered}
              />
            ))}
          </View>
          <View style={styles.cardRow}>
            {movieData.slice(2, 4).map((movie, i) => (
              <EducationFrame
                key={`movie-bot-${i}`}
                element={movie}
                entranceDelay={getDelay(educationData.length + 2 + i)}
                triggered={triggered}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: "row",
  },
  image: {
    height: 550,
    width: 360,
    justifyContent: "center",
  },
  movieCard: {
    height: 250,
    width: 200,
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  educationCard: {
    height: "85%",
    width: "32%",
    margin: 20,
    shadowColor: DARKEST,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  educationImage: {
    height: 200,
    width: "90%",
    backgroundColor: DARKEST,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  cardItem: {
    flexDirection: "row",
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 8,
    justifyContent: "space-between",
  },
  cardContent: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 8,
  },
  title: {
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontFamily: "Inconsolata-Bold",
    fontSize: 20,
    color: DARKEST,
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
  boldText: {
    fontFamily: "Inconsolata-Bold",
    fontSize: 12,
    color: DARKEST,
  },
});
