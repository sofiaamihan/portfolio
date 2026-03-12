// 1 ---
// TODO - Publish on github pages
// TODO - Add the line at the bottom and shift the footer to the end
// 2 ---
// TODO - Support mobile
// TODO - Screen that says this page not found
// TODO - Convert my badges, icons, etc to SVG format
// TODO - Set up a splash screen in the future
// TODO - Converted side navigation to image, but might have adaptability issues

import { About } from "@/components/about";
import { Education } from "@/components/education";
import { Experiences } from "@/components/experiences";
import { Home } from "@/components/home";
import { Projects } from "@/components/projects";
import { BACKGROUND, DARKEST, PINK, PINK80 } from "@/constants/constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  Linking,
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Svg, { ClipPath, Defs, Polygon, Rect } from "react-native-svg";

const { width } = Dimensions.get("window");
// const { width } = Dimensions.get("window");
// const isWeb = Platform.OS === "web";
// const isDesktop = isWeb && width >= 768;
// const isMobile = width < 740;
// const SIDE_NAVIGATION_WIDTH = 180;
// const HEADER_HEIGHT = isDesktop ? 80 : 60;
// const FOOTER_HEIGHT = isDesktop ? 40 : 40;
// const SIDE_WIDTH = isDesktop ? 200 : 0;
// const getContentHeight = () => {
//   return Dimensions.get("window").height - HEADER_HEIGHT - FOOTER_HEIGHT;
// };
const SIDE_NAVIGATION_WIDTH = 180;
const HEADER_HEIGHT = 80;
const FOOTER_HEIGHT = 40;
const SIDE_WIDTH = 200;
const getContentHeight = () =>
  Dimensions.get("window").height - HEADER_HEIGHT - FOOTER_HEIGHT;

// Helper: create a fade + slide-up animation
function useEntranceAnim(delay: number, ready: boolean) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    if (!ready) return;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 420,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 420,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [ready]);

  return { opacity, translateY };
}

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
  { title: "", data: [{ component: Home }] },
  { title: "c: / sofiaamihan@portfolio / about", data: [{ component: About }] },
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
  // {
  //   title: "c: / sofiaamihan@portfolio / contact-me",
  //   data: [{ component: ContactMe }],
  // },
];

const DELAYS = {
  background: 0,
  header: 100,
  icons: 220,
  sideNav: 380,
  content: 520,
  bottomBar: 640,
  footer: 760,
};

