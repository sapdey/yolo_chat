import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions, Animated } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/dist/Feather";

const { width } = Dimensions.get("window");

export default class Message extends Component {
  translatePosition1 = new Animated.Value(0);
  shouldComponentUpdate(nextProps) {
    if (this.props.status !== nextProps.status) {
      return true;
    }
    return false;
  }
  render() {
    console.log("rendered");

    let { marginBlock, align, message, status, created_at } = this.props;
    return (
      <View>
        {align === "left" ? (
          <View style={styles[marginBlock]}>
            <View style={styles.leftMsgContainer}>
              <Text style={styles[align]}>
                {message}
                {"   "}
              </Text>
              {marginBlock === "containerWithoutMargin" &&
                (align === "left" ? (
                  <View style={styles.triangle} />
                ) : (
                  <View style={[styles.triangle, styles.triangleRight]} />
                ))}
              <Text style={styles.leftStatus}>
                {moment(created_at).format("LT")}
              </Text>
            </View>
          </View>
        ) : (
          <View style={[styles[marginBlock], styles.moveRight]}>
            <View style={styles.rightMsgContainer}>
              <Text style={styles[align]}>
                {message}
                {"   "}
              </Text>
              {marginBlock === "containerWithoutMargin" &&
                (align === "left" ? (
                  <View style={styles.triangle} />
                ) : (
                  <View style={styles.triangleRight} />
                ))}
              <Text style={styles.status}>
                {moment(created_at).format("LT")}{" "}
                {status === "pending" ? (
                  <Icon name="loader" size={15} color="#4d49ff" />
                ) : (
                  <Icon name="check" size={15} color="#4d49ff" />
                )}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerWithMargin: {
    flex: 1,
    alignItems: "flex-start",
    marginVertical: 2
  },
  containerWithoutMargin: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 2,
    position: "relative"
  },
  moveRight: {
    // flexDirection: "row",
    // justifyContent: "flex-end",
    
  },
  leftMsgContainer: {
    borderRadius: 10,
    maxWidth: width * 0.7,
    backgroundColor: "#4d49ff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    flexWrap: "wrap",
    flexDirection: "row"
  },
  rightMsgContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: width * 0.7,
    backgroundColor: "#eff3f9",
    alignSelf: "flex-end",
    marginHorizontal: 10,
     flexWrap: "wrap",
    flexDirection: "row"
  },
  left: {
    color: "white",
    fontSize: 16
  },
  right: {
    fontSize: 16
  },
  triangle: {
    position: "absolute",
    top: 0,
    width: 0,
    height: 0,
    left: -10,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 20,
    borderTopWidth: 20,
    borderRightColor: "transparent",
    borderTopColor: "#4d49ff",
    transform: [{ rotate: "90deg" }]
  },
  triangleRight: {
    position: "absolute",
    top: 0,
    right: -10,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 20,
    borderTopWidth: 20,
    borderRightColor: "transparent",
    borderTopColor: "#eff3f9",
    transform: [{ rotate: "0deg" }]
  },
  leftStatus: {
    alignSelf: "flex-end",
    marginLeft: "auto",
    color: "#fff"
  },
  status: {
    alignSelf: "flex-end",
    marginLeft: "auto",
    // alignItems: "center"
  }
});
