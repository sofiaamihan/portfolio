// TODO - Animation when hovered over

import { Image, StyleSheet, View } from "react-native";

const DARKEST = "#6c5946";
const POP08 = "#e2b59a80";

// const educationData = [
//   {
//     school: "Temasek Polytechnic",
//     year: "2023",
//     duration: "3 Years",
//     grade: "CGPA: 3.95 / 4.00",
//     activities: [
//       "• Vice President: ITSIG",
//       "• ExCo Member: GiT",
//       "• Peer Tutor: 5 Modules",
//     ],
//     awards: [
//       "• TP Scholarship",
//       "• TP Director's List",
//       "• WorldSkills Silver - Software Testing",
//       "• WorldSkills Bronze - Mobile App Development",
//     ],
//     image: require("../assets/images/tp.jpg"),
//   },
//   {
//     school: "Dunman Secondary School",
//     year: "2019",
//     duration: "4 Years",
//     grade: "Triple Pure Sciences",
//     activities: ["• Senior Patrol Leader: Dunman Dove Scouts"],
//     awards: [
//       "• Chief Commissioner's Award",
//       "• Outstanding CCA Leadership Award",
//     ],
//     image: require("../assets/images/dss.jpg"),
//   },
// ];

// const EducationFrame = ({
//   education,
//   index,
// }: {
//   education: (typeof educationData)[0];
//   index: number;
// }) => {
//   return (
//     <View style={styles.educationCard}>
//       <Image
//         source={education.image}
//         style={styles.educationImage}
//         resizeMode="cover"
//       />
//       <View style={styles.title}>
//         <Text style={styles.header}>{education.school}</Text>
//         <Text style={styles.subHeader}>{education.year}</Text>
//       </View>
//       <View style={styles.cardItem}>
//         <Text style={styles.boldText}>Duration: </Text>
//         <Text style={styles.normalText}>{education.duration}</Text>
//       </View>
//       <View style={styles.cardItem}>
//         <Text style={styles.boldText}>Grade: </Text>
//         <Text style={styles.normalText}>{education.grade}</Text>
//       </View>
//       <View style={styles.cardContent}>
//         <Text style={styles.boldText}>Activities: </Text>
//         <View>
//           {education.activities.map((activity, i) => (
//             <Text style={styles.normalText} key={`frame-${i}`}>
//               {activity}
//             </Text>
//           ))}
//         </View>
//       </View>
//       <View style={styles.cardContent}>
//         <Text style={styles.boldText}>Awards: </Text>
//         <View>
//           {education.awards.map((award, i) => (
//             <Text style={styles.normalText} key={`frame-${i}`}>
//               {award}
//             </Text>
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// };

export function Education() {
  return (
    // <View style={styles.container}>
    //   {educationData.map((education, i) => (
    //     <EducationFrame key={`frame-${i}`} education={education} index={i} />
    //   ))}
    // </View>
    <View style={styles.container}>
      <View style={styles.cardRow}>
        <Image
          source={require("../assets/cards/education-card-tp.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Image
          source={require("../assets/cards/education-card-dss.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.image}>
          <View style={styles.cardRow}>
            <Image
              source={require("../assets/cards/movie-card-littlewomen.png")}
              style={styles.movieCard}
              resizeMode="contain"
            />
            <Image
              source={require("../assets/cards/movie-card-bones.png")}
              style={styles.movieCard}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardRow}>
            <Image
              source={require("../assets/cards/movie-card-substance.png")}
              style={styles.movieCard}
              resizeMode="contain"
            />
            <Image
              source={require("../assets/cards/movie-card-eternal.png")}
              style={styles.movieCard}
              resizeMode="contain"
            />
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
  container: {
    flex: 1,
    flexDirection: "row",
  },
  educationCard: {
    backgroundColor: POP08,
    height: "85%",
    width: "32%",
    margin: 20,
    shadowColor: DARKEST,
    shadowOffset: {
      width: 0,
      height: 4,
    },
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
});
