// import { Button } from "@react-navigation/elements";
import { About } from "@/components/about";
import { ContactMe } from "@/components/contact-me";
import { Education } from "@/components/education";
import { Experiences } from "@/components/experiences";
import { Home } from "@/components/home";
import { Projects } from "@/components/projects";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
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
import Svg, { ClipPath, Defs, Polygon, Rect } from "react-native-svg";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const isDesktop = isWeb && width >= 768;

const HEADER_HEIGHT = isDesktop ? 80 : 60;
const FOOTER_HEIGHT = isDesktop ? 40 : 40;
const SIDE_WIDTH = isDesktop ? 200 : 0; // This does NOT make it disappear lols
const getContentHeight = () => {
  return Dimensions.get("window").height - HEADER_HEIGHT - FOOTER_HEIGHT;
};

const LIGHTEST = "#f7f1de";
const DARKEST = "#6c5946";
const DARK = "#957c63";
// const SHADOW = "#c4a484";
const LIGHT = "#e2b59a";

interface SideNavigationButtonProps {
  title: string;
  onPress?: () => void;
}

const SideNavigationButton: React.FC<SideNavigationButtonProps> = ({
  title,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={styles.sideNavigationButtons} onPress={onPress}>
      <Text style={styles.subHeader}>{title}</Text>
    </TouchableOpacity>
  );
};

const DATA = [
  {
    title: "",
    data: [{ component: Home }],
  },
  {
    title: "c: / sofiaamihan@portfolio / about",
    data: [{ component: About }],
  },
  {
    title: "c: / sofiaamihan@portfolio / projects",
    data: [{ component: Projects }],
  },
  {
    title: "c: / sofiaamihan@portfolio / education",
    data: [{ component: Education }],
  },
  {
    title: "c: / sofiaamihan@portfolio / experiences",
    data: [{ component: Experiences }],
  },
  {
    title: "c: / sofiaamihan@portfolio / contact-me",
    data: [{ component: ContactMe }],
  },
];

export default function Index() {
  const sectionListRef = useRef<SectionList>(null);
  const [sideHeight, setSideHeight] = useState(0); // Invalid hook call keeps appearing

  const [fontsLoaded] = useFonts({
    "Inconsolata-Regular": require("../assets/fonts/Inconsolata-Regular.ttf"),
    "Inconsolata-SemiBold": require("../assets/fonts/Inconsolata-SemiBold.ttf"),
    "Inconsolata-Bold": require("../assets/fonts/Inconsolata-Bold.ttf"),
  });

  const scrollToSection = (sectionIndex: number) => {
    sectionListRef.current?.scrollToLocation({
      sectionIndex: sectionIndex,
      itemIndex: 0,
      animated: true,
      viewPosition: 0, // 0 = top of the screen
    });
  };

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
            <View
              style={styles.sideNavigation}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setSideHeight(height);
              }}
            >
              {sideHeight > 0 && (
                <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                  <Defs>
                    <ClipPath id="clip">
                      <Polygon
                        points={`0,0 ${SIDE_WIDTH * 0.7},0 ${SIDE_WIDTH},${sideHeight * 0.2} ${SIDE_WIDTH},${sideHeight} ${SIDE_WIDTH * 0.2},${sideHeight} 0,${sideHeight * 0.9}`}
                      />
                    </ClipPath>
                  </Defs>
                  <Rect
                    width="100%"
                    height="100%"
                    fill={LIGHT}
                    clipPath="url(#clip)"
                  />
                  {/* Border but incomplete */}
                  {/* <Polygon
                    points={`0,0 ${SIDE_WIDTH * 0.7},0 ${SIDE_WIDTH},${sideHeight * 0.2} ${SIDE_WIDTH},${sideHeight} ${SIDE_WIDTH * 0.2},${sideHeight} 0,${sideHeight * 0.9}`}
                    fill="none"
                    stroke={DARK}
                    strokeWidth="2"
                  /> */}
                </Svg>
              )}
              <SideNavigationButton
                title="/ home"
                onPress={() => scrollToSection(0)}
              ></SideNavigationButton>
              <SideNavigationButton
                title="/ about"
                onPress={() => scrollToSection(1)}
              ></SideNavigationButton>
              <SideNavigationButton
                title="/ projects"
                onPress={() => scrollToSection(2)}
              ></SideNavigationButton>
              <SideNavigationButton
                title="/ education"
                onPress={() => scrollToSection(3)}
              ></SideNavigationButton>
              <SideNavigationButton
                title="/ experiences"
                onPress={() => scrollToSection(4)}
              ></SideNavigationButton>
              <SideNavigationButton
                title="/ contact me"
                onPress={() => scrollToSection(5)}
              ></SideNavigationButton>
            </View>
          </View>

          {/* <SectionList
            ref={sectionListRef}
            style={styles.sectionView}
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
            renderItem={({ item }) => (
              <View style={styles.contentView}>
                <Text style={styles.normalText}>{item}</Text>
              </View>
            )}
            snapToInterval={getContentHeight()}
            decelerationRate="fast"
            snapToAlignment="start"
          /> */}
          <SectionList
            ref={sectionListRef}
            style={styles.sectionView}
            sections={DATA}
            keyExtractor={(item, index) => index.toString()}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
            renderItem={({ item }) => {
              const Component = item.component;
              return (
                <View style={styles.contentView}>
                  <Component />
                </View>
              );
            }}
            snapToInterval={getContentHeight()}
            decelerationRate="fast"
            snapToAlignment="start"
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
  sideNavigation: {
    // backgroundColor: LIGHT, // Reverts to rectangle
    // margin: 16,
    padding: 16,
    paddingTop: 72,
    flex: 1,
    // borderColor: DARK,
    // borderWidth: 1, // Reverts to rectangle
    gap: 48,
  },
  sideNavigationButtons: {
    backgroundColor: "transparent",
    alignItems: "flex-start",
  },
  sectionView: {
    flex: 1,
    padding: 16,
  },
  contentView: {
    flex: 1,
    minHeight: getContentHeight(),
  },
  headerIcons: {
    flexDirection: "row", // Make the icons have the same thickness as the header
    gap: 16,
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
  },
  normalText: {
    fontFamily: "Inconsolata-Bold",
    fontSize: 12,
    color: DARKEST,
  },
});
