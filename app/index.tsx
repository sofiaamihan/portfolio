import { Button } from "@react-navigation/elements";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const isDesktop = isWeb && width >= 768;

const HEADER_HEIGHT = isDesktop ? 80 : 60;
const FOOTER_HEIGHT = isDesktop ? 60 : 80;
const SIDE_WIDTH = isDesktop ? 200 : 0; // This does NOT make it disappear lols

const LIGHTEST = "#f7f1de";
const DARKEST = "#6c5946";
// const DARK = "#957c63";

const DATA = [
  {
    title: "Home",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "About",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "Projects",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "Education",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Experiences",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Contact Me",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Contact Me",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Contact Me",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Contact Me",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Contact Me",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Contact Me",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Contact Me",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Contact Me",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Contact Me",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "Contact Me",
    data: ["Cheese Cake", "Ice Cream"],
  },
];

export default function Index() {
  const [fontsLoaded] = useFonts({
    "Inconsolata-Regular": require("../assets/fonts/Inconsolata-Regular.ttf"),
    "Inconsolata-Bold": require("../assets/fonts/Inconsolata-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top"]} style={styles.mainView}>
        <View style={styles.headerView}>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.linkedin.com/in/sofia-amihan-molase-respeto-34604827b/",
                )
              }
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/linkedin.png")}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL("https://github.com/sofiaamihan")}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../assets/github.png")}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Linking.openURL("mailto:sofiaamihanmrespeto@gmail.com")
              }
            >
              <Image
                style={{ width: 28, height: 28 }}
                source={require("../assets/email.png")}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://letterboxd.com/ihaami/")}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/letterboxd.png")}
              ></Image>
            </TouchableOpacity>
          </View>

          <Text style={styles.header}>Sofia Amihan</Text>
        </View>

        <View style={styles.middleView}>
          <View style={styles.sideView}>
            <Button>/ Home</Button>
            <Button>/ About</Button>
            <Button>/ Projects</Button>
            <Button>/ Education</Button>
            <Button>/ Experiences</Button>
            <Button>/ Contact Me</Button>
          </View>

          <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <View>
                <Text>{item}</Text>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text>{title}</Text>
            )}
          />
        </View>

        <View style={styles.footerView}>
          {/* <Svg
            height="40"
            width="100%"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <Path
              d="M 0,0 L 3,20"
              fill="none"
              stroke="#957c63"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
            <Path
              d="M 2.8,20 L 97.2,20 "
              fill="none"
              stroke="#957c63"
              strokeWidth="5"
              vectorEffect="non-scaling-stroke"
            />
            <Path
              d="M 97,20 L 100,0"
              fill="none"
              stroke="#957c63"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </Svg> */}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#f7f1de",
    flex: 1,
  },
  headerView: {
    backgroundColor: "#f7f1de",
    height: HEADER_HEIGHT,
    flexDirection: "row",
    padding: 42,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerView: {
    backgroundColor: "transparent", // This does not work because it's not layered over the content
    height: FOOTER_HEIGHT,
    padding: 16,
  },
  middleView: {
    flex: 1,
    flexDirection: "row",
  },
  sideView: {
    backgroundColor: LIGHTEST,
    padding: 16,
    width: SIDE_WIDTH,
  },
  contentView: {},
  headerIcons: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  header: {
    fontFamily: "Inconsolata-Bold",
    fontSize: 20,
    color: DARKEST,
  },
});
