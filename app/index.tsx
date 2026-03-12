// 1 ---
// TODO - Screen that says mobile support is coming soon
// TODO - Publish on github pages
// TODO - Implement functionality for bottom navigation
// TODO - Implement animations
// TODO - Add the line at the bottom and shift the footer to the end
// 2 ---
// TODO - Support mobile
// TODO - Screen that says this page not found
// TODO - Convert my badges, icons, etc to SVG format
// TODO - Set up a splash screen in the future
// TODO - Converted side navigation to image, but might have adaptability issues

import { About } from "@/components/about";
import { ContactMe } from "@/components/contact-me";
import { Education } from "@/components/education";
import { Experiences } from "@/components/experiences";
import { Home } from "@/components/home";
import { Projects } from "@/components/projects";
import { BACKGROUND, DARKEST, PINK, PINK80 } from "@/constants/constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
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

const SIDE_NAVIGATION_WIDTH = 180;
const HEADER_HEIGHT = isDesktop ? 80 : 60;
const FOOTER_HEIGHT = isDesktop ? 40 : 40;
const SIDE_WIDTH = isDesktop ? 200 : 0; // This does NOT make it disappear lols
const getContentHeight = () => {
  return Dimensions.get("window").height - HEADER_HEIGHT - FOOTER_HEIGHT;
};

interface SideNavigationButtonProps {
  title: string;
  onPress?: () => void;
  isActive?: boolean;
}

