import { DARKEST } from "@/constants/constants";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";

const BADGE_GROUPS = [
  {
    label: "Languages",
    badges: [
      require("../assets/badges/javascript.png"),
      require("../assets/badges/python.png"),
      require("../assets/badges/kotlin.png"),
      require("../assets/badges/typescript.png"),
    ],
  },
  {
    label: "Libraries",
    badges: [
      require("../assets/badges/react.png"),
      require("../assets/badges/selenium.png"),
      require("../assets/badges/compose.png"),
      require("../assets/badges/reactnative.png"),
    ],
  },
  {
    label: "Applications",
    badges: [
      require("../assets/badges/postman.png"),
      require("../assets/badges/jmeter.png"),
      require("../assets/badges/raspberrypi.png"),
    ],
  },
  {
    label: "Databases",
    badges: [
      require("../assets/badges/mongodb.png"),
      require("../assets/badges/firebase.png"),
      require("../assets/badges/room.png"),
      require("../assets/badges/aws.png"),
    ],
  },
];

const ALL_BADGES = BADGE_GROUPS.flatMap((group, gi) =>
  group.badges.map((src, bi) => ({ src, groupIndex: gi, badgeIndex: bi })),
);

function useFadeSlide(delay: number, triggered: boolean) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    if (!triggered) return;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 380,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 380,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [triggered]);

  return { opacity, translateY };
}

export function About({ isActive }: { isActive?: boolean }) {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (isActive && !triggered) {
      const t = setTimeout(() => setTriggered(true), 80);
      return () => clearTimeout(t);
    }
  }, [isActive]);

  const photoAnim = useFadeSlide(0, triggered);
  const intro = useFadeSlide(180, triggered);
  const cgpa = useFadeSlide(280, triggered);
  const techLabel = useFadeSlide(360, triggered);
  const outro = useFadeSlide(900 + ALL_BADGES.length * 55, triggered);

  const badgeAnims = ALL_BADGES.map((_, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFadeSlide(420 + i * 55, triggered),
  );

  useEffect(() => {
    if (!isActive) {
      [photoAnim, intro, cgpa, techLabel, outro, ...badgeAnims].forEach(
        ({ opacity, translateY }) => {
          opacity.setValue(0);
          translateY.setValue(14);
        },
      );
      setTriggered(false);
    }
  }, [isActive]);

  const renderBadgeGroups = () =>
    BADGE_GROUPS.map((group, gi) => {
      const groupBadges = ALL_BADGES.filter((b) => b.groupIndex === gi);
      return (
        <View key={gi}>
          <Text style={styles.normalText}>{group.label}</Text>
          {groupBadges.map((b) => {
            const flatIndex = ALL_BADGES.indexOf(b);
            const anim = badgeAnims[flatIndex];
            return (
              <Animated.View
                key={flatIndex}
                style={{
                  opacity: anim.opacity,
                  transform: [{ translateY: anim.translateY }],
                }}
              >
                <Image
                  style={styles.badge}
                  resizeMode="contain"
                  source={b.src}
                />
              </Animated.View>
            );
          })}
        </View>
      );
    });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageBox,
          {
            opacity: photoAnim.opacity,
            transform: [{ translateY: photoAnim.translateY }],
          },
        ]}
      >
        <Image
          source={require("../assets/images/profile.png")}
          style={styles.image}
        />
      </Animated.View>

      <View style={styles.textBox}>
        <Text style={styles.normalText}>
          Hi! I&apos;m a <Text style={styles.boldText}>Year 3 Scholar</Text> at
          <Text style={styles.boldText}> Temasek Polytechnic</Text>, currently
          pursuing a{" "}
          <Text style={styles.boldText}>Diploma in Information Technology</Text>
          . I am passionate about software and hardware development, finding
          ways to integrate creativity into my solutions, as an amateur
          cinephile.
        </Text>
        <Text style={styles.boldText}>CGPA: 3.96 / 4.0</Text>
        <View>
          <Text style={styles.boldText}>Technologies</Text>

          <View style={styles.technologies}>{renderBadgeGroups()}</View>
        </View>
        <Text style={styles.normalText}>
          Beyond academics, I have accumulated{" "}
          <Text style={styles.boldText}>over 300 volunteer hours</Text>, as a
          Website Designer, Blog Writer, and Community Advocate for Mental
          Health. I enjoy exploring mathematical concepts and their applications
          in Image Processing tasks, finding representations of dystopian cinema
          into my work.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  normalText: {
    fontFamily: "Inconsolata-Regular",
    fontSize: 14,
    color: DARKEST,
  },
  boldText: {
    fontFamily: "Inconsolata-Bold",
    fontSize: 14,
    color: DARKEST,
  },
  textBox: {
    flex: 1,
    padding: 48,
    paddingTop: 64,
    paddingBottom: 64,
    justifyContent: "space-around",
  },
  imageBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 345,
    width: 462,
  },
  technologies: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badge: {
    width: 100,
    height: 25,
    marginBottom: 4,
  },
});
