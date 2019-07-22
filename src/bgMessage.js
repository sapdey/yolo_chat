import { onMessage } from './notification';

export default async (message) => {
    console.log("aa gya message");
    
    onMessage(message);

    return Promise.resolve();
}