export default function Index() {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isDesktop = isWeb && width >= 768;
  const isMobile = width < 740;
  const sectionListRef = useRef<SectionList>(null);
  const [sideDimensions, setSideDimensions] = useState({ width: 0, height: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [bottomDimensions, setBottomDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [animReady, setAnimReady] = useState(false);

  const headerAnim = useEntranceAnim(DELAYS.header, animReady);
  const iconsAnim = useEntranceAnim(DELAYS.icons, animReady);
  const sideNavAnim = useEntranceAnim(DELAYS.sideNav, animReady);
  const contentAnim = useEntranceAnim(DELAYS.content, animReady);
  const bottomBarAnim = useEntranceAnim(DELAYS.bottomBar, animReady);
  const footerAnim = useEntranceAnim(DELAYS.footer, animReady);

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
    if (!isWeb) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveSection((prev) => {
          const newSection = Math.max(0, prev - 1);
          scrollToSection(newSection);
          return newSection;
        });
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveSection((prev) => {
          const newSection = Math.min(DATA.length - 1, prev + 1);
          scrollToSection(newSection);
          return newSection;
        });
      } else if (event.key === "Escape") {
        scrollToSection(0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      const timer = setTimeout(() => setAnimReady(true), 60);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top"]} style={styles.mainView}>
        {isMobile && (
          <View style={styles.mobileOverlay}>
            <View style={styles.mobileOverlayCard}>
              <Text style={styles.mobileOverlayTitle}>Desktop Only</Text>
              <Text style={styles.mobileOverlayText}>
                Mobile support is a work in progress.{"\n"}
                Please view this on a computer for the full experience.
              </Text>
            </View>
          </View>
        )}
        <Animated.View
          style={[
            styles.headerView,
            {
              opacity: headerAnim.opacity,
              transform: [{ translateY: headerAnim.translateY }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.headerIcons,
              {
                opacity: iconsAnim.opacity,
                transform: [{ translateY: iconsAnim.translateY }],
              },
            ]}
          >
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
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://github.com/sofiaamihan")}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../assets/github.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("mailto:sofiaamihanmrespeto@gmail.com")
              }
            >
              <Image
                style={{ width: 28, height: 28 }}
                source={require("../assets/email.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://letterboxd.com/ihaami/")}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/letterboxd.png")}
              />
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.header}>Sofia Amihan</Text>
        </Animated.View>

        <View style={styles.middleView}>
          <Animated.View
            style={[
              styles.sideView,
              {
                opacity: sideNavAnim.opacity,
                transform: [
                  {
                    translateX: Animated.multiply(
                      sideNavAnim.translateY,
                      new Animated.Value(-1),
                    ),
                  },
                ],
              },
            ]}
          >
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
                  {[
                    "/ home",
                    "/ about",
                    "/ projects",
                    "/ education",
                    "/ experiences",
                    // "/ contact me",
                  ].map((label, i) => (
                    <SideNavigationButton
                      key={label}
                      title={label}
                      isActive={activeSection === i}
                      onPress={() => scrollToSection(i)}
                    />
                  ))}
                </View>
              </ImageBackground>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              { flex: 1 },
              {
                opacity: contentAnim.opacity,
                transform: [{ translateY: contentAnim.translateY }],
              },
            ]}
          >
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
              renderItem={({ item, section }) => {
                const Component = item.component;
                const sectionIndex = DATA.findIndex(
                  (d) => d.title === section.title,
                );
                return (
                  <View style={styles.contentView}>
                    <Component isActive={activeSection === sectionIndex} />
                  </View>
                );
              }}
              snapToInterval={getContentHeight()}
              decelerationRate="fast"
              snapToAlignment="start"
            />
          </Animated.View>
        </View>

        <Animated.View
          style={[
            styles.bottomNavigation,
            {
              opacity: bottomBarAnim.opacity,
              transform: [{ translateY: bottomBarAnim.translateY }],
            },
          ]}
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
          <View style={styles.bottomNavigationInner}>
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
        </Animated.View>

        <Animated.View
          style={[
            styles.footerView,
            {
              opacity: footerAnim.opacity,
              transform: [{ translateY: footerAnim.translateY }],
            },
          ]}
        >
          <Text style={styles.normalText}>
            Build and Designed by Sofia Amihan. All rights reserved. ©
          </Text>
        </Animated.View>
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
    backgroundColor: "transparent",
    height: FOOTER_HEIGHT,
    padding: 8,
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
    flex: 1,
    gap: 48,
  },
  sideNavigationButtonLayout: {
    padding: 16,
    paddingTop: 92,
    gap: 0,
  },
  sideNavigationBackground: {
    height: "100%",
    width: SIDE_NAVIGATION_WIDTH,
  },
  sideNavigationButtons: {
    backgroundColor: "transparent",
    alignItems: "center",
  },
  sectionView: {
    flex: 1,
    padding: 16,
  },
  contentView: {
    flex: 1,
    minHeight: getContentHeight(),
    paddingBottom: 64,
  },
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
  activeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIDE_NAVIGATION_WIDTH * 0.91,
    paddingVertical: 26,
    paddingHorizontal: 8,
    borderRadius: 0,
    marginHorizontal: -8,
    paddingLeft: 16,
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
    bottom: FOOTER_HEIGHT + 8,
    left: SIDE_WIDTH + 32,
    right: 32,
    alignItems: "center",
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 16,
    pointerEvents: "none",
  },
  bottomNavigationInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  bottomNavigationLeft: {
    flexDirection: "row",
    gap: 20,
  },
  bottomNavigationRight: {
    paddingRight: 48,
  },
  mobileOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    backgroundColor: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(12px)", // web only
    justifyContent: "center",
    alignItems: "center",
  },
  mobileOverlayCard: {
    backgroundColor: BACKGROUND,
    borderLeftWidth: 3,
    borderLeftColor: PINK,
    padding: 32,
    margin: 24,
    maxWidth: 320,
    gap: 12,
    alignItems: "center",
  },
  mobileOverlayTitle: {
    fontFamily: "Inconsolata-Bold",
    fontSize: 18,
    color: DARKEST,
  },
  mobileOverlayText: {
    fontFamily: "Inconsolata-Regular",
    fontSize: 13,
    color: DARKEST,
    textAlign: "center",
    lineHeight: 20,
  },
});
