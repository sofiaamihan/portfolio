// TODO - Update the data
// TODO - Add all the logos, each of appropriate sizing
// TODO - Style the skills and badges
// TODO - Make the duration dynamic

import { useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const DARKEST = "#6c5946";
const POP = "#b874668c";
const TICKET_BG = "#FFEDD2";
const BADGE_BG = "#e2b59a";
const TIMELINE_COL_WIDTH = 32;
const CIRCLE_SIZE = 16;
const CIRCLE_MARGIN_TOP = 8;
const STAGGER_DELAY = 60;

const photos: Record<string, ImageSourcePropType> = {
  math: require("../assets/images/tix-math.png"),
  lad: require("../assets/images/tix-lad.png"),
  pwc: require("../assets/images/tix-pwc.png"),
  ekko: require("../assets/images/tix-ekko.png"),
};

const logos: Record<string, ImageSourcePropType> = {
  math: require("../assets/images/logo-pwc.png"),
  lad: require("../assets/images/logo-lad.png"),
  pwc: require("../assets/images/logo-pwc.png"),
  ekko: require("../assets/images/logo-pwc.png"),
};

const experiencesData = [
  {
    title: "Freelance Maths Tutor",
    type: "Freelance",
    company: "Self-Employed",
    start: "January 2026",
    end: "Present",
    duration: "2 Months",
    location: "Hybrid",
    description: "",
    logoKey: "math",
    photoKey: "math",
    skills: ["Pure Mathematics"],
  },
  {
    title: "Website Designer and Leader",
    type: "Internship",
    company: "LETTERS AGAINST DEPRESSION",
    start: "May 2023",
    end: "Present",
    duration: "2 Years 10 Months",
    location: "Remote",
    description:
      "Built the organisation's website from scratch, enhancing global outreach and engagement. Contributed over 300 volunteer hours across key areas of managing an international non-profit, including blog writing, outreach, social media, fundraising, and letter writing. Promoted from intern to a long-term leadership role.",
    logoKey: "lad",
    photoKey: "lad",
    skills: [
      "User Interface Design",
      "Volunteering",
      "Content Management Systems",
    ],
  },
  {
    title: "Global Technologies Solutions Intern",
    type: "Internship",
    company: "PwC",
    start: "September 2025",
    end: "February 2026",
    duration: "6 Months",
    location: "On-Site",
    description:
      "Managing EUC asset lifecycle operations, including end-user device maintenance, software packaging, release and deployment workflows, as well as related process automations.",
    logoKey: "pwc",
    photoKey: "pwc",
    skills: ["Process Automation", "Business Analysis"],
  },
  {
    title: "Frontend Developer Intern",
    type: "Internship",
    company: "Ekko",
    start: "November 2024",
    end: "February 2025",
    duration: "4 Months",
    location: "Hybrid",
    description:
      "Developed and prototyped interactive designs to enhance user engagement and platform usability at this NUS-based startup. Contributed to frontend development using React, focusing on building responsive and dynamic user interfaces.",
    logoKey: "ekko",
    photoKey: "ekko",
    skills: ["Front-End Development", "Prototyping"],
  },
];

const SkillBadge = ({
  skill,
  index,
  hovered,
}: {
  skill: string;
  index: number;
  hovered: boolean;
}) => {
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const prevHovered = useRef(false);

  if (hovered !== prevHovered.current) {
    prevHovered.current = hovered;

    if (hovered) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 130,
          friction: 14,
          delay: index * STAGGER_DELAY,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          delay: index * STAGGER_DELAY,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 30,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }

  return (
    <Animated.View
      style={[
        styles.badge,
        { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
      ]}
    >
      <Text style={styles.badgeText}>{skill}</Text>
    </Animated.View>
  );
};

const ExperiencesFrame = ({
  experience,
}: {
  experience: (typeof experiencesData)[0];
}) => {
  const [hovered, setHovered] = useState(false);
  const ticketScaleAnim = useRef(new Animated.Value(1)).current;

  const handleMouseEnter = () => {
    setHovered(true);
    Animated.spring(ticketScaleAnim, {
      toValue: 1.01,
      useNativeDriver: true,
      tension: 200,
      friction: 20,
    }).start();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    Animated.spring(ticketScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 20,
    }).start();
  };

  return (
    <View style={styles.row}>
      <View style={styles.timelineColumn}>
        <View style={styles.circle} />
      </View>

      <View style={styles.ticketRow}>
        <Pressable
          // @ts-ignore
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ width: "70%" }}
        >
          <Animated.View
            style={[
              styles.ticket,
              hovered && styles.ticketHovered,
              { transform: [{ scale: ticketScaleAnim }] },
            ]}
          >
            <View style={styles.ticketContent}>
              <Image
                source={logos[experience.logoKey]}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.subHeader}>{experience.title}</Text>
              <View style={styles.dashedDivider} />
              <Text style={styles.normalText}>
                {experience.company} • {experience.type} • {experience.location}
              </Text>
              <Text style={styles.normalText}>
                {experience.start} – {experience.end} • {experience.duration}
              </Text>
              {!!experience.description && (
                <Text style={styles.descriptionText}>
                  {experience.description}
                </Text>
              )}
            </View>

            <View style={styles.photoContainer}>
              <Image
                source={photos[experience.photoKey]}
                style={styles.photo}
                resizeMode="contain"
              />
            </View>
          </Animated.View>
        </Pressable>

        <View style={styles.badgesColumn}>
          {experience.skills.map((skill, idx) => (
            <SkillBadge key={idx} skill={skill} index={idx} hovered={hovered} />
          ))}
        </View>
      </View>
    </View>
  );
};

