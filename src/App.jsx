import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import BookDetailsPage from "./pages/bookDetailsPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider, createTheme } from "@mui/material";
import { gapi } from "gapi-script";
const clientId =
  "445145405690-u115m54j6d5eaedtj79tsmpm0iq520cv.apps.googleusercontent.com";

const App = () => {
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#2199a2",
      },
      secondary: {
        main: "rgb(220, 0, 78)",
      },
      background: {
        default: "#fff",
        paper: "#fff",
      },
    },
    typography: {
      fontSize: 11,
      fontWeightLight: 300,
    },
    props: {
      MuiList: {
        dense: true,
      },
      MuiMenuItem: {
        dense: true,
      },
      MuiTable: {
        size: "small",
      },
      MuiTooltip: {
        arrow: true,
      },
    },
  });

  const [accessToken, setAccessToken] = useState(null);

  const handleLoginSuccess = (token) => {
    setAccessToken(token);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
          ></Route>
          <Route
            path="/homepage"
            element={
              <Homepage
                accessToken={accessToken}
                onLoginSuccess={handleLoginSuccess}
              />
            }
          />
          <Route path="/book/:bookId" element={<BookDetailsPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
