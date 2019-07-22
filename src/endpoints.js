import config from "./constant";

export const login = (email, password) => {
  return fetch(config.url + "/user/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });
};

export const signUp = userDetails => {
  return fetch(config.url + "/user/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userDetails)
  });
};

export const saveFCMToken = token => {
  console.log("from saveFCM", token);

  return fetch(config.url + "/user/saveFCM", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "bearer " + config.token
    },
    body: JSON.stringify({
      token,
      _id: config.userId
    })
  });
};

export const getUserDetails = id => {
  return fetch(config.url + `/user/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "bearer " + config.token
    }
  });
};

export const getUsers = () => {
  return fetch(config.url + `/user/list/${config.userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "bearer " + config.token
    }
  });
};

export const updateUser = user => {
  return fetch(config.url + "/user/updateUser", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "bearer " + config.token
    },
    body: JSON.stringify({
      user
    })
  });
};

export const getAllUserRooms = id => {
  return fetch(config.url + `/room/getAllUserRooms/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "bearer " + config.token
    }
  });
};

export const getRoom = (roomId, friendId, page) => {
  console.log("called");

  return fetch(`${config.url}/room/getRoom/${page}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "bearer " + config.token
    },
    body: JSON.stringify({
      roomId: roomId,
      userId: friendId
    })
  });
};

export const createRoom = friendId => {
  return fetch(config.url + "/room/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "bearer " + config.token
    },
    body: JSON.stringify({
      from: {
        _id: config.userId
      },
      with: {
        _id: friendId
      }
    })
  });
};

export const sendMessage = (roomId, messageBody) => {
  return fetch(config.url + "/message/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "bearer " + config.token
    },
    body: JSON.stringify({
      roomId,
      messageBody
    })
  });
};
