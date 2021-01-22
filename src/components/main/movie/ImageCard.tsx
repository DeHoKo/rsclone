import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";

type ImageCardType = {
    classes: {
        [style: string]: string
    },
    aspect_ratio: number,
    file_path: string,
    height: number,
    vote_average: number,
    vote_count: number,
    width: number
}

function ImageCard({
                       classes,
                       aspect_ratio,
                       file_path,
                       height,
                       vote_average,
                       vote_count,
                       width
                   }: ImageCardType) {
    return (
        <div><CardActionArea className={classes.actionArea}>
            <Card className={classes.card}>
                <CardMedia className={classes.cardImage} component={'img'} image={file_path}/>
                <CardContent className={classes.content}>
                    <Typography className={classes.title} variant={'h2'}>
                        Average: {vote_average}/10
                    </Typography>
                    <Typography className={classes.subtitle}>Voted: {vote_count}</Typography>
                </CardContent>
            </Card>
        </CardActionArea></div>
    );
}

export default ImageCard;