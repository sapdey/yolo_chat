import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import { Avatar } from "./Avatar";
import moment from "moment";

const { width, height } = Dimensions.get("window");

export default (User = ({ onClick, name, avatar, lastMessage = false }) => (
  <TouchableNativeFeedback
    onPress={onClick}
    background={TouchableNativeFeedback.SelectableBackground()}
  >
    <View style={styles.container}>
      <Avatar avatar={avatar} size="small" />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{name}</Text>
        {lastMessage && (
          <Text numberOfLines={1} style={styles.lastMessage}>{lastMessage.message}</Text>
        )}
      </View>
      {lastMessage && <Text style={styles.time}>{moment(lastMessage.created_at).format("LT")}</Text>}
    </View>
  </TouchableNativeFeedback>
));

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: 50,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5,
    margin: 10,
    padding: 20,
    paddingTop: 10,
    elevation: 3,
    alignItems: "center",
    justifyContent: "flex-start"
    // opacity: 0.5
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 20
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  },
  lastMessage: {
    fontSize: 14,
    width: width * 0.5
  },
  time: {
   marginLeft: "auto"
  }
});
