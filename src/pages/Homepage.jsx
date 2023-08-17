import React, { useState, Fragment, useContext } from "react";
import { Container, Grid } from "@mui/material";
import Header from "../components/common/Header";
import BookResults from "../components/books/BookResults";
import { TokenContext } from "../contexts/token.context";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const { accessToken } = useContext(TokenContext);
  const navigate = useNavigate();

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

      <Container style={{ marginTop: "70px" }}>
        <Grid container>
          <Grid item md={12}>
            <BookResults
              data={data}
              loading={loading}
              page={page}
              setPage={setPage}
              accessToken={accessToken}
            ></BookResults>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Homepage;
