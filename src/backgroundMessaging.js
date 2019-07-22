import firebase from "react-native-firebase";
export const backgroundMessageListener = async message => {
  const notification = new firebase.notifications.Notification();

  console.log(message, notification);
  

  // https://rnfirebase.io/docs/v4.3.x/notifications/reference/AndroidAction
  const action = new firebase.notifications.Android.Action(
    "reply",
    "ic_launcher",
    "Reply"
  );

  action.setShowUserInterface(false);

  // https://rnfirebase.io/docs/v4.0.x/notifications/reference/AndroidRemoteInput
  const remoteInput = new firebase.notifications.Android.RemoteInput("input");
  remoteInput.setLabel("Reply");
  action.addRemoteInput(remoteInput);

  notification.android.addAction(action);

  firebase.notifications().displayNotification(notification);

  return Promise.resolve();
};

export const backgroundActionHandler = async notificationOpen => {
  if (notificationOpen.action === "reply") {
    // TODO: Handle the input entered by the user here...
    console.log(notificationOpen);
  }

  return Promise.resolve();
};
