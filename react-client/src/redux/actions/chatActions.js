import * as actionTypes from "../constants/chatConstants";

export const setChatRooms = (user, message) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_CHATROOMS,
    payload: {
      user: user,
      message: message,
    },
  });
};

//prettier-ignore
export const setSocket = (socket) => async (dispatch) => {
  dispatch({
      type: actionTypes.SET_SOCKET,
      payload: {
         socket: socket, 
      }
  })
}

//Admin message recieved icon
//Values will be True or false
export const setMessageReceived = (value) => async (dispatch) => {
  dispatch({
    type: actionTypes.MESSAGE_RECEIVED,
    payload: {
      value: value,
    },
  });
};

export const removeChatRoom = (socketId) => async (dispatch) => {
  dispatch({
    type: actionTypes.REMOVE_CHATROOM,
    payload: {
      socketId: socketId,
    },
  });
};
