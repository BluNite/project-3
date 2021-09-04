import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import Cart from '../components/Cart';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_EVENTS,
} from '../utils/actions';
import { QUERY_EVENTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();

  const [currentEvent, setCurrentEvent] = useState({});

  const { loading, data } = useQuery(QUERY_EVENTS);
  console.log(event)

  const { event, cart } = state;

  useEffect(() => {
    // already in global store
    if (event.length) {
      setCurrentEvent(event.find((event) => event._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_EVENTS,
        event: data.event,
      });

      data.event.forEach((event) => {
        idbPromise('event', 'put', event);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('event', 'get').then((indexedEvents) => {
        dispatch({
          type: UPDATE_EVENTS,
          event: indexedEvents,
        });
      });
    }
  }, [event, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        event: { ...currentEvent, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentEvent, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentEvent._id,
    });

    idbPromise('cart', 'delete', { ...currentEvent });
  };

  return (
    <>
      {currentEvent && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Events</Link>

          <h2>{currentEvent.name}</h2>

          <p>{currentEvent.description}</p>

          <p>
            <strong>Price:</strong>${currentEvent.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentEvent._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentEvent.image}`}
            alt={currentEvent.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
