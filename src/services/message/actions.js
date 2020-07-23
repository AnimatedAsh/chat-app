export const sendMessage = (message, sender, receiver) => {
  return async (dispatch, getState, getFirebase) => {
    return getFirebase()
      .firestore()
      .collection("messages")
      .add({
        message,
        sender,
        receiver,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "SEND_MESSAGE", message });
      })
      .catch((err) => {
        dispatch({ type: "SEND_MESSAGE_ERROR", err });
      });
  };
};
