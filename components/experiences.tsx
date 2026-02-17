import { ScrollView, StyleSheet, Text, View } from "react-native";

const DARKEST = "#6c5946";
const POP = "#b874668c";
const TECH_BOX_BG = "#e5ddd5";
const TIMELINE_COL_WIDTH = 32;
const CIRCLE_SIZE = 16;
const CIRCLE_MARGIN_TOP = 8;

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
    skills: ["Front-End Development", "Prototyping"],
  },
];

const ExperiencesFrame = ({
  experience,
}: {
  experience: (typeof experiencesData)[0];
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.timelineColumn}>
        <View style={styles.circle} />
      </View>
      <View style={styles.experienceCard}>
        <Text style={styles.subHeader}>{experience.title}</Text>
        <Text style={styles.normalText}>
          {experience.company} • {experience.type} • {experience.location}
        </Text>
        <Text style={styles.normalText}>
          {experience.start} – {experience.end} • {experience.duration}
        </Text>
        {!!experience.description && (
          <Text style={styles.normalText}>{experience.description}</Text>
        )}
        <View style={styles.techStackContainer}>
          {experience.skills.map((skill, idx) => (
            <View key={idx} style={styles.techBox}>
              <Text style={styles.techText}>{skill}</Text>
            </View>
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
  experienceCard: {
    flex: 1,
    backgroundColor: POP,
    padding: 16,
    marginBottom: 16,
    marginTop: 6,
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
    marginBottom: 4,
  },
  techStackContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  techBox: {
    backgroundColor: TECH_BOX_BG,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  techText: {
    fontFamily: "Inconsolata-Regular",
    fontSize: 11,
    color: DARKEST,
  },
});
