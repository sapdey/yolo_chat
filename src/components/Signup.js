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
import { ScrollView } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/dist/FontAwesome";
import Icon1 from "react-native-vector-icons/Entypo";

import firebase from "react-native-firebase";
import { saveFCMToken, signUp } from "../endpoints";

import Button from "../common/Button";
import { login } from "../endpoints";
import config from "../constant";
import AvatarPicker from "../common/AvatarPicker";
const { width, height } = Dimensions.get("window");

export default class Signup extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      elevation: 0
    }
  });
  state = {
    style: {},
    avatar: "a1"
  };

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

  handleAvatarUpdate = () => avatar => {
    this.setState({ avatar });
  };

  handleCreate = () => {
    if (this.state.name && this.state.email && this.state.password) {
      signUp({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        avatar: this.state.avatar
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);

          if (res._id) {
            this.props.navigation.navigate("Login");
          }
        })
        .catch(err => console.log(err));
    }
  };
  render() {
    let { avatar } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/yolo.png")}
              style={{ width: 100, height: 100, marginTop: -10 }}
            />
            <Text style={styles.heading}>Create your YOLO account</Text>
            <View style={{ marginVertical: height * 0.1, marginVertical: -5 }}>
              <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#4d49ff" />
                <TextInput
                  placeholder="Name"
                  onChangeText={text => this.handleInput(text, "name")}
                  onFocus={() => this.onFocus("name")}
                  onBlur={() => this.onBlur("name")}
                  style={[styles.input, this.state.style["name"]]}
                />
              </View>
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
          </View>
          {/* <View> */}
          <AvatarPicker
            avatar={avatar}
            handleAvatarUpdate={this.handleAvatarUpdate(avatar)}
          />
          {/* </View> */}
          <View style={{ margin: 10, alignItems: "center" }}>
            <Button onClick={this.handleCreate} text="Create" />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "column"
  },
  heading: {
    fontSize: 32,
    margin: 20,
    textAlign: "center"
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
