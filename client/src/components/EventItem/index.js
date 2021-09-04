import React from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { Card, Box, Typography, Button } from '@material-ui/core'

function EventItem(event) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { name, _id, url } = event;

  const { cart } = state;

  const addToCart = () => {
    const eventInCart = cart.find((event) => event._id === _id);
    if (eventInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        name,
        _id,
        url,
        purchaseQuantity: parseInt(eventInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...eventInCart,
        purchaseQuantity: parseInt(event.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        event: { ...event, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...event, purchaseQuantity: 1 });
    }
  };

  return (
    <Box component={Card} margin={1} padding={1} display="flex">
      <Typography variant={"h5"}>
        {event.name}
        </Typography> 
        <Button variant="contained" color="primary" >👍Like</Button>     
    </Box> 
      
     
  );
}

// {/* <Link to={`/event/${_id}`}>
//         <img alt={name} src={`/images/${image}`} />
//         <p>{name}</p>
//       </Link> */}

export default EventItem;
