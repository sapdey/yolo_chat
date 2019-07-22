import React from "react";
import { View, Text } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import Icon1 from "react-native-vector-icons/SimpleLineIcons";
import Icon2 from "react-native-vector-icons/Feather";

import Login from "./components/Login";
import UserList from "./components/UserList";
import AuthLoading from "./components/AuthLoading";
import Chat from "./components/Chat";
import FriendList from "./components/FriendList";
import Profile from "./components/Profile";
import Signup from "./components/Signup";

const createMyNavigation = stack => {
  let nav = createStackNavigator({
    stack: {
      screen: stack,
      navigationOptions: () => ({
        headerMode: "none"
      })
    },
    Chat: {
      screen: Chat
    },
    Profile: {
      screen: Profile
    }
  });
  nav.navigationOptions = ({ navigation }) => {
    if (navigation.state.index === 0) {
      return {
        tabBarVisible: true
      };
    }
    return {
      tabBarVisible: false
    };
  };

  return nav;
};

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: createBottomTabNavigator(
      {
        People: createMyNavigation(UserList),
        Chats: createMyNavigation(FriendList)
      },
      {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ tintColor }) => {
            const { routeName } = navigation.state;

            if (routeName === "People") {
              return <Icon1 name="people" size={20} color={tintColor} />;
            } else {
              // return <Icon name="user" size={20} color="#000" />;
              return (
                <Icon2 name="message-square" size={20} color={tintColor} />
              );
            }
            // } else if (routeName === "TV") {
            //   return <Ionicons name="md-tv" size={25} color={tintColor} />;
            // } else if (routeName === "Favorites") {
            //   return (
            //     <MaterialIcons name="favorite" size={25} color={tintColor} />
            //   );
            // }
          }
        }),
        tabBarOptions: {
          activeTintColor: "#4d49ff",
          inactiveTintColor: "gray",
          labelStyle: {
            fontSize: 16,
            fontWeight: "bold"
          }
        }
        // lazy: false
      },
      { initialRouteName: "UserList" }
    ),
    Auth: createStackNavigator(
      {
        Login: {
          screen: Login
        },
        Signup: {
          screen: Signup
        }
      },
      {
        cardStyle: { shadowColor: "transparent" }
      },
      {
        initialRouteName: "Login"
      }
    )
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(AppNavigator);
