import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./Context/UserContext";
import { UserContextProviderC } from "./Context/UserContextC.jsx";
import { UserContextProviderChat } from "./Context/UserContextChat.jsx";
import { UserContextProviderA } from "./Context/UserContextA.jsx";
import { UserContext2Provider } from "./Context/UserContext2.jsx";
import { Provider } from "react-redux";
import { store } from "./state/store.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <UserContext2Provider>
      <UserContextProviderChat>
        <UserContextProviderC>
          <App />
        </UserContextProviderC>
      </UserContextProviderChat>
    </UserContext2Provider>
  </Provider>
);
