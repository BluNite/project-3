import React, { useEffect } from 'react';
import EventItem from '../EventItem';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_EVENTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS, } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function EventList() {
 

  const { loading, data, error } = useQuery(QUERY_EVENTS);
  if (data) console.log(data) 
  if (error) console.log(error) 
  return (
    <div className="my-2">
      <h2>Events:</h2>
      {loading 
        ? <div>Loading </div>
        : data.events.map((event, i) =><EventItem
        key={i}
        _id={event._id}
        name={event.name}
      />)
      } 


      {/* {state.event.length ? (
        <div className="flex-row">
          {filterEvents().map((event) => {
            console.log(event)
            return <EventItem
              key={event._id}
              _id={event._id}
              image={event.image}
              name={event.name}
              price_range={event.price_range}
              // quantity={event.quantity}
            />
          })}
        </div>
      ) : (
        <h3>You haven't searched any events yet!</h3>
      )} */}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default EventList;
