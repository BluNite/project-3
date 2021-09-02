import React, {useState} from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getEvents } from '../../utils/API'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 10,
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Events(props) {
  const [eventState, setEventState] =useState([])
  
   function getEvents(){
    const event = getEvents()
    if (eventState.length === 0)
    setEventState(event)
   }

  const classes = useStyles()
  return (
    <>
    <h2>Events</h2>
    <Paper {...props} className={classes.root}>
      {eventState.map(event => <Paper>{event.title}</Paper>)}
    </Paper>
    </>
  );
}

export default Events;
