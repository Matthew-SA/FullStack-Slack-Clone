import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from "./components/Root"
import { login } from './actions/session_actions'
import { fetchMessages }from '../frontend/util/message_api_util'

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: { id: window.currentUser.id },
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.fetchMessages = fetchMessages
  window.login = login
  window.getState = store.getState;
  window.dispatch = store.dispatch; 
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});

// TODO: 
// - finalize splash page
// - clean up css code
// - fix safari compatability on chat page
// - create edit feature
// - create channel feature