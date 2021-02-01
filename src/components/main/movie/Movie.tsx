import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Avatar,
    Box,
    CardMedia,
    Chip,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Tab,
    Tabs,
    Theme,
    Typography
} from "@material-ui/core";
import ImageIcon from '@material-ui/icons/Image';
import CastItem from "./CastItem";
import ImageCard from "./ImageCard";
import {a11yProps, TabPanel} from "../main";
import Divider from "@material-ui/core/Divider";
import {
    getCredits, getImages,
    getKeyWords,
    getMovie,
    MovieCreditsType,
    MovieDetailsType,
    MovieImagesType,
    MovieKeywordsType
} from "../../../api/API";
import {useHttpClient} from "../../../hooks/http-hook";
import {useParams} from 'react-router-dom';

const IMAGES_URL = 'https://image.tmdb.org/t/p/w500';

export interface MovieParamsType {
    id: string;
}

function Movie() {
    const {id} = useParams<MovieParamsType>();

    const [value, setValue] = useState(0);
    const [movieId, setMovieId] = useState(+id);
    const {sendRequest} = useHttpClient();
    const [data, setData] = useState<MovieDetailsType>({} as MovieDetailsType);
    const [credits, setCredits] = useState<MovieCreditsType>({} as MovieCreditsType)
    const [keywords, setKeywords] = useState<MovieKeywordsType>({} as MovieKeywordsType)
    const [images, setImages] = useState<MovieImagesType>({} as MovieImagesType)

    useEffect(() => {
        setMovieId(+id);
        getMovie(sendRequest, movieId)
            .then((response) => {
                setData(response)
            });
    }, [id, sendRequest])

    useEffect(() => {
        setMovieId(+id);
        getKeyWords(sendRequest, movieId)
            .then((response) => {
                console.log(response)
                setKeywords(response)
            });
    }, [id, sendRequest])

    useEffect(() => {
        setMovieId(+id);
        getCredits(sendRequest, movieId)
            .then((response) => {
                console.log(response)
                setCredits(response)
            });
    }, [id, sendRequest])

    useEffect(() => {
        setMovieId(+id);
        getImages(sendRequest, movieId)
            .then((response) => {
                console.log(response)
                setImages(response)
            });
    }, [id, sendRequest])


    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, text: string) => {
        console.log(`You clicked the chip: ${text}`)
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const useStyles = makeStyles((theme: Theme) => ({
        root: {
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            backgroundImage: `url(${IMAGES_URL}${data.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        vote: {
            display: 'flex',
        },
        vote_average: {
            fontWeight: 800,
            paddingRight: 10,
            color: 'green'
        },
        vote_count: {},
        movieImage: {
            width: 250,
            height: 300,
        },
        divider: {
            marginRight: 30,
            marginLeft: 30,
        },
        customList: {
            display: 'flex',
            overflowX: 'scroll'
        }, listItem: {
            flexDirection: 'column',
        }, actionArea: {
            borderRadius: 16,
            transition: '0.2s',
        },
        card: {
            minWidth: 200,
            borderRadius: 16,
            boxShadow: 'none',
        },
        content: {
            backgroundColor: 'white',
            padding: '1rem 1.5rem 1rem',
        },
        cardImage: {
            height: 200
        },
        title: {
            fontFamily: 'Keania One',
            fontSize: 16,
            color: '#000',
        },
        subtitle: {
            fontFamily: 'Montserrat',
            color: '#000',
            opacity: 0.87,
            marginTop: '2rem',
            fontWeight: 500,
            fontSize: 14,
        },
    }));
    const classes = useStyles();
    return (
        <Container maxWidth="xl">
            <Box component={'div'}>
                <Box component={'div'} className={classes.root}>
                    <Box component={'div'}>
                        <CardMedia className={classes.movieImage} component={'img'}
                                   image={`${IMAGES_URL}${data.poster_path}`}/>
                    </Box>
                    <Divider className={classes.divider} orientation="vertical" flexItem/>
                    <Box component={'div'}>
                        <Box component={'div'}>
                            <Typography component='h1'
                                        gutterBottom>{data.title
                                ? data.title
                                : '-'} ({data.original_title ? data.original_title : '-'}) ({data.release_date
                                ? new Date(data.release_date).getFullYear()
                                : '-'})</Typography>
                            <Typography component='h3'
                                        gutterBottom>{data.release_date
                                ? data.release_date : '-'} ({
                                data.production_countries
                                    ? data.production_countries.map((pc) => pc.iso_3166_1).join()
                                    : '-'})
                            </Typography>
                            <Typography component='div'
                                        gutterBottom>{data.genres ? data.genres.map(g => g.name).join() : '-'}</Typography>
                            <Typography
                                component='div'
                                gutterBottom>{data.runtime} min</Typography>
                            <Typography
                                component='div'
                                gutterBottom>{data.status}</Typography>
                        </Box>
                        <Box component={'div'} className={classes.vote}>
                            <Typography className={classes.vote_average} component='div'
                                        gutterBottom>{data.vote_average}</Typography>
                            <Typography className={classes.vote_count} component='div'
                                        gutterBottom>{data.vote_count}</Typography>
                        </Box>
                        <Typography component='h2' gutterBottom>{data.tagline}</Typography>
                        <Typography component='p' gutterBottom>{data.overview}</Typography>
                    </Box>
                </Box>
                <Box component={'div'}>
                    Cast:
                    <List className={classes.customList}>
                        {credits.cast ? credits.cast.map((c, i) =>
                            <ListItem key={i} className={classes.listItem}>
                                <CastItem classes={classes}
                                          image={c.profile_path ? `${IMAGES_URL}${c.profile_path}` : ''}
                                          title={c.name}
                                          subtitle={c.character}/>
                            </ListItem>
                        ) : '-'}
                    </List>
                </Box>
                <Box component={'div'}>
                    Production companies:
                    <List className={classes.customList}>
                        {data.production_companies ? data.production_companies.map((pc, i) =>
                            <ListItem key={i} className={classes.listItem}>
                                <ListItemAvatar>
                                    {pc.logo_path ? <Avatar src={`${IMAGES_URL}${pc.logo_path}`}/> : <ImageIcon/>}
                                </ListItemAvatar>
                                <ListItemText primary={`${pc.name}`} secondary={`${pc.origin_country}`}/>
                            </ListItem>
                        ) : '-'}
                    </List>
                </Box>
                <Box component={'div'}>
                    Media:
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
                            <Tab label="Backdrops" {...a11yProps(0)} />
                            <Tab label="Posters" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        Backdrops:
                        <List component={'ul'} className={classes.customList}>
                            {images.backdrops ? images.backdrops.map((b, i) =>
                                <ImageCard key={i}
                                           classes={classes}
                                           aspect_ratio={b.aspect_ratio}
                                           file_path={b.file_path ? `${IMAGES_URL}${b.file_path}` : ''}
                                           height={b.height}
                                           vote_average={b.vote_average}
                                           vote_count={b.vote_count}
                                           width={b.width}/>) : '-'}
                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Posters:
                        <List component={'ul'} className={classes.customList}>
                            {images.posters ? images.posters.map((p, i) =>
                                <ImageCard key={i} classes={classes}
                                           aspect_ratio={p.aspect_ratio}
                                           file_path={p.file_path ? `${IMAGES_URL}${p.file_path}` : ''}
                                           height={p.height}
                                           vote_average={p.vote_average}
                                           vote_count={p.vote_count}
                                           width={p.width}/>) : '-'}
                        </List>
                    </TabPanel>
                </Box>

                <Box component={'div'}>
                    Keywords: {keywords.keywords
                    ? keywords.keywords.map(kw => kw.name)
                        .map((text, i) =>
                            <Chip size={'small'}
                                  color={'secondary'} key={i}
                                  label={text}
                                  onClick={(e) => handleClick(e, text)}/>)
                    : '-'}
                </Box>
            </Box>
        </Container>
    );
}

export default Movie;