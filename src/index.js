import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import fbConfig from "./config/fbConfig";

import "./index.css";
import App from "./App";
import rootReducer from "./services/rootReducer";

library.add(far, fas);

const middlewares = [thunk.withExtraArgument(getFirebase)];
const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
);

// function AuthIsLoaded({ children }) {
//   const auth = useSelector((state) => state.firebase.auth);
//   if (!isLoaded(auth)) return <div>Loading Screen...</div>;
//   return children;
// }
const rrfProps = {
  firebase,
  config: { fbConfig },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      {/* <AuthIsLoaded> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </AuthIsLoaded> */}
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
