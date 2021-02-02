import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '../../common/pagination';
import {getMovies} from "../../../api/API";
import {useHttpClient} from "../../../hooks/http-hook";
import Box from '@material-ui/core/Box';
import {NavLink as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        // paddingTop" '150%', // 3:2
        paddingTop: '150%',
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const IMAGES_URL = 'https://image.tmdb.org/t/p/w500';

function MoviesList() {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [count, setPagesCount] = useState(10);
    const {sendRequest} = useHttpClient();
    // FIXME: setPage is defined but never used
    //        const [page, setPage] = useState(1)
    const page = 1;
    useEffect(() => {
        getMovies(sendRequest, 'movie', {sort_by: 'popularity.asc'}, page)
            .then((response) => {
                console.log(response)
                const {results, total_pages} = response;
                setPagesCount(total_pages)
                setData(results)
            });
    }, [page, sendRequest])

    return (
        <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
                {data.map((card, i) => (
                    <Grid item key={i} xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardMedia
                                component={'img'}
                                className={classes.cardMedia}
                                image={card['backdrop_path'] ? `${IMAGES_URL}${card['backdrop_path']}` : ''}
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {card['title']}
                                </Typography>
                                <Box
                                    component="p"
                                    textOverflow="ellipsis"
                                    overflow="hidden"
                                    whiteSpace='nowrap'
                                    bgcolor="background.paper"
                                >
                                    {card['overview']}
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    <Link component={RouterLink} to={`/movies/${card['id']}`}>
                                        View
                                    </Link>
                                </Button>
                                <Button size="small" color="primary">
                                    Add
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination count={count}/>
        </Container>
    );
}

export default MoviesList;
