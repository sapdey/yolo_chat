import React, { Component } from "react";
import { View, TouchableOpacity, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import firebase from "react-native-firebase";

import config from "../constant";
import { getUsers, createRoom, getUserDetails } from "../endpoints";
import User from "../common/User";
import { ScrollView } from "react-native-gesture-handler";
import { connect, socket } from "../SocketHOC";
import { Avatar } from "../common/Avatar";

export default class UserList extends Component {
  static navigationOptions = ({ navigation }) => {
    let userDetails = navigation.getParam("user");
    let avatar = userDetails ? userDetails.avatar : "";
    return {
      headerTitle: "YOLO",
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile", { userDetails })}
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 20
          }}
        >
          <Avatar size="small" avatar={avatar} />
        </TouchableOpacity>
      ),
      headerStyle: {
        elevation: 0,
        backgroundColor: "#fff"
      }
    };
  };

  state = {
    users: []
  };
  didFocus;
  allowItemClick = true;

  componentDidMount() {
    connect({ roomId: "main", userId: config.userId });
    if (config.token) {
      getUsers()
        .then(res => res.json())
        .then(res => {
          if (res.users.length > 0)
            this.setState({
              users: res.users
            });
        })
        .catch(err => console.log("Userlist DidMount", err));

      getUserDetails(config.userId)
        .then(res => res.json())
        .then(res => {
          this.props.navigation.setParams({ user: res });
        })
        .catch(err => console.log("Userlist getUsers", err));

      this.didFocus = this.props.navigation.addListener("didFocus", payload => {
        if (config.changableData["avatar"]) {
          this.props.navigation.setParams({
            user: {
              ...this.props.navigation.getParam("user"),
              avatar: config.changableData["avatar"]
            }
          });
        }
      });
    }
  }

  handleClick = user => () => {
    if (config.token && config.userId && user._id && this.allowItemClick) {
      this.allowItemClick = false;

      createRoom(user._id)
        .then(res => {
          if (res.status === 409 || res.status === 201) {
            return res.json();
          } else throw new Error(res);
        })
        .then(res => {
          if (res.roomId) {
            this.props.navigation.navigate("Chat", {
              chatDetails: {
                roomId: res.roomId,
                friend: user
              },
              userDetails: this.props.navigation.getParam("user")
            });
          }
          this.allowItemClick = true;
        })
        .catch(err => {
          this.allowItemClick = true;
          console.log("UserList handleClick", err);
        });
    }
  };

  componentWillUnmount() {
    this.didFocus.remove();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#eff3f9" }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ScrollView>
          {this.state.users.length > 0 &&
            this.state.users.map(user => (
              <User
                onClick={this.handleClick(user)}
                key={user._id}
                name={user.name}
                avatar={user.avatar}
              />
            ))}
        </ScrollView>
      </View>
    );
  }
}
