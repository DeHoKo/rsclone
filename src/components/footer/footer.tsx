import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GitHubIcon from '@material-ui/icons/GitHub';
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: 'auto',
      backgroundColor: theme.palette.background.paper,
    },
    horizontal: {
      display: 'flex',
    },
    iconWidth: {
      minWidth: '32px',
    },
  }),
);

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container maxWidth="sm">
        <List className={classes.horizontal}  dense={true} >
          <ListItemLink href="https://github.com/vladstepway" target="_blank" rel="noopener">
            <ListItemIcon className={classes.iconWidth}>
              <GitHubIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary="vlad" />
          </ListItemLink>
          <ListItemLink href="https://github.com/dehoko" target="_blank" rel="noopener">
            <ListItemIcon className={classes.iconWidth}>
              <GitHubIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary="dehoko" />
          </ListItemLink>
        </List>
      </Container>
    </footer>
  );
}

export default Footer;
