import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Search from "../Search/Search";
import SearchIconWrapper from "../Search/SearchIconWrapper";
import StyledInputBase from "../Search/StyledInputBase";
import { BookRepository } from "../../repository/BooksRepository";
import SearchIcon from "@mui/icons-material/Search";

export default function Header({ data, setData, setLoading, page, setPage }) {
  const [searchValue, setSearchValue] = useState("");
  const [size, setSize] = useState(12);

  useEffect(() => {
    if (searchValue?.length > 3) {
      const timeoutId = window.setTimeout(() => {
        setData({});
        setPage(0);
        setLoading(true);
        handleFetchData();
      }, 1000);
      return () => window.clearTimeout(timeoutId);
    }
  }, [searchValue]);

  const handleFetchData = () => {
    if (searchValue.length > 3) {
      BookRepository.getAllBooks({
        q: searchValue,
        startIndex: page,
        maxResults: size,
      }).then(
        (res) => {
          console.log(res);
          setSize((prev) => prev);
          setLoading(false);
          setData((prevData) => {
            // Using the callback form to update state based on previous state
            if (prevData && prevData.items) {
              return {
                ...prevData,
                items: [...prevData.items, ...res.data.items],
              };
            } else {
              return res.data;
            }
          });
        },
        (err) => {
          console.log("Error response ", err.rosponse);
          setLoading(false);
          console.log(err);
        }
      );
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [page]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Book Collection
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Logged In
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchValue ? searchValue : ""}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setLoading(true);
                  handleFetchData();
                }
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
