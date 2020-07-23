const initState = {
  users: [],
};

const contactReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      console.log("added contact", action.contact);
      return state;
    case "ADD_CONTACT_ERROR":
      console.log("Add Contact error", action.err);
      return state;
    default:
      return state;
  }
};

export default contactReducer;
