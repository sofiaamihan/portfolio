import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const DARKEST = "#6c5946";
const POP = "#b874668c";
const TECH_BOX_BG = "#e5ddd5";

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
    logo: "",
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
      "Managing EUC asset lifecycle operations, including end-user device maintenance, software packaging, release and deployment workflows, as well as related process automations.",
    skills: [
      "User Interface Design",
      "Volunteering",
      "Content Management Systems",
    ],
    logo: "",
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
      "Built the organisation's website from scratch, enhancing global outreach and engagement. Contributed over 300 volunteer hours across key areas of managing an international non-profit, including blog writing, outreach, social media, fundraising, and letter writing. Promoted from intern to a long-term leadership role, reflecting my commitment to Letters Against Depression's mission of offering hope and support to those struggling with mental health challenges.",
    skills: ["Process Automation", "Business Analysis"],
    logo: "",
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
      "Developed and prototyped interactive designs to enhance user engagement and platform usability as this NUS-based startup. Contributed to frontend development using frameworks such as React, focusing on building responsive and dynamic user interfaces. Collaborated closely with the design and backend teams to deliver seamless EdTech solutions.",
    skills: ["Front-End Development", "Prototyping"],
    logo: "",
  },
];

const ExperiencesFrame = ({
  experience,
  index,
}: {
  experience: (typeof experiencesData)[0];
  index: number;
}) => {
  return (
    <View style={styles.experienceCard}>
      <View style={styles.experienceLogo}>
        <Image
          source={{ uri: experience.logo }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.experienceContent}>
        <Text style={styles.subHeader}>{experience.title}</Text>
        <Text style={styles.normalText}>
          {experience.company} • {experience.type} • {experience.location}
        </Text>
        <Text style={styles.normalText}>
          {experience.start} - {experience.end} • {experience.duration}
        </Text>
        <Text style={styles.normalText}>{experience.description}</Text>
        <View style={styles.techStackContainer}>
          {experience.skills.map((skill, idx) => (
            <View key={idx} style={styles.techBox}>
              <Text style={styles.normalText}>{skill}</Text>
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
        {experiencesData.map((experience, i) => (
          <ExperiencesFrame
            key={`frame-${i}`}
            experience={experience}
            index={i}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subHeader: {
    fontFamily: "Inconsolata-Bold",
    fontSize: 14,
    color: DARKEST,
    marginBottom: 4,
  },
  normalText: {
    fontFamily: "Inconsolata-Regular",
    fontSize: 12, // for some reason the font isn't the same?? i think the percentages have something to do with it
    color: DARKEST,
    marginBottom: 4,
  },
  experienceCard: {
    backgroundColor: POP,
    height: "25%",
    width: "80%",
    margin: 20,
    flexDirection: "row",
  },
  logo: {
    height: 40,
    width: 40,
    backgroundColor: DARKEST,
    margin: 20,
  },
  experienceLogo: {
    flexDirection: "row",
  },
  experienceContent: {
    flexDirection: "column",
    margin: 20,
    width: "80%",
  },
  scrollContent: {
    paddingHorizontal: 20,
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
