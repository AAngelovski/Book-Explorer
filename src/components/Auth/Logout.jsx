import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
const clientId =
  "445145405690-u115m54j6d5eaedtj79tsmpm0iq520cv.apps.googleusercontent.com";

function Logout() {
  const navigate = useNavigate();
  const onSuccess = () => {
    console.log("Log out successfull!");
    navigate("/");
  };
  return (
    <div className="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
