import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
const clientId =
  "445145405690-u115m54j6d5eaedtj79tsmpm0iq520cv.apps.googleusercontent.com";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    console.log("Login Success! Access token: ", res.accessToken);
    onLoginSuccess(res.accessToken);
    navigate("/homepage");
  };

  const onFailure = (res) => {
    console.log("Login Failed! res: ", res);
  };

  return (
    <div className="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        scope="https://www.googleapis.com/auth/books"
      />
    </div>
  );
}

export default Login;
