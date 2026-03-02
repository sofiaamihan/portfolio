// import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const DARKEST = "#6c5946";
const POP60 = "#b8746660";

export function ContactMe() {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [message, onChangeMessage] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.informationView}>
        <Image
          source={require("../assets/images/get-in-touch.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formView}>
        <View style={styles.fullName}>
          <View style={styles.nameInput}>
            <Text style={styles.boldText}>First Name</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={onChangeFirstName}
              value={firstName}
            />
          </View>
          <View style={styles.nameInput}>
            <Text style={styles.boldText}>Last Name</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={onChangeLastName}
              value={lastName}
            />
          </View>
        </View>
        <View style={styles.input}>
          <Text style={styles.boldText}>Email</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangeEmail}
            value={email}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.boldText}>Message</Text>
          <TextInput
            multiline
            numberOfLines={10}
            style={[styles.inputText, { minHeight: 120 }]}
            onChangeText={onChangeMessage}
            value={message}
          />
          {/* <Button title="Submit" /> */}
          <Pressable style={styles.submitButton}>
            <Text style={styles.boldText}>Submit</Text>
          </Pressable>
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
    borderBottomWidth: 1,
    borderBottomColor: DARKEST,
    paddingVertical: 8,
    paddingHorizontal: 0,
    minWidth: 200,
  },
  informationView: {
    flex: 1,
    padding: 32,
    paddingTop: 120,
    gap: 8,
    alignItems: "center",
  },
  formView: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  fullName: {
    flexDirection: "row",
  },
  nameInput: {
    margin: 20,
    flex: 1,
  },
  input: {
    margin: 20,
  },
  image: {
    height: 280,
    width: 462,
  },
  submitButton: {
    backgroundColor: POP60,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignSelf: "center",
    marginTop: 16,
    borderRadius: 4,
  },
});
