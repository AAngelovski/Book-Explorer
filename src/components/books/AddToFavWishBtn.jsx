import React from "react";
import { IconButton, Tooltip } from "@mui/material";

const AddToFavWishBtn = ({ onClick, icon, text }) => {
  const handleButtonClick = async () => {
    try {
      await onClick();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Tooltip title={text}>
      <IconButton size="large" onClick={handleButtonClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default AddToFavWishBtn;
