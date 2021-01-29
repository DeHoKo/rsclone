import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  () =>
    createStyles({
      '@keyframes dot1': {
        '0%': {opacity: 0},
        '7%': {opacity: 0.25},
        '14%': {opacity: 0.5},
        '21%': {opacity: 0.75},
        '28%': {opacity: 1}
      },
      '@keyframes dot2': {
        '35%': {opacity: 0},
        '42%': {opacity: 0.25},
        '49%': {opacity: 0.5},
        '56%': {opacity: 0.75},
        '63%': {opacity: 1}
      },
      '@keyframes dot3': {
        '70%': {opacity: 0},
        '77%': {opacity: 0.25},
        '84%': {opacity: 0.5},
        '91%': {opacity: 0.75},
        '100%': {opacity: 1}
      },
      '@keyframes loading': {
        from: {opacity: 0.3},
        to: {opacity: 1}
      },
      dot1: {
        animationName: '$dot1',
        animationDuration: '1s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite'
      },
      dot2: {
        animationName: '$dot2',
        animationDuration: '1s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite'
      },
      dot3: {
        animationName: '$dot3',
        animationDuration: '1s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite'
      },
      loadWord: {
        animationName: '$loading',
        animationDuration: '1.5s',
        animationDirection: 'alternate',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite'
      },
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
      <Typography className={classes.loadText} variant="h2"><span className={classes.loadWord}>Loading</span><span className={classes.dot1}>.</span><span className={classes.dot2}>.</span><span className={classes.dot3}>.</span></Typography>
    </Box>
  )
}

export default LoadScreen;
