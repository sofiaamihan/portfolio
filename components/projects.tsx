import { StyleSheet, Text, View } from "react-native";

const DARKEST = "#6c5946";

export function Projects() {
  return (
    <View>
      <Text style={styles.normalText}>This is the Projects Section.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  normalText: {
    fontFamily: "Inconsolata-Bold",
    fontSize: 14,
    color: DARKEST,
  },
});
