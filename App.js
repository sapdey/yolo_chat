import React from "react";
import { AppState } from "react-native";
import AppContainer from "./src/routes";
import { onMessage, handleSingleNotificationClick } from "./src/notification";

import { NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";
import { status } from "./src/SocketHOC";
import config from "./src/constant";

export default class App extends React.Component {
  static router = AppContainer.router;

  state = {
    appState: AppState.currentState
  };

  componentDidMount() {
    console.log("Root mount");

    // this.onMessage = firebase
    //   .messaging()
    //   .onMessage(message => onMessage(message));

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        // Get the action triggered by the notification being opened

        console.log(notificationOpen);

        if (notificationOpen.notification) {
          const {
            roomId,
            author,
            authorName,
            authorAvatar
          } = notificationOpen.notification.data;
          if (roomId) {
            this.navigator &&
              this.navigator.dispatch(
                NavigationActions.navigate({
                  routeName: "Chat",
                  params: {
                    chatDetails: {
                      roomId,
                      friend: {
                        _id: author,
                        name: authorName,
                        avatar: authorAvatar
                      }
                    }
                  }
                })
              );
          }

          handleSingleNotificationClick(notificationOpen.notification);
        }
      });

    AppState.addEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    console.log(nextAppState);

    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      status({ value: "visible", userId: config.userId });
    } else {
      status({ value: "hidden", userId: config.userId });
    }
    this.setState({ appState: nextAppState });
  };

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  render() {
    return (
      <AppContainer
        {...this.props}
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}
