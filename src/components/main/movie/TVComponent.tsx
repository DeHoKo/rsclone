import React from "react";
import {MovieCreditsType, MovieImagesType, MovieKeywordsType, TVDetailsType} from "../../../api/API";
import {
    AppBar,
    Avatar,
    Box,
    CardMedia,
    Chip,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tab,
    Tabs,
    Typography
} from "@material-ui/core";
import {IMAGES_URL} from "./MovieContainer";
import Divider from "@material-ui/core/Divider";
import ContentItem from "./ContentItem";
import ImageIcon from "@material-ui/icons/Image";
import {a11yProps, TabPanel} from "../main";
import ImageCard from "./ImageCard";

interface TVPropsType {
    classes: {
        [style: string]: string
    },
    credits: MovieCreditsType,
    data: TVDetailsType,
    keywords: MovieKeywordsType,
    images: MovieImagesType,
    tabValue: number,
    onTabChange: (e: React.ChangeEvent<{}>, value: number) => void,
    onChipClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, text: string,) => void
}

export default function TVComponent({
                                        classes,
                                        data,
                                        credits,
                                        tabValue,
                                        keywords,
                                        onTabChange,
                                        images, onChipClick
                                    }: TVPropsType) {
    return (
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
                                    gutterBottom>{data.name
                            ? data.name
                            : '-'} ({data.original_name ? data.original_name : '-'})
                            ({data.first_air_date
                                ? new Date(data.first_air_date).getFullYear()
                                : data.in_production ? 'present' : data.last_episode_to_air})</Typography>
                        <Typography component='h3'
                                    gutterBottom>{data.first_air_date
                            ? data.first_air_date : '-'} ({
                            data.production_countries
                                ? data.production_countries.map((pc) => pc.iso_3166_1).join()
                                : '-'})
                        </Typography>
                        <Typography component='div'
                                    gutterBottom>{data.genres ? data.genres.map(g => g.name).join() : '-'}</Typography>
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
                <Typography component={'p'}>
                    Seasons:
                </Typography>
                <List className={classes.customList}>
                    {/*{seasons.map((s, i) =>*/}
                    {/*    <ListItem key={i} className={classes.listItem}>*/}
                    {/*        <ContentItem classes={classes}*/}
                    {/*                     image={s.poster_path ? `${IMAGES_URL}${s.poster_path}` : ''}*/}
                    {/*                     title={s.name}*/}
                    {/*                     subtitle={`Season ${s.season_number}, episode ${s.episode_count}`}/>*/}
                    {/*    </ListItem>)}*/}
                </List>
            </Box>
            <Box component={'div'}>
                <Typography component={'p'}>Cast:</Typography>
                <List className={classes.customList}>
                    {credits.cast ? credits.cast.map((c, i) =>
                        <ListItem key={i} className={classes.listItem}>
                            <ContentItem classes={classes}
                                         image={c.profile_path ? `${IMAGES_URL}${c.profile_path}` : ''}
                                         title={c.name}
                                         subtitle={c.character}/>
                        </ListItem>
                    ) : '-'}
                </List>
            </Box>
            <Box component={'div'}>
                <Typography component={'p'}>Crew:</Typography>
                <List className={classes.customList}>
                    {credits.crew ? credits.crew.map((c, i) =>
                        <ListItem key={i} className={classes.listItem}>
                            <ContentItem classes={classes}
                                         image={c.profile_path ? `${IMAGES_URL}${c.profile_path}` : ''}
                                         title={c.name}
                                         subtitle={c.character}/>
                        </ListItem>
                    ) : '-'}
                </List>
            </Box>
            <Box component={'div'}>
                <Typography component={'p'}>Production companies:</Typography>
                <List className={classes.customList}>
                    {data.production_companies ? data.production_companies.map((pc, i) =>
                        <ListItem key={i} className={classes.listItem}>
                            <ListItemAvatar>
                                {pc.logo_path ? <Avatar src={`${IMAGES_URL}${pc.logo_path}`}/> : <ImageIcon/>}
                            </ListItemAvatar>
                            <ListItemText color={'primary'} primary={`${pc.name}`}
                                          secondary={`${pc.origin_country}`}/>
                        </ListItem>
                    ) : '-'}
                </List>
            </Box>
            <Box component={'div'}>
                <Typography component={'p'}>Media:</Typography>
                <AppBar position="static" color="default">
                    <Tabs
                        value={tabValue}
                        onChange={onTabChange}
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
                <TabPanel value={tabValue} index={0}>
                    <Typography component={'p'}>Backdrops:</Typography>
                    <List component={'ul'} className={classes.customList}>
                        {images.backdrops ? images.backdrops.map((b, i) =>
                            <ListItem key={i} className={classes.listItem}>
                                <ImageCard
                                    classes={classes}
                                    aspect_ratio={b.aspect_ratio}
                                    file_path={b.file_path ? `${IMAGES_URL}${b.file_path}` : ''}
                                    height={b.height}
                                    vote_average={b.vote_average}
                                    vote_count={b.vote_count}
                                    width={b.width}/>
                            </ListItem>) : '-'}
                    </List>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Typography component={'p'}>Posters:</Typography>
                    <List component={'ul'} className={classes.customList}>
                        {images.posters ? images.posters.map((p, i) =>
                            <ListItem key={i} className={classes.listItem}>
                                <ImageCard classes={classes}
                                           aspect_ratio={p.aspect_ratio}
                                           file_path={p.file_path ? `${IMAGES_URL}${p.file_path}` : ''}
                                           height={p.height}
                                           vote_average={p.vote_average}
                                           vote_count={p.vote_count}
                                           width={p.width}/>
                            </ListItem>) : '-'}
                    </List>
                </TabPanel>
            </Box>

            <Box component={'div'}>
                <Typography component={'p'}>Keywords:</Typography>
                {keywords.keywords
                    ? keywords.keywords.map(kw => kw.name)
                        .map((text, i) =>
                            <Chip size={'small'}
                                  color={'secondary'} key={i}
                                  label={text}
                                  onClick={(e) => onChipClick(e, text)}/>)
                    : '-'}
            </Box>
        </Box>)
}
