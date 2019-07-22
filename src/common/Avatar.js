import React from "react";
import { Image, StyleSheet } from "react-native";
import config from "../constant.js";

export const Avatar = ({ avatar, size }) => (
  <Image
    source={{ uri: config.url + `/images/avatar/${avatar}.png` }}
    style={styles[size]}
  />
);

const styles = StyleSheet.create({
  small: {
    width: 40,
    height: 40,
    borderRadius: 50
  }
});
