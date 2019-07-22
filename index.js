/**
 * @format
 */
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import bgMessage from "./src/bgMessage.js";
import backgroundActionHandler from "./src/bgAction.js";
import App from "./App.js";

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessage);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundNotificationAction', () => backgroundActionHandler);