const SideNavigationButton: React.FC<SideNavigationButtonProps> = ({
  title,
  onPress = () => {},
  isActive = false,
}) => {
  return (
    <TouchableOpacity style={[styles.sideNavigationButtons]} onPress={onPress}>
      {/* {isActive && <View style={styles.activeIndicator} />} */}
      <View style={[styles.activeBox, isActive && styles.activeBoxVisible]}>
        <Text style={styles.subHeader}>{title}</Text>
        {isActive && (
          <Text style={[styles.subHeader, styles.arrow]}>{"<"}</Text>
        )}
      </View>
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
  const [sideDimensions, setSideDimensions] = useState({ width: 0, height: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [bottomDimensions, setBottomDimensions] = useState({
    width: 0,
    height: 0,
  });

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const sectionIndex = viewableItems[0].section
        ? DATA.findIndex((d) => d.title === viewableItems[0].section.title)
        : 0;
      if (sectionIndex >= 0) setActiveSection(sectionIndex);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const [fontsLoaded] = useFonts({
    "Inconsolata-Regular": require("../assets/fonts/Inconsolata-Regular.ttf"),
    "Inconsolata-SemiBold": require("../assets/fonts/Inconsolata-SemiBold.ttf"),
    "Inconsolata-Bold": require("../assets/fonts/Inconsolata-Bold.ttf"),
  });

  const scrollToSection = (sectionIndex: number) => {
    setActiveSection(sectionIndex);
    sectionListRef.current?.scrollToLocation({
      sectionIndex,
      itemIndex: 0,
      animated: true,
      viewPosition: 0,
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
                const { height, width } = event.nativeEvent.layout;
                setSideDimensions({ width, height });
              }}
            >
              <ImageBackground
                source={require("../assets/side-navigation.png")}
                resizeMode="contain"
                style={styles.sideNavigationBackground}
              >
                <View style={styles.sideNavigationButtonLayout}>
                  <SideNavigationButton
                    title="/ home"
                    isActive={activeSection === 0}
                    onPress={() => scrollToSection(0)}
                  />
                  <SideNavigationButton
                    title="/ about"
                    isActive={activeSection === 1}
                    onPress={() => scrollToSection(1)}
                  />
                  <SideNavigationButton
                    title="/ projects"
                    isActive={activeSection === 2}
                    onPress={() => scrollToSection(2)}
                  />
                  <SideNavigationButton
                    title="/ education"
                    isActive={activeSection === 3}
                    onPress={() => scrollToSection(3)}
                  />
                  <SideNavigationButton
                    title="/ experiences"
                    isActive={activeSection === 4}
                    onPress={() => scrollToSection(4)}
                  />
                  <SideNavigationButton
                    title="/ contact me"
                    isActive={activeSection === 5}
                    onPress={() => scrollToSection(5)}
                  />
                </View>
              </ImageBackground>

              {/* {sideDimensions.width > 0 && sideDimensions.height > 0 && (
                <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                  <Defs>
                    <ClipPath id="clip">
                      <Polygon
                        points={`0,0 ${sideDimensions.width * 0.7},0 ${sideDimensions.width},${sideDimensions.height * 0.1} ${sideDimensions.width},${sideDimensions.height} ${sideDimensions.width * 0.2},${sideDimensions.height} 0,${sideDimensions.height * 0.9}`}
                      />
                    </ClipPath>
                  </Defs>
                  <Rect
                    width="100%"
                    height="100%"
                    fill={PINK80}
                    clipPath="url(#clip)"
                  />
                  <Defs>
                    <ClipPath id="clip2">
                      <Polygon
                        points={`2,2 ${sideDimensions.width * 0.695},2 ${sideDimensions.width - 2},${sideDimensions.height * 0.1} ${sideDimensions.width - 2},${sideDimensions.height - 2} ${sideDimensions.width * 0.2},${sideDimensions.height - 2.5} 2,${sideDimensions.height * 0.9}`}
                      />
                    </ClipPath>
                  </Defs>
                  <Rect
                    width="100%"
                    height="100%"
                    fill={BACKGROUND}
                    clipPath="url(#clip2)"
                  />
                  <Defs>
                    <ClipPath id="clip3">
                      <Polygon
                        points={`4,4 ${sideDimensions.width * 0.69},4 ${sideDimensions.width - 4},${sideDimensions.height * 0.1} ${sideDimensions.width - 4},${sideDimensions.height - 4} ${sideDimensions.width * 0.2},${sideDimensions.height - 5} 4,${sideDimensions.height * 0.9}`}
                      />
                    </ClipPath>
                  </Defs>
                  <Rect
                    width="100%"
                    height="100%"
                    fill={PINK80}
                    clipPath="url(#clip3)"
                  />
                  {/* Potential Fake Inner Shadow*/}
              {/* <Polygon
                    points={`4,4 ${sideDimensions.width * 0.69},4 ${sideDimensions.width - 4},${sideDimensions.height * 0.1} ${sideDimensions.width - 4},${sideDimensions.height - 4} ${sideDimensions.width * 0.2},${sideDimensions.height - 5} 4,${sideDimensions.height * 0.9}`}
                    fill="none"
                    stroke={DARKEST}
                    strokeWidth="6"
                    strokeOpacity="0.15"
                  /> 
                </Svg>
              )} */}
            </View>
          </View>
          <SectionList
            ref={sectionListRef}
            style={styles.sectionView}
            sections={DATA}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
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
          <View
            style={styles.bottomNavigation}
            onLayout={(event) => {
              const { height, width } = event.nativeEvent.layout;
              setBottomDimensions({ width, height });
            }}
          >
            {bottomDimensions.width > 0 && bottomDimensions.height > 0 && (
              <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                <Defs>
                  <ClipPath id="clipBottom">
                    <Polygon
                      points={`0,0 ${bottomDimensions.width},0 ${bottomDimensions.width * 0.95},${bottomDimensions.height} 0,${bottomDimensions.height}`}
                    />
                  </ClipPath>
                </Defs>
                <Rect
                  width="100%"
                  height="100%"
                  fill={PINK80}
                  clipPath="url(#clipBottom)"
                />
              </Svg>
            )}
            <View style={styles.bottomNavigationLeft}>
              <Text style={styles.subHeader2}>[ ⬆ / ⬇ ] Navigate</Text>
              <Text style={styles.subHeader2}>[ ESC ] Home</Text>
            </View>
            <View style={styles.bottomNavigationRight}>
              <Text style={styles.subHeader2}>
                [ sofiaamihanmrespeto@gmail.com ] Contact
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footerView}>
          <Text style={styles.normalText}>
            Build and Designed by Sofia Amihan. All rights reserved. ©
          </Text>
          {/* <Text style={styles.normalText}>All rights reserved. ©</Text> */}
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
    backgroundColor: BACKGROUND,
    flex: 1,
  },
  headerView: {
    backgroundColor: BACKGROUND,
    height: HEADER_HEIGHT,
    flexDirection: "row",
    padding: 42,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerView: {
    backgroundColor: "transparent", // This does not work because it's not layered over the content
    height: FOOTER_HEIGHT,
    padding: 8,
    // justifyContent: "center",
    alignItems: "center",
  },
  middleView: {
    flex: 1,
    flexDirection: "row",
  },
  sideView: {
    backgroundColor: BACKGROUND,
    padding: 16,
    width: SIDE_WIDTH,
  },
  sideNavigation: {
    // backgroundColor: LIGHT, // Reverts to rectangle
    // margin: 16,
    // padding: 16,
    // paddingTop: 72,
    flex: 1,
    // borderColor: DARK,
    // borderWidth: 1, // Reverts to rectangle
    gap: 48,
  },
  sideNavigationButtonLayout: {
    padding: 16,
    paddingTop: 72,
    gap: 0,
  },
  sideNavigationBackground: {
    height: "100%",
    width: SIDE_NAVIGATION_WIDTH,
  },
  sideNavigationButtons: {
    backgroundColor: "transparent",
    alignItems: "center",
    // paddingBottom: 48,
    // height: "20%",
  },
  sectionView: {
    flex: 1,
    padding: 16,
  },
  contentView: {
    flex: 1,
    // margin: 28,
    minHeight: getContentHeight(),
    paddingBottom: 64,
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
    color: BACKGROUND,
  },
  subHeader2: {
    fontFamily: "Inconsolata-Regular",
    fontSize: 14,
    color: BACKGROUND,
  },
  normalText: {
    fontFamily: "Inconsolata-Regular",
    fontSize: 12,
    color: DARKEST,
  },
  // Change the activeBox and activeBoxVisible styles:
  activeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "105%",
    width: SIDE_NAVIGATION_WIDTH * 0.91,
    paddingVertical: 26, // taller hit area
    paddingHorizontal: 8,
    borderRadius: 0, // remove rounding
    marginHorizontal: -8, // bleed to edges (match your sideNavigationButtonLayout padding)
    paddingLeft: 16, // re-add left padding for text
    paddingRight: 16,
  },
  activeBoxVisible: {
    backgroundColor: PINK,
  },
  arrow: {
    marginLeft: 8,
    color: BACKGROUND,
  },
  bottomNavigation: {
    position: "absolute",
    bottom: 16,
    left: SIDE_WIDTH + 32,
    right: 32,
    alignItems: "center",
    // backgroundColor: PINK80,
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 16,
    pointerEvents: "none",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomNavigationLeft: {
    flexDirection: "row",
    gap: 20,
  },
  bottomNavigationRight: {
    paddingRight: 48,
  },
});
