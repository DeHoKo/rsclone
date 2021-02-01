import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MoviesList from "./movie/moviesList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

export function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const CATEGORIES = ["Most popular", "Highest rated", "Highest budget", "Highest revenue", "Most votes", "Newest"];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 3),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
}));

function Main() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <main className={classes.root}>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
            Placeholder #1
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Placeholder #2
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  Ok #1
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Ok #2
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {CATEGORIES.map((category, index) => {
            return (<Tab key={index} label={ category } {...a11yProps(index)} />);
          })}
        </Tabs>
      </AppBar>
      {CATEGORIES.map((_, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            <MoviesList />
          </TabPanel>);
      })}
    </main>
  );
}

export default Main;
