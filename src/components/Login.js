import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  AsyncStorage,
  Dimensions,
  Image
} from "react-native";
// import AsyncStorage from '@react-native-community/async-storage';
import Icon from "react-native-vector-icons/dist/FontAwesome";
import Icon1 from "react-native-vector-icons/Entypo";

import firebase from "react-native-firebase";
import { saveFCMToken } from "../endpoints";

import Button from "../common/Button";
import { login } from "../endpoints";
import config from "../constant";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      elevation: 0
    }
  });
  state = {
    style: {},
    err: ''
  };

  //1
  async checkPermission(res) {
    const enabled = await firebase.messaging().hasPermission();
    console.log(enabled);

    if (enabled) {
      this.getToken(res);
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken(res) {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    console.log("already fcm", fcmToken);
    console.log("server fcm", res.fcm);

    if (fcmToken && fcmToken !== res.fcm) {
      saveFCMToken(fcmToken)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log("fcm", fcmToken);
      if (fcmToken) {
        // user has a device token
        saveFCMToken(fcmToken)
          .then(res => console.log(res))
          .catch(err => console.log(err));
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  onFocus = type => {
    const state = { ...this.state };
    state.style = {
      [type]: {
        borderBottomColor: "#4d49ff"
      }
    };

    this.setState(state);
  };

  onBlur = type => {
    console.log("on ONBLUR");
    const state = { ...this.state };
    state.style = {
      [type]: {
        borderBottomColor: "#d6d7da"
      }
    };

    this.setState(state);
  };

  handleInput = (text, type) => {
    this.setState({
      [type]: text
    });
  };

  handleLogin = () => {
    if (this.state.email && this.state.password) {
      login(this.state.email, this.state.password)
        .then(res => res.json())
        .then(res => {
          if (res.token) {
            console.log(res);
            AsyncStorage.setItem("userToken", res.token);
            AsyncStorage.setItem("userId", res._id);
            config.userId = res._id;
            config.token = res.token;
            this.checkPermission(res);
            this.props.navigation.navigate("App");
          }
        })
        .catch(err => {
          console.log(err);
          
          // this.setState({ err });
        })
    }
  };

  handleSignup = () => {
    this.props.navigation.navigate("Signup");
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require("../assets/yolo.png")}
            style={{ width: 100, height: 100, marginTop: -10 }}
          />
          <Text style={styles.heading}>Please! Login to continue</Text>
          <View style={{ marginVertical: height * 0.1 }}>
            <View style={styles.inputContainer}>
              <Icon1 name="email" size={20} color="#4d49ff" />
              <TextInput
                placeholder="Email"
                onChangeText={text => this.handleInput(text, "email")}
                onFocus={() => this.onFocus("email")}
                onBlur={() => this.onBlur("email")}
                style={[styles.input, this.state.style["email"]]}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#4d49ff" />
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={text => this.handleInput(text, "password")}
                onFocus={() => this.onFocus("password")}
                onBlur={() => this.onBlur("password")}
                style={[styles.input, this.state.style["password"]]}
              />
            </View>
          </View>
          <Text>{this.state.err}</Text>
          <View style={{ marginBottom: 10 }}>
            <Button onClick={this.handleLogin} text="Login" />
          </View>
          <Button onClick={this.handleSignup} text="Sign-up" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "column"
  },
  heading: {
    fontSize: 32,
    margin: 20
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.8,
    marginVertical: 20
  },
  input: {
    flex: 1,
    borderStyle: "solid",
    borderBottomColor: "#d6d7da",
    borderBottomWidth: 2,
    marginLeft: 10,
    paddingVertical: 5,
    fontSize: 22
  }
});
