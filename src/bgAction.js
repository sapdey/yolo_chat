import { onMessage, readAction, replyAction } from './notification';

export default async (notificationAction) => {

    if(notificationAction.action === "read") {
        readAction(notificationAction.notification)
    }
    if(notificationAction.action === "reply") {
        replyAction(notificationAction)
    }

    console.log(notificationAction);
    
    // onMessage(message);

    return Promise.resolve();
}