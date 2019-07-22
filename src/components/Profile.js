import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
  AsyncStorage
} from "react-native";
import Button from "../common/Button";
import config from "../constant";
import { saveFCMToken, getUserDetails, updateUser } from "../endpoints";
import AvatarPicker from "../common/AvatarPicker";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default class Profile extends Component {
  static navigationOptions = {
    title: "Profile"
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      avatar: ""
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    let id = config.userId;
    // getUserDetails(id)
    //   .then(res => res.json())
    //   .then(res => this.setState({ ...res }))
    //   .catch(err => console.log(err));
  }

  async handleLogout() {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
      saveFCMToken("removed")
        .then(res => console.log(res))
        .catch();
      await AsyncStorage.removeItem("fcmToken");
      config.token = "";
      config.userId = "";
      this.props.navigation.navigate("Auth");
      return true;
    } catch (exception) {
      return false;
    }
  }

  handleAvatarUpdate = () => avatar => {
    this.setState({ avatar });
  };

  handleSave() {
    if (this.state.avatar) {
      updateUser({ avatar: this.state.avatar, _id: config.userId });
      config.changableData["avatar"] = this.state.avatar;
    }
  }

  render() {
    // let { name, email, avatar } = this.state;
    console.log(this.props.navigation.getParam("userDetails", false));

    let { name, email, avatar } = this.props.navigation.getParam(
      "userDetails",
      false
    );
    return (
      <ScrollView>
        <View style={styles.container}>
          <AvatarPicker
            avatar={avatar}
            handleAvatarUpdate={this.handleAvatarUpdate(avatar)}
          />
          <View style={{ alignItems: "center" }}>
            <View style={styles.nameView}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>Name: </Text>
              <Text style={{ fontSize: 24 }}>{name}</Text>
            </View>
            <View style={styles.nameView}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>Email: </Text>
              <Text style={{ fontSize: 24 }}>{email}</Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={{ marginBottom: 10 }}>
              <Button text="Save" onClick={this.handleSave} />
            </View>
            <Button text="Logout" onClick={this.handleLogout} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nameView: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.8,
    marginVertical: 10
  }
});