export function Experiences() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.listWrapper}>
          <View style={styles.continuousLine} />
          {experiencesData.map((experience, i) => (
            <ExperiencesFrame key={`frame-${i}`} experience={experience} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  listWrapper: {
    position: "relative",
  },
  continuousLine: {
    position: "absolute",
    left: TIMELINE_COL_WIDTH / 2 - 1,
    top: CIRCLE_MARGIN_TOP + CIRCLE_SIZE / 2,
    bottom: CIRCLE_MARGIN_TOP + CIRCLE_SIZE / 2 + 16,
    width: 2,
    backgroundColor: POP,
    zIndex: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  timelineColumn: {
    width: TIMELINE_COL_WIDTH,
    alignItems: "center",
    marginRight: 16,
    zIndex: 1,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    marginTop: CIRCLE_MARGIN_TOP,
    zIndex: 2,
    backgroundColor: POP,
  },
  ticketRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  ticket: {
    height: 200,
    flexDirection: "row",
    backgroundColor: TICKET_BG,
    overflow: "hidden",
    marginTop: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  ticketHovered: {
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 8,
  },
  ticketContent: {
    flex: 1,
    padding: 16,
  },
  logo: {
    width: 48,
    height: 28,
    marginBottom: 10,
  },
  subHeader: {
    fontFamily: "Inconsolata-Bold",
    fontSize: 14,
    color: DARKEST,
    marginBottom: 6,
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderBottomColor: DARKEST,
    borderStyle: "dashed",
    marginBottom: 8,
    opacity: 0.4,
  },
  normalText: {
    fontFamily: "Inconsolata-Regular",
    fontSize: 12,
    color: DARKEST,
    marginBottom: 3,
  },
  descriptionText: {
    fontFamily: "Inconsolata-Regular",
    fontSize: 11,
    color: DARKEST,
    marginTop: 6,
    lineHeight: 16,
    opacity: 0.85,
  },
  photoContainer: {
    width: 300,
    position: "relative",
    padding: 16,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  badgesColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 14,
    paddingTop: 6,
    gap: 8,
  },
  badge: {
    backgroundColor: BADGE_BG,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: "flex-start",
    minWidth: 120,
  },
  badgeText: {
    fontFamily: "Inconsolata-Bold",
    fontSize: 12,
    color: DARKEST,
  },
});
