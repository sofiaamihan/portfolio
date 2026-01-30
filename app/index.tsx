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
import Icon from "react-native-vector-icons/FontAwesome6";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const isDesktop = isWeb && width >= 768;

const HEADER_HEIGHT = isDesktop ? 80 : 60;
const FOOTER_HEIGHT = isDesktop ? 100 : 80;

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
];

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top"]} style={styles.mainView}>
        <View style={styles.headerView}>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://linkedin.com/in/yourprofile")
              }
            >
              <Icon name="linkedin" size={24} color="#957c63" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL("https://github.com/yourusername")}
            >
              <Icon name="github" size={24} color="#957c63" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL("mailto:your@email.com")}
            >
              <Icon name="envelope" size={24} color="#957c63" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://letterboxd.com/yourusername")
              }
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../assets/letterboxd.png")}
              ></Image>
            </TouchableOpacity>
          </View>

          <Text>Sofia Amihan</Text>
        </View>

        <View style={styles.middleView}>
          <View>
            <Text>Edit app/index.tsx to edit this screen.</Text>
          </View>

          <View>
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
        </View>

        <View style={styles.footerView}></View>
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
    padding: 16,
  },
  footerView: {
    backgroundColor: "#dffc04",
    height: FOOTER_HEIGHT,
  },
  middleView: {
    backgroundColor: "#5204fc",
    flexGrow: 1,
    flexDirection: "row",
  },
  sideView: {},
  contentView: {},

  headerIcons: {
    flexDirection: "row",
    gap: 16,
  },
});
