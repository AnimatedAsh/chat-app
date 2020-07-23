const initState = {
  messages: [],
};

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      console.log("sent message", action.message);
      return state;
    case "SEND_MESSAGE_ERROR":
      console.log("Send message error", action.err);
      return state;
    default:
      return state;
  }
};

export default messageReducer;
