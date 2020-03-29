import React, { Component } from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import {
  withAuthenticator,
  Authenticator,
  SignIn,
  SignOut,
  ConfirmSignIn,
  RequireNewPassword,
  VerifyContact,
  ForgotPassword,
  Loading,
  Greetings
} from "aws-amplify-react";
import randomatic from "randomatic";
import "./__assets/css/styles.css";

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "us-west-2:870228032967:userpool/us-west-2_mBrJrDC39",

    // REQUIRED - Amazon Cognito Region
    region: "us-west-2",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: "us-west-2",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-west-2_mBrJrDC39",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "4ka3brtvg2iquo3oh2d25gm2jb",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: "USER_SRP_AUTH"
  }
});

const MriPlusTheme = {
  Button: {
    position: "relative",
    width: "100%",
    borderRadius: "4px",
    marginBottom: "10px",
    cursor: "pointer",
    padding: 0,
    fontFamily: "Amazon Ember",
    color: "red",
    backgroundColor: "blue",
    fontSize: "14px",
    "#amazon_signin_btn": {
      backgroundColor: "blue",
      border: "none"
    }
  }
};

class App extends Component {
  render() {
    const {
      authData: { attributes, username }
    } = this.props;
    const attrs = Object.keys(attributes).map(it => {
      return (
        <p key={it}>
          <strong>{it}:</strong> {attributes[it]}
        </p>
      );
    });
    return (
      <main className="wrapper--center responsive">
        <div className="wrapper--content">
          <p>
            <strong>username:</strong> {username}
          </p>
          {attrs}
          <SignOut />
        </div>
      </main>
    );
  }
}

const AuthedApp = withAuthenticator(App, false, [
  <Greetings />,
  <SignIn />,
  <SignOut />,
  <ConfirmSignIn />,
  <RequireNewPassword />,
  <VerifyContact />,
  <ForgotPassword />,
  <Loading />
]);

const rootElement = document.getElementById("root");
ReactDOM.render(<AuthedApp />, rootElement);
