import React from "react";
import Events from "../components/Events";
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40px", 
    padding: 10, 
    display: "block"
  },
}));


const Home = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Events/>
    </Container>

  );
};

export default Home;
