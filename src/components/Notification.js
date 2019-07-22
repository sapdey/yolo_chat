import firebase from "react-native-firebase";
// https://rnfirebase.io/docs/v5.x.x/notifications/introduction

export const notificationDisplayedListener = () =>
  // app in foreground
  firebase.notifications().onNotificationDisplayed(notification => {
    console.log("onNotificationDisplayed");
    console.log(notification);
  });

export const notificationListener = () =>
  // app in foreground
  firebase.notifications().onNotification(notification => {
    console.log("notificationListener");
    console.log(notification);

    const localNotification = new firebase.notifications.Notification({
      sound: "default",
      show_in_foreground: true,
      show_in_background: true
    })
      .setNotificationId(notification.notificationId)
      .setTitle(notification.title)
      .setSubtitle(notification.subtitle)
      .setBody(notification.body)
      .setData(notification.data)
      .android.setChannelId("General")
      .android.setSmallIcon("@mipmap/ic_notification")
      .android.setColor("#F2C94C")
      .android.setPriority(firebase.notifications.Android.Priority.High);

    firebase.notifications().displayNotification(localNotification);
    console.log("displayed");
    firebase
      .notifications()
      .removeDeliveredNotification(localNotification.notificationId);
  });

export const notificationOpenedListener = () =>
  // app in background
  firebase.notifications().onNotificationOpened(notificationOpen => {
    console.log("notificationOpenedListener");
    console.log(notificationOpen);
    const { action, notification } = notificationOpen;
    firebase
      .notifications()
      .removeDeliveredNotification(notification.notificationId);
    console.log("OPEN:", notification);
  });
