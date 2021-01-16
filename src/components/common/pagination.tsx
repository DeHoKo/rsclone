import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      pagination: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
      },
    }),
);

function PaginationLink() {
  const classes = useStyles();

  return (
    <Route>
      {({ location }) => {
        const query = new URLSearchParams(location.search);
        const page = parseInt(query.get('page') || '1', 10);
        return (
          <Pagination
            className={classes.pagination}
            page={page}
            count={10}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/${item.page}`}
                {...item}
              />
            )}
          />
        );
      }}
    </Route>
  );
}

export default PaginationLink;
