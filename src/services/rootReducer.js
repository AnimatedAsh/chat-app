import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { combineReducers } from "redux";
import contactReducer from "./contact/reducer";
import messageReducer from "./message/reducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  contact: contactReducer,
  messages: messageReducer,
});

export default rootReducer;
