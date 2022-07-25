import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => {
  const authClient = await AuthClient.create();

  if (await authClient.isAuthenticated()) {
    handleAuth(authClient);
  } else {
    await authClient.login({
      identityProvider: "icp-auth-url",
      onSuccess: () => {
        handleAuth(authClient);
      },
    });
  }

  async function handleAuth(authClient) {
    ReactDOM.render(<App />, document.getElementById("root"));
  }
};

init();
