import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default (Button = ({ styling, onClick, text }) => (
  <TouchableOpacity
    style={[styles.buttonStyle, { ...styling }]}
    onPress={onClick}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  buttonStyle: {
    width: width * 0.7,
    height: height * 0.08,
    backgroundColor: "#4d49ff",
    borderRadius: 50
  },
  buttonText: {
    textAlignVertical: "center",
    textAlign: "center",
    color: "white",
    fontSize: 24,
    flex: 1,
    fontFamily: "Roboto"
  }
});
