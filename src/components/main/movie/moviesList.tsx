import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
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
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const IMAGES_URL = 'https://image.tmdb.org/t/p/w500';
const sections: { [index: string]: any } =
    {
        0: 'popularity.desc',
        1: 'vote_average.desc',
        2: 'revenue.desc',
        3: 'vote_count.desc',
        4: 'release_date.desc'
    }

type SectionType = {
    sectionType: number, movieType: string
}

function MoviesList({sectionType, movieType}: SectionType) {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [count, setPagesCount] = useState(10);
    const {sendRequest} = useHttpClient();
    const [tabIndex, setTabIndex] = useState(0);
    const [page, setPage] = useState(1);
    const handleChangePage = (e: React.ChangeEvent<unknown>, pageNumber: number) => {
        setPage(pageNumber)
    }
    // FIXME: setPage is defined but never used
    //        const [page, setPage] = useState(1)
    useEffect(() => {
        setTabIndex(sectionType);
        const queryParam = sections[tabIndex];

        getMovies(sendRequest, movieType, {sort_by: queryParam}, page)
            .then((response) => {

                const {results, total_pages} = response;
                setPagesCount(total_pages)
                setData(results)
            });
    }, [movieType, page, tabIndex, sectionType, sendRequest])

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
                                <Box component="h2"
                                     textOverflow="ellipsis"
                                     overflow="hidden"
                                     whiteSpace='nowrap'>
                                    {movieType.includes('tv') ? card['name'] : card['title']}
                                </Box>
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
                                    <Link component={RouterLink} to={`/${movieType}/${card['id']}`}>
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
            <Pagination count={count} onPageChange={handleChangePage}/>
        </Container>
    );
}

export default MoviesList;
