import { StyleSheet, Text, View } from "react-native";

const DARKEST = "#6c5946";

export function ContactMe() {
  return (
    <View>
      <Text style={styles.normalText}>This is the Contact Me Section.</Text>
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
