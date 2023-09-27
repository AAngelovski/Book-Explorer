import React from "react";
import { styled } from "@mui/material/styles";

const IconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchIconWrapper = ({ children }) => {
  return <IconWrapper>{children}</IconWrapper>;
};

export default SearchIconWrapper;
