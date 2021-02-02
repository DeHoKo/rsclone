import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";

type CastItemType = {
    classes: {
        [style: string]: string
    },
    image: string,
    title: string | null,
    subtitle: string | null
}

export default function CastItem({classes, image, title, subtitle}: CastItemType) {
    return (
        <div>
            <CardActionArea className={classes.actionArea}>
                <Card className={classes.card}>
                    <CardMedia className={classes.cardImage} component={'img'} image={image}/>
                    <CardContent className={classes.content}>
                        <Typography className={classes.title} variant={'h2'}>
                            {title}
                        </Typography>
                        <Typography className={classes.subtitle}>{subtitle}</Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
        </div>
    );
};