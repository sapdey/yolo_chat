import firebase from "react-native-firebase";
import uuid from "uuid/v4";
import { socket, createMessage, join, connect } from "./SocketHOC";
import config from "./constant.js";
import { sendMessage } from "./endpoints";
// https://rnfirebase.io/docs/v5.x.x/notifications/introduction

let messageBlock = {};

export const onMessage = message => {
  if (messageBlock[message.data.roomId]) {
    // firebase.notifications().removeDeliveredNotification(message.messageId)
    messageBlock = {
      ...messageBlock,
      [message.data.roomId]: `${messageBlock[message.data.roomId]}\n${
        message.data.body
      }`
    };
  } else {
    messageBlock = {
      ...messageBlock,
      [message.data.roomId]: message.data.body
    };
  }

  console.log(message);

  let masterTitle = `${Object.keys(messageBlock).length} chats`;

  const groupNotificationId = "master";
  const masterGroup = new firebase.notifications.Notification().android
    .setChannelId(message.data.channelId)
    .setNotificationId(groupNotificationId);

  masterGroup.android
    .setGroup(groupNotificationId)
    .android.setGroupSummary(true)
    // .setTitle(masterTitle)
    .android.setColor("#4D49FF")
    .android.setSmallIcon("icon")
    .android.setGroupAlertBehaviour(
      firebase.notifications.Android.GroupAlert.Children
    );

  const newNotification = new firebase.notifications.Notification().android
    .setChannelId(message.data.channelId)
    .setNotificationId(message.data.roomId)
    .setTitle(message.data.authorName)
    .setBody(message.data.body)
    .android.setBigPicture(
      config.url + "/images/avatar/a1.png",
      "https://www.google.co.in/images/branding/product/ico/googleg_lodp.ico",
      "test title 1",
      "test title 2"
    )
    .android.setLargeIcon(
      config.url + `/images/avatar/${message.data.authorAvatar}.png`
    )
    .android.setBigText(messageBlock[message.data.roomId])
    .setSound("default")
    .setData(message.Data)
    .android.setAutoCancel(true)
    .android.setGroup(groupNotificationId)
    .setData(message.data)
    .android.setColor("#4D49FF")
    .android.setColorized(true)
    .android.setSmallIcon("icon")
    // .android.setGroupSummary(true)
    .android.setGroupAlertBehaviour(
      firebase.notifications.Android.GroupAlert.Children
    )
    // .android.setSmallIcon("icon")
    .android.setPriority(firebase.notifications.Android.Priority.Max);
  // .android.setCategory(firebase.notifications.Android.Category.Alarm);

  // Build a channel
  const channelId = new firebase.notifications.Android.Channel(
    message.data.channelId,
    "channelName",
    firebase.notifications.Android.Importance.Max
  );

  // Create the channel
  firebase.notifications().android.createChannel(channelId);

  console.log("final noti", masterGroup, newNotification, channelId);
  firebase.notifications().displayNotification(masterGroup);
  const reply = new firebase.notifications.Android.Action(
    "reply",
    "ic_launcher",
    "Reply"
  );
  const remoteInput = new firebase.notifications.Android.RemoteInput(
    "inputText"
  ).setLabel("Message");

  const read = new firebase.notifications.Android.Action(
    "read",
    "ic_launcher",
    "Mark as read"
  );
  read.setShowUserInterface(false);

  // Add the remote input to the action
  reply.addRemoteInput(remoteInput);
  reply.setShowUserInterface(false);
  // Add the action to the notification
  newNotification.android.addAction(reply);
  newNotification.android.addAction(read);
  firebase.notifications().displayNotification(newNotification);

  // Process your message as required
};

export const handleSingleNotificationClick = notification => {
  readAction(notification);
  firebase.notifications().removeAllDeliveredNotifications();
};

export const readAction = notification => {
  let id = notification.notificationId;
  if (id !== "master") {
    delete messageBlock[id];
  }
  firebase.notifications().removeDeliveredNotification(id);
  if (Object.keys(messageBlock).length === 0) {
    firebase.notifications().removeDeliveredNotification("master");
  }
};

export const replyAction = ({ results, notification }) => {
  let text = results.inputText;
  if (text) {
    // connect({
    //   roomId: notification.data.roomId,
    //   userId: notification.data.author
    // });
    let messageBody = {
      message: text,
      author: config.userId,
      status: "pending",
      _id: uuid()
    };
    sendMessage(notification.data.roomId, messageBody);
    readAction(notification);
  }
};
