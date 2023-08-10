import React, { useState, Fragment, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import Header from "../components/common/Header";
import BookResults from "../components/books/BookResults";
import Login from "../components/Auth/Login";
import Logout from "../components/Auth/Logout";
import axios from "axios";
import FavouritesPage from "./FavouritesPage";

const Homepage = ({ accessToken, onLoginSuccess }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const fetchBookshelves = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/mylibrary/bookshelves",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Fetched bookshelevs:", response.data);
    } catch (error) {
      console.log(" ERRRROR ", error);
    }
  };

  return (
    <Fragment>
      <Header
        data={data}
        setData={setData}
        loading={loading}
        setLoading={setLoading}
        page={page}
        setPage={setPage}
      ></Header>

      <Container style={{ marginTop: "50px" }}>
        <br></br>
        <Grid container>
          <Grid item md={12} container justifyContent={"center"}>
            {accessToken ? (
              <div>
                <Logout />
                <button onClick={fetchBookshelves}>Fetch Bookshelves</button>
              </div>
            ) : (
              <Login onLoginSuccess={onLoginSuccess} />
            )}
          </Grid>

          {/* <Grid>
            <FavouritesPage accessToken={accessToken} />
          </Grid> */}

          <Grid item md={12}>
            <BookResults
              data={data}
              loading={loading}
              page={page}
              setPage={setPage}
            ></BookResults>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Homepage;
