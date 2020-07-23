export const addContact = (contact) => {
  return async (dispatch, getState, getFirebase) => {
    return getFirebase()
      .firestore()
      .collection("users")
      .add({
        ...contact,
        initials: contact.firstName[0] + contact.lastName[0],
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "ADD_CONTACT", contact });
      })
      .catch((err) => {
        dispatch({ type: "ADD_CONTACT_ERROR", err });
      });
  };
};
