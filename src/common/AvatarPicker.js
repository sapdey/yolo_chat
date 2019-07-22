import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Animated
} from "react-native";
const { width } = Dimensions.get("window");

// import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import config from "../constant.js";
let arr = [1, 2, 3];
export default class AvatarPicker extends React.Component {
  state = {
    active: this.props.avatar || "a1"
  };
  scrollX = new Animated.Value(0);

  handlePick = avatar => () => {
    this.setState({ active: avatar });
    this.props.handleAvatarUpdate(avatar);
  };

  render() {
    let { active } = this.state;
    let position = Animated.divide(this.scrollX, width);
    return (
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.heading}>Choose your Avatar</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.largeImageContainer}>
            <Image
              source={{ uri: config.url + `/images/avatar/${active}.png` }}
              style={styles.largeImage}
            />
          </View>
        </View>
        <View style={styles.ScrollContainer}>
          <ScrollView
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              // Animated.event returns a function that takes an array where the first element...
              [{ nativeEvent: { contentOffset: { x: this.scrollX } } }] // ... is an object that maps any nativeEvent prop to a variable
            )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
            scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
            // decelerationRate={0}
            // snapToInterval={width - 60}
            // snapToAlignment={"center"}
          >
            <View
              style={{
                width: width,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <View>
                <TouchableWithoutFeedback onPress={this.handlePick("a1")}>
                  <View style={[styles.view, active === "a1" && styles.active]}>
                    <Image
                      source={{ uri: config.url + `/images/avatar/a1.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.handlePick("a2")}>
                  <View style={[styles.view, active === "a2" && styles.active]}>
                    <Image
                      source={{ uri: config.url + `/images/avatar/a2.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={this.handlePick("a3")}>
                  <View style={[styles.view, active === "a3" && styles.active]}>
                    <Image
                      source={{ uri: config.url + `/images/avatar/a3.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.handlePick("a4")}>
                  <View style={[styles.view, active === "a4" && styles.active]}>
                    <Image
                      source={{ uri: config.url + `/images/avatar/a4.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={this.handlePick("a5")}>
                  <View style={[styles.view, active === "a5" && styles.active]}>
                    <Image
                      source={{ uri: config.url + `/images/avatar/a5.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.handlePick("a6")}>
                  <View style={[styles.view, active === "a6" && styles.active]}>
                    <Image
                      source={{ uri: config.url + `/images/avatar/a6.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={this.handlePick("a7")}>
                  <View style={[styles.view, active === "a7" && styles.active]}>
                    <Image
                      source={{ uri: config.url + `/images/avatar/a7.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.handlePick("a8")}>
                  <View style={[styles.view, active === "a8" && styles.active]}>
                    <Image
                      source={{ uri: config.url + `/images/avatar/a8.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <View
              style={{
                width: width,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <View>
                <TouchableWithoutFeedback onPress={this.handlePick("a9")}>
                  <View style={[styles.view, active === "a9" && styles.active]}>
                    <Image
                      source={{ uri: config.url + `/images/avatar/a9.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.handlePick("a10")}>
                  <View
                    style={[styles.view, active === "a10" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a10.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={this.handlePick("a11")}>
                  <View
                    style={[styles.view, active === "a11" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a11.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.handlePick("a12")}>
                  <View
                    style={[styles.view, active === "a12" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a12.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={this.handlePick("a13")}>
                  <View
                    style={[styles.view, active === "a13" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a13.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.handlePick("a14")}>
                  <View
                    style={[styles.view, active === "a14" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a14.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={this.handlePick("a15")}>
                  <View
                    style={[styles.view, active === "a15" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a15.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.handlePick("a16")}>
                  <View
                    style={[styles.view, active === "a16" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a16.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <View
              style={{
                width: width,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <View>
                <TouchableWithoutFeedback onPress={this.handlePick("a17")}>
                  <View
                    style={[styles.view, active === "a17" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a17.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.handlePick("a18")}>
                  <View
                    style={[styles.view, active === "a18" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a18.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={this.handlePick("a19")}>
                  <View
                    style={[styles.view, active === "a19" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a19.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.handlePick("a20")}>
                  <View
                    style={[styles.view, active === "a20" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a20.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={this.handlePick("a21")}>
                  <View
                    style={[styles.view, active === "a21" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a21.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.handlePick("a22")}>
                  <View
                    style={[styles.view, active === "a22" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a22.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={this.handlePick("a23")}>
                  <View
                    style={[styles.view, active === "a23" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a23.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.handlePick("a24")}>
                  <View
                    style={[styles.view, active === "a24" && styles.active]}
                  >
                    <Image
                      source={{ uri: config.url + `/images/avatar/a24.png` }}
                      style={styles.image}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{ flexDirection: "row" }} // this will layout our dots horizontally (row) instead of vertically (column)
          >
            {arr.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [
                  i - 0.50000000001,
                  i - 0.5,
                  i,
                  i + 0.5,
                  i + 0.50000000001
                ], // only when position is ever so slightly more than +/- 0.5 of a dot's index...
                outputRange: [0.3, 1, 1, 1, 0.3], // ... is when the opacity changes from 1 to 0.3
                extrapolate: "clamp"
              });
              // the _ just means we won't use that parameter
              return (
                <Animated.View // we will animate the opacity of the dots later, so use Animated.View instead of View here
                  key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
                  style={{
                    opacity,
                    height: 10,
                    width: 10,
                    backgroundColor: "#595959",
                    margin: 8,
                    borderRadius: 5
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    margin: 10,
    textAlign: "center"
  },
  largeImageContainer: {
    // flex: 1,
    // alignItems: "center",
    width: 105,
    height: 105,
    // padding: 5,
    // marginHorizontal: "auto",
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#eff3f9"
  },
  largeImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  ScrollContainer: {
    //   flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#eff3f9"
  },
  view: {
    borderRadius: 50,
    padding: 5,
    width: 85,
    height: 85,
    // margin: 5,
    borderWidth: 3,
    borderColor: "#eff3f9"
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50
  },
  active: {
    borderColor: "#4d49ff"
  }
});
