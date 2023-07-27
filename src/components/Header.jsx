import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { BookRepository } from "../repository/BooksRepository";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header({ data, setData, setLoading }) {
  const [searchValue, setSearchValue] = useState();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);

  useEffect(() => {
    if (searchValue?.length > 3) {
      const timeoutId = window.setTimeout(() => {
        handleFetchData();
      }, 1000);
      return () => window.clearTimeout(timeoutId);
    }
  }, [searchValue]);

  const handleFetchData = () => {
    if (searchValue.length > 3) {
      setLoading(true);
      BookRepository.getAllBooks({
        q: searchValue,
        startIndex: page,
        maxResults: size,
      }).then(
        (res) => {
          console.log(res);
          setLoading(false);
          setData(res.data);
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
    if (searchValue?.length > 3) {
      BookRepository.getAllBooks({
        q: searchValue,
        startIndex: page,
        maxResults: size,
      }).then(
        (res) => {
          setLoading(false);
          let tmpData = { ...data };
          tmpData.items = tmpData?.items.concat(res?.data?.items);
          setData(tmpData);
        },
        (err) => {
          setLoading(false);
          console.log(err);
        }
      );
    }
  }, [page]);

  window.addEventListener("scroll", function () {
    // Viewport height
    const windowHeight = window.innerHeight;

    // Total height of the content, including hidden parts
    const fullHeight = document.body.scrollHeight;

    // Current scroll position from the top
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // Calculate the distance from the bottom of the page
    const distanceFromBottom = fullHeight - (currentScroll + windowHeight);

    // Check if the distance from the bottom is very small (e.g., 1 pixel)
    // to account for rounding errors and ensure the user is at the bottom.
    const isAtBottom = distanceFromBottom <= 1;

    // Your code to execute when the user reaches the bottom of the page
    if (isAtBottom) {
      setPage((prevPage) => prevPage + 1);
    }
  });

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
