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
        <View>
          <Text style={styles.boldText}>CGPA: 3.95/4.0</Text>
          <View>
            <Text style={styles.boldText}>
              Focus: Software Development for Web and Mobile Applications
            </Text>
            <ul>
              <li style={styles.normalText}>JavaScript - React.js</li>
              <li style={styles.normalText}>TypeScript - React Native</li>
              <li style={styles.normalText}>Python - Machine Learning</li>
              <li style={styles.normalText}>Kotlin - Jetpack Compose</li>
            </ul>
          </View>
          <View>
            <Text style={styles.boldText}>Focus: Software Testing</Text>
            <ul>
              <li style={styles.normalText}>Python - Selenium</li>
              <li style={styles.normalText}>JavaScript - Postman</li>
              <li style={styles.normalText}>Java - JMeter</li>
            </ul>
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
    height: 450,
    width: 500,
  },
});
