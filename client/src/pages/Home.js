import React from "react";
import EventList from "../components/EventList";
import Cart from "../components/Cart";
import Login from "../pages/Login";
import CategoryMenu from "../components/CategoryMenu"
import { Card, Container, Box, Button, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import SearchBar from "./SearchBar";



const Home = () => {
  return (
    <div className="container" >            
    <SearchBar/><Box component={Card} margin={1} padding={1} display="flex">
       
       <Login/>
    </Box>  
    <Box>
      <EventList/>      
    </Box> 
      <Cart />
    </div>  

  );
};

export default Home;
