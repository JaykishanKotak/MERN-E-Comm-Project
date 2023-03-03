import * as actionTypes from "../constants/chatConstants";

const CHAT_INITIAL_STATE = {
  chatRooms: {},
  socket: false,
  messageReceived: false,
};

export const adminChatReducer = (state = CHAT_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CHATROOMS:
      let currentState = { ...state };
      console.log("in if", currentState);
      //Make a copy of current state
      if (state.chatRooms[action.payload.user]) {
        currentState.chatRooms[action.payload.user].push({
          client: action.payload.message,
        });
        return {
          ...state,
          chatRooms: { ...currentState.chatRooms },
        };
      } else {
        //If user writes for first time
        return {
          ...state,
          chatRooms: {
            ...currentState.chatRooms,
            [action.payload.user]: [{ client: action.payload.message }],
          },
        };
      }
    //Old code
    //return {
    // //Copy of state
    // ...state,
    // //Modified chat room
    // chatRooms: {
    //   "to do:": "chatrooms for admin",
    //   [action.payload.user]: action.payload.message,
    // },
    //};
    case actionTypes.SET_SOCKET:
      return {
        ...state,
        socket: action.payload.socket,
      };
    case actionTypes.MESSAGE_RECEIVED:
      return {
        ...state,
        messageReceived: action.payload.value,
      };
    case actionTypes.REMOVE_CHATROOM:
      let currentState2 = { ...state };
      delete currentState2.chatRooms[action.payload.socketId];
      return {
        //Copy of old state and Changed State
        ...state,
        //Mofied chat rooms
        chatRooms: { ...currentState2.chatRooms },
      };
    default:
      return state;
  }
};
