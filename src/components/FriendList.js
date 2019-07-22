import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";

import Button from "../common/Button";
import config from "../constant";
import User from "../common/User";
import { Avatar } from "../common/Avatar";

import {
  getUsers,
  createRoom,
  getUserDetails,
  getAllUserRooms
} from "../endpoints";

export default class FriendList extends Component {
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
    rooms: []
  };
  didFocus;

  componentDidMount() {
    // connect({ roomId: "main", userId: config.userId });
    if (config.token) {
      // getAllUserRooms();
      getUserDetails(config.userId)
        .then(res => res.json())
        .then(res => {
          this.props.navigation.setParams({ user: res });
        })
        .catch(err => console.log("frinedlist getUsers", err));

      this.didFocus = this.props.navigation.addListener("didFocus", payload => {
        this.getAllUserRooms();
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

  getAllUserRooms() {
    getAllUserRooms(config.userId)
      .then(res => res.json())
      .then(res => {
        if (res.rooms.length > 0) {
          console.log(res.rooms);

          this.setState({
            rooms: res.rooms
          });
        }
      })
      .catch(err => console.log("Friendlist DidMount", err));
  }

  handleClick = room => () => {
    this.props.navigation.navigate("Chat", {
      chatDetails: {
        roomId: room._id,
        friend: room.friends
      },
      userDetails: this.props.navigation.getParam("user")
    });
  };

  componentWillUnmount() {
    this.didFocus.remove();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#eff3f9" }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ScrollView>
          {this.state.rooms.length > 0 &&
            this.state.rooms.map(room => (
              <User
                onClick={this.handleClick(room)}
                key={room.friends._id}
                name={room.friends.name}
                avatar={room.friends.avatar}
                lastMessage={room.lastMessage}
              />
            ))}
        </ScrollView>
      </View>
    );
  }
}
