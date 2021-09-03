import React, { useEffect } from 'react';
import EventItem from '../EventItem';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_EVENTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS, } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function EventList() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_EVENTS);
  if (data) console.log(data) 

  // useEffect(() => {
  //   if (data) {
  //     dispatch({
  //       type: UPDATE_EVENTS,
  //       event: data.event,
  //     });
  //     data.event.forEach((event) => {
  //       idbPromise('event', 'put', event);
  //     });
  //   } else if (!loading) {
  //     idbPromise('event', 'get').then((event) => {
  //       dispatch({
  //         type: UPDATE_EVENTS,
  //         event: event,
  //       });
  //     });
  //   }
  // }, [data, loading, dispatch]);

  function filterEvents() {
    if (!currentCategory) {
      return state.event;
    }

    return state.pevent.filter(
      (event) => event.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Events:</h2>
      {state.event.length ? (
        <div className="flex-row">
          {filterEvents().map((event) => (
            <EventItem
              key={event._id}
              _id={event._id}
              image={event.image}
              name={event.name}
              price={event.price}
              quantity={event.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any events yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default EventList;
