import React, { useState, Fragment } from "react";
import { Container, Grid } from "@mui/material";
import Header from "../components/common/Header";
import BookResults from "../components/books/BookResults";

const Homepage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
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
