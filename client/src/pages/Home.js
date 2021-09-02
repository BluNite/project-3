import React from "react";
import EventList from "../components/EventList";
import Cart from "../components/Cart";
import CategoryMenu from "../components/CategoryMenu"
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
    <div className="container" >      
      <Container className={classes.root}>         
        <EventList />
        <CategoryMenu/>
      </Container> 
      <Cart />
    </div>
  );
};

export default Home;
