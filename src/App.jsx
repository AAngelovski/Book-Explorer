import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import BookDetailsPage from "./pages/bookDetailsPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/userPage";
import { ThemeProvider, createTheme } from "@mui/material";
import { gapi } from "gapi-script";
const clientId = process.env.REACT_APP_ID;

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

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/books",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/book/:bookId" element={<BookDetailsPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
