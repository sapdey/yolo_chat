import React from "react";
import { ActivityIndicator, StatusBar, AsyncStorage, View } from "react-native";
// import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from "react-native-splash-screen";

import config from "../constant";

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    config.userId = await AsyncStorage.getItem("userId");
    config.token = userToken;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
