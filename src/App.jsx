import React from "react";
import { Routes, Route } from "react-router-dom";
import BookDetailsPage from "./pages/bookDetailsPage";
import Homepage from "./pages/Homepage";
import { ThemeProvider, createTheme } from "@mui/material";

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
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/book/:bookId" element={<BookDetailsPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
