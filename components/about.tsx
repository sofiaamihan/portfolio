// TODO - Hovering or clicking on the badge displays relevant information
// TODO - Animate my profile

import { Image, StyleSheet, Text, View } from "react-native";

const DARKEST = "#6c5946";

export function About() {
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          source={require("../assets/images/profile.png")}
          style={styles.image}
        />
      </View>
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
        <Text style={styles.boldText}>CGPA: 3.95 / 4.0</Text>
        <View>
          <Text style={styles.boldText}>Technologies</Text>
          <View style={styles.technologies}>
            <View>
              <Text style={styles.normalText}>Languages</Text>
              <Image
                style={styles.badge}
                source={require("../assets/badges/javascript.png")}
                resizeMode="contain"
              />
              <Image
                style={styles.badge}
                resizeMode="contain"
                source={require("../assets/badges/python.png")}
              />
              <Image
                style={styles.badge}
                source={require("../assets/badges/kotlin.png")}
                resizeMode="contain"
              />
              <Image
                style={styles.badge}
                source={require("../assets/badges/typescript.png")}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.normalText}>Libraries</Text>
              <Image
                style={styles.badge}
                resizeMode="contain"
                source={require("../assets/badges/react.png")}
              />
              <Image
                style={styles.badge}
                resizeMode="contain"
                source={require("../assets/badges/selenium.png")}
              />
              <Image
                style={styles.badge}
                resizeMode="contain"
                source={require("../assets/badges/compose.png")}
              />
              <Image
                style={styles.badge}
                resizeMode="contain"
                source={require("../assets/badges/reactnative.png")}
              />
            </View>
            <View>
              <Text style={styles.normalText}>Applications</Text>
              <Image
                style={styles.badge}
                resizeMode="contain"
                source={require("../assets/badges/postman.png")}
              />
              <Image
                style={styles.badge}
                resizeMode="contain"
                source={require("../assets/badges/jmeter.png")}
              />
              <Image
                style={styles.badge}
                resizeMode="contain"
                source={require("../assets/badges/raspberrypi.png")}
              />
            </View>
            <View>
              <Text style={styles.normalText}>Databases</Text>
              <Image
                style={styles.badge}
                resizeMode="contain"
                source={require("../assets/badges/mongodb.png")}
              />
              <Image
                style={styles.badge}
                resizeMode="contain"
                source={require("../assets/badges/firebase.png")}
              />
              <Image
                style={styles.badge}
                resizeMode="contain"
                source={require("../assets/badges/room.png")}
              />
              <Image
                style={styles.badge}
                resizeMode="contain"
                source={require("../assets/badges/aws.png")}
              />
            </View>
          </View>
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
