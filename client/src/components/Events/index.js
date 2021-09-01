import React from 'react';
import {Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  const classes = useStyles()
  return (
    <>
    <h2>Events</h2>
    <Paper {...props} className={classes.root}>
      Events
    </Paper>
    </>
  );
}

export default Events;
