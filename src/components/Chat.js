import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  YellowBox,
  AppState
} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import uuid from "uuid/v4";
import moment from "moment";

import Button from "../common/Button";
import Message from "../common/Message";
import config from "../constant";
import { getRoom, sendMessage, getUserDetails } from "../endpoints";
import TypingMessage from "../common/TypingMessage";
import { socket, connect, createMessage, typing, joinRoom } from "../SocketHOC";
import { Avatar } from "../common/Avatar";

const { width, height } = Dimensions.get("window");

YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

export default class Chat extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    let friend = navigation.getParam("chatDetails", "").friend;
    return {
      headerTitle: (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Avatar size="small" avatar={friend.avatar} />
          <View style={{ marginLeft: 10, justifyContent: "space-around" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", lineHeight: 24 }}>
              {friend.name}
            </Text>
            <Text>{params.headerStatus ? params.headerStatus : ""}</Text>
          </View>
        </View>
      )
    };
  };

  state = {
    chats: [],
    text: "",
    loading: true,
    typing: false,
    fallBackScreen: false,
    appState: AppState.currentState
  };
  chatDetails;
  userDetails;
  page = 1;
  onEndReachedCalledDuringMomentum;
  isTyping = false;
  pageCalled = [];
  didFocus;

  componentDidMount() {
    this.chatDetails = this.props.navigation.getParam("chatDetails", false);
    this.userDetails = this.props.navigation.getParam("userDetails", false);
    console.log(this.chatDetails);
    config.changableData["currentChatFriend"] = this.chatDetails.friend._id;

    // if (this.chatDetails.friend.status) {
    //   this.displaythis.chatDetails.friend.status);
    // }

    this.didFocus = this.props.navigation.addListener("didFocus", payload => {
      this.getRoomData();
      this.getFriendData(this.chatDetails.friend._id);
    });
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  callSocketFunctions({ friend, roomId }) {
    joinRoom({ roomId, userId: friend._id });

    socket.on("newMessage", msg => {
      if (this.userDetails && msg.author !== this.userDetails._id) {
        console.log(this.userDetails, msg);

        this.setState({ chats: [msg, ...this.state.chats] });
      }
    });

    socket.on("typing", value => {
      this.setState({ typing: value });
    });

    socket.on("showstatus", value => {
      console.log(value);
      this.displayStatus(value[this.chatDetails.friend._id]);
    });
  }

  getRoomData() {
    if (this.chatDetails) {
      getRoom(this.chatDetails.roomId, this.chatDetails.friend._id, 1)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.chats.length === 0) {
            return this.setState({
              chats: res.chats,
              fallBackScreen: true,
              loading: false
            });
          }
          if (res.chats)
            this.setState(
              { chats: res.chats.reverse(), loading: false },
              () => {
                console.log(res.chats);
                this.pageCalled.push(this.page);
                this.page++;
                this.callSocketFunctions(this.chatDetails);
              }
            );
        })
        .catch(err => console.log(err));
    }
  }

  getFriendData(id) {
    getUserDetails(id)
      .then(res => res.json())
      .then(res => this.displayStatus(res.status));
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.getRoomData();
    }
    this.setState({ appState: nextAppState });
  };

  displayStatus(time) {
    if (time) {
      let displayStatus =
        time === "Active"
          ? time
          : "Last seen " + moment(time).toNow(true) + " ago";
      this.props.navigation.setParams({
        headerStatus: displayStatus
      });
    }
  }

  handleInputChange = text => {
    this.setState({ text });
    if (this.isTyping === false) {
      this.isTyping = true;
      typing(config.userId, this.chatDetails.roomId);
      timeout = setTimeout(this.timeoutFunction, 1000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(this.timeoutFunction, 1000);
    }
  };

  timeoutFunction = () => {
    this.isTyping = false;
    typing(false, this.chatDetails.roomId);
  };

  handleSendButton = () => {
    if (this.state.text.trim()) {
      let messageBody = {
        message: this.state.text,
        author: this.userDetails._id,
        status: "pending",
        _id: uuid()
      };
      // this.state.chats.length === 0 ? this.state.fallBackScreen = false : null
      this.setState({
        chats: [messageBody, ...this.state.chats]
      });
      sendMessage(this.chatDetails.roomId, messageBody)
        .then(res => {
          if (res.headers.status === 200) res.json();
        })
        .then(res =>
          this.updateMessageStatus({ _id: messageBody._id, status: "Sent" })
        )
        .catch();

      this.setState({ text: "" });
    }
  };

  updateMessageStatus = ({ _id, status }) => {
    this.setState({
      chats: [
        ...this.state.chats.map(chat => {
          if (chat._id === _id) {
            return (chat = {
              ...chat,
              status
            });
          } else return chat;
        })
      ]
    });
  };

  renderMoreChats = () => {
    if (
      this.page > 0 &&
      !this.pageCalled.includes(this.page) &&
      !this.onEndReachedCalledDuringMomentum
    ) {
      this.setState({ loading: true });
      getRoom(this.chatDetails.roomId, this.chatDetails.friend._id, this.page)
        .then(res => res.json())
        .then(res =>
          this.setState(
            {
              chats: [...this.state.chats, ...res.chats.reverse()],
              loading: false
            },
            () => {
              if (res.chats.length > 0) {
                this.pageCalled.push(this.page);
                this.page++;
              } else this.page = 0;
            }
          )
        )
        .catch(err => console.log(err));

      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  componentWillUnmount() {
    this.didFocus.remove();
    AppState.removeEventListener("change", this._handleAppStateChange);
    console.log("Chat component unmounted");
    delete config.changableData["currentChatFriend"];
  }

  render() {
    let { chats, loading, typing, fallBackScreen } = this.state;
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={loading}
          size="large"
          style={{ position: "absolute", left: (width - 20) * 0.5 }}
        />
        {/* <View style={styles.chatContainer}> */}
        {/* <ScrollView
          scrollEnabled={true}
          contentContainerStyle={{
            transform: [{ scaleY: -1 }]
            // height: height -400
            // flexGrow: 1,
            // flexDirection: 'column-reverse',
            // justifyContent: "flex-start"
            // height: "auto"
          }}
          // ref={ref => (this.scrollView = ref)}
          // onContentSizeChange={(contentWidth, contentHeight) => {
          //   this.scrollView.scrollToEnd({ animated: false });
          // }}
        >
          {chats.length > 0 &&
            chats.map((chat, index) => (
              <Message
                key={chat._id}
                align={chat.author === config.userId ? "right" : "left"}
                marginBlock={
                  chats[index + 1] && chats[index + 1].author === chat.author
                    ? "containerWithMargin"
                    : "containerWithoutMargin"
                }
                {...chat}
              />
            ))}
        </ScrollView> */}
        {/* </View> */}
        {chats.length > 0 ? (
          <FlatList
            data={chats}
            inverted
            keyExtractor={item => item._id}
            maxToRenderPerBatch={25}
            initialNumToRender={25}
            renderItem={({ item, index }) => (
              <Message
                align={item.author === config.userId ? "right" : "left"}
                marginBlock={
                  chats[index + 1] && chats[index + 1].author === item.author
                    ? "containerWithMargin"
                    : "containerWithoutMargin"
                }
                {...item}
              />
            )}
            onEndReached={this.renderMoreChats}
            onEndReachedThreshold={0.8}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
          />
        ) : (
          <View style={styles.fallBackContainer}>
            {fallBackScreen && (
              <Text style={styles.fallBackText}>
                Say Hi! to "{this.chatDetails && this.chatDetails.friend.name}"
                with a 😊
              </Text>
            )}
          </View>
        )}
        {this.chatDetails && typing === this.chatDetails.friend._id && (
          <TypingMessage />
        )}
        <View style={styles.bottomBar}>
          <TextInput
            multiline={true}
            onChangeText={text => this.handleInputChange(text)}
            value={this.state.text}
            style={styles.input}
            placeholder="Type a message"
          />
          <Button
            text={<Icon name="send-o" size={20} color="#fff" />}
            styling={{
              width: 54,
              height: 54,
              borderRadius: 50
            }}
            onClick={this.handleSendButton}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  chatContainer: {
    flex: 1,
    flexDirection: "column-reverse",
    padding: 10
  },
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 30
  },
  fallBackText: {
    fontSize: 24
  },
  bottomBar: {
    margin: 10,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  input: {
    width: width - 82,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#d6d7da",
    maxHeight: 80,
    marginRight: 10,
    fontSize: 18,
    paddingHorizontal: 20
  },
  heading: {}
});
