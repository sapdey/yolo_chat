import React, { Component } from "react";
import { Animated, View, StyleSheet } from "react-native";

export default class TypingMessage extends Component {
  constructor(props) {
    super(props);
    // this.translatePosition = new Animated.Value(0);
    this.translatePosition1 = new Animated.Value(-9);
    this.translatePosition2 = new Animated.Value(-9);
    this.translatePosition3 = new Animated.Value(-9);
  }

  componentDidMount() {
    Animated.loop(
      Animated.stagger(100, [
        // this.startAnimation(this.translatePosition),
        this.startAnimation(this.translatePosition3),
        this.startAnimation(this.translatePosition2),
        this.startAnimation(this.translatePosition1)
      ])
    ).start();
  }

  startAnimation(item) {
    return Animated.sequence([
      Animated.timing(item, {
        toValue: -18,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(item, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(item, {
        toValue: -9,
        duration: 500,
        useNativeDriver: true
      })
    ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [
                {
                  translateY: this.translatePosition1
                }
              ]
            }
          ]}
        >
          .
        </Animated.Text>
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [
                {
                  translateY: this.translatePosition2
                }
              ]
            }
          ]}
        >
          .
        </Animated.Text>
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [
                {
                  translateY: this.translatePosition3
                }
              ]
            }
          ]}
        >
          .
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4d49ff",
    height: 40,
    width: 80,
    paddingLeft: 10,
    // paddingBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 10
  },
  text: {
    color: "white",
    fontSize: 75,
    lineHeight: 50
  }
});
