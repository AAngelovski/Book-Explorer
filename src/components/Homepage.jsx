import React, { useState, Fragment } from "react";
import { Container, Grid } from "@mui/material";
import Header from "./Header";
import BookResults from "./BookResults";

const Homepage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  return (
    <Fragment>
      <Header data={data} setData={setData} setLoading={setLoading}></Header>
      <Container style={{ marginTop: "50px" }}>
        <br></br>
        <Grid container>
          <Grid item md={12}>
            <BookResults data={data} loading={loading}></BookResults>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Homepage;
