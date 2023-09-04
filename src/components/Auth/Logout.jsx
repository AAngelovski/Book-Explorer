import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
const clientId = process.env.REACT_APP_ID;

function Logout() {
  const navigate = useNavigate();
  const onSuccess = () => {
    console.log("Log out successfull!");
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <div className="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"LogOut"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
