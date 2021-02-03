import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import CallMadeIcon from '@material-ui/icons/CallMade';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
    }));

function Drawer() {
    const classes = useStyles();
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState(open);
    };

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button>
                    <ListItemIcon><AllInclusiveIcon/></ListItemIcon>
                    <Link component={RouterLink} to="/">
                        <ListItemText primary='Movies'/>
                    </Link>

                </ListItem>
                <ListItem button>
                    <ListItemIcon><CallMadeIcon/></ListItemIcon>
                    <Link component={RouterLink} to="/">
                        <ListItemText primary='TV shows'/>
                    </Link>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button>
                    <ListItemIcon><ShowChartIcon/></ListItemIcon>
                    <ListItemText primary={`Movies from ${(new Date()).getFullYear()}`}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><ShowChartIcon/></ListItemIcon>
                    <ListItemText primary={`Movies from ${(new Date()).getFullYear() - 1}`}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><ShowChartIcon/></ListItemIcon>
                    <ListItemText primary={`Movies from ${(new Date()).getFullYear() - 2}`}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button>
                    <ListItemIcon><VideoLabelIcon/></ListItemIcon>
                    <ListItemText primary='Family'/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><VideoLabelIcon/></ListItemIcon>
                    <ListItemText primary='Fantasy'/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><VideoLabelIcon/></ListItemIcon>
                    <ListItemText primary='Drama'/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><VideoLabelIcon/></ListItemIcon>
                    <ListItemText primary='Thriller'/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><VideoLabelIcon/></ListItemIcon>
                    <ListItemText primary='Action'/>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
            >
                <MenuIcon/>
            </IconButton>
            <SwipeableDrawer
                anchor='left'
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
}

export default Drawer;
