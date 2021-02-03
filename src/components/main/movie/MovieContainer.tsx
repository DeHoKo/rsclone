import React, {useEffect, useState} from 'react';
import {Container, makeStyles, Theme} from "@material-ui/core";
import {
    getCredits,
    getImages,
    getKeyWords,
    getMovie,
    MovieCreditsType,
    MovieDetailsType,
    MovieImagesType,
    MovieKeywordsType,
    TVDetailsType
} from "../../../api/API";
import {useHttpClient} from "../../../hooks/http-hook";
import {useLocation, useParams} from 'react-router-dom';
import TVComponent from './TVComponent';
import MovieComponent from "./MovieComponent";

export const IMAGES_URL = 'https://image.tmdb.org/t/p/w500';

export interface MovieParamsType {
    id: string;
}

function MovieContainer() {
    const {id} = useParams<MovieParamsType>();

    const [value, setValue] = useState(0);
    const [movieId, setMovieId] = useState(+id);
    const {sendRequest} = useHttpClient();
    const [movieDetails, setMovieDetails] = useState<MovieDetailsType>({} as MovieDetailsType);
    const [tvDetails, setTVDetails] = useState<TVDetailsType>({} as TVDetailsType);

    const [credits, setCredits] = useState<MovieCreditsType>({} as MovieCreditsType)
    const [keywords, setKeywords] = useState<MovieKeywordsType>({} as MovieKeywordsType)
    const [images, setImages] = useState<MovieImagesType>({} as MovieImagesType)
    const [movieType, setMovieType] = useState('movie')
    const {pathname} = useLocation()
    useEffect(() => {
        pathname.includes('tv') ?
            setMovieType('tv') : setMovieType('movie');
    }, [pathname, movieType])

    useEffect(() => {
        setMovieId(+id);
        getMovie(sendRequest, movieId, movieType)
            .then((response) => {
                movieType.includes('tv') ? setTVDetails(response) : setMovieDetails(response)
            });
    }, [movieId, movieType, id, sendRequest])

    useEffect(() => {
        setMovieId(+id);
        getKeyWords(sendRequest, movieId, movieType)
            .then((response) => {

                setKeywords(response)
            });
    }, [movieId, movieType, id, sendRequest])

    useEffect(() => {
        setMovieId(+id);
        getCredits(sendRequest, movieId, movieType)
            .then((response) => {

                setCredits(response)
            });
    }, [movieId, movieType, id, sendRequest])

    useEffect(() => {
        setMovieId(+id);
        getImages(sendRequest, movieId, movieType)
            .then((response) => {

                setImages(response)
            });
    }, [movieId, movieType, id, sendRequest])


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
            backgroundImage: `url(${IMAGES_URL}${movieType.includes('tv')
                ? tvDetails.backdrop_path
                : movieDetails.backdrop_path})`,
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
            height: 200,
            // paddingLeft:15,
            // paddingRight:15,
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
    const renderComponent = movieType.includes('tv') ?
        <TVComponent classes={classes} keywords={keywords} images={images} credits={credits} data={tvDetails}
                     tabValue={value} onTabChange={handleChange} onChipClick={handleClick}/> :
        <MovieComponent classes={classes} keywords={keywords} images={images} credits={credits} data={movieDetails}
                        tabValue={value} onTabChange={handleChange} onChipClick={handleClick}/>
    return (
        <Container maxWidth="xl">
            {renderComponent}
        </Container>);
}

export default MovieContainer;