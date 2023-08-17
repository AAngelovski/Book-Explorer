import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { TokenContext } from "../../contexts/token.context";
const clientId =
  "445145405690-u115m54j6d5eaedtj79tsmpm0iq520cv.apps.googleusercontent.com";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { setAccessToken } = useContext(TokenContext);

  const onSuccess = (res) => {
    console.log("Login Success! Access token: ", res.accessToken);
    const token = res.accessToken;
    localStorage.setItem("accessToken", token);
    setAccessToken(localStorage.getItem("accessToken"));
    setUser(res?.profileObj?.name);
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
