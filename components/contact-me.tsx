import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const DARKEST = "#6c5946";
const POP = "#b87466";

export function ContactMe() {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [message, onChangeMessage] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.informationView}>
        <Text style={styles.subHeader}>Get In Touch!</Text>
        <Text style={styles.boldText}>I&apos;d like to hear from you!</Text>
        <Text style={styles.normalText}>
          If you have any inquiries or just want to say hi, please use the
          contact form!
        </Text>
      </View>
      <View style={styles.formView}>
        <View style={styles.fullName}>
          <View style={styles.input}>
            <Text style={styles.boldText}>First Name</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={onChangeFirstName}
              value={firstName}
              placeholder="First Name"
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.boldText}>Last Name</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={onChangeLastName}
              value={lastName}
              placeholder="Last Name"
            />
          </View>
        </View>
        <View style={styles.input}>
          <Text style={styles.boldText}>Email</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.boldText}>Message</Text>
          <TextInput
            multiline
            numberOfLines={10}
            style={styles.inputText}
            onChangeText={onChangeMessage}
            value={message}
            placeholder="Last Name"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  subHeader: {
    fontFamily: "Inconsolata-Bold",
    fontSize: 14,
    color: DARKEST,
    marginBottom: 4,
    marginTop: 120,
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
  inputText: {
    fontFamily: "Inconsolata-Regular",
    fontSize: 14,
    color: DARKEST,
    borderWidth: 2,
    borderColor: POP,
  },
  informationView: {
    flex: 1,
    padding: 32,
    gap: 8,
  },
  formView: {
    // backgroundColor: POP,
    flex: 1,
    padding: 20,
  },
  fullName: {
    flexDirection: "row",
  },
  input: {
    margin: 20,
  },
});
