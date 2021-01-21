import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  () =>
    createStyles({
      loadScreen: {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
      },
      loadText: {
        color: 'white',
      }
    }),
);

const LoadScreen = () => {
  const classes = useStyles();

  return (
    <Box className={classes.loadScreen}>
      <Typography className={classes.loadText} variant="h2">Loading...</Typography>
    </Box>
  )
}

export default LoadScreen;
