import React, { useEffect } from "react";
import { auth } from "../firebase";
import * as firebaseui from "firebaseui";
import * as firebase from "firebase";
import "firebaseui/dist/firebaseui.css";

const Login = () => {
  useEffect(() => {
    const uiConfig = {
      autoUpgradeAnonymousUsers: true,
      signInSuccessUrl: '/success',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      tosUrl: '/tos',
      privacyPolicyUrl: function () {
        window.location.assign('/privacy-policy');
      }
    };

    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', uiConfig);
  }, []);
  return (
    <div id="firebaseui-auth-container"></div>
  )
};

export default Login;