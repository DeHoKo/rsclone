// 401 || 404
// type BadResult = {
//   status_message: string,
//   status_code: number,
// }


type Configuration = {
    images: {
        base_url: string,
        secure_base_url: string,
        backdrop_sizes: string[],
        logo_sizes: string[],
        poster_sizes: string[],
        profile_sizes: string[],
        still_sizes: string[],
    }
    change_keys: string[],
}

type GenreType = {
    id: number, name: string
}

type ProductionCompanyType = {
    id: number,
    logo_path: string | null,
    name: string | null,
    origin_country: string | null,
}

type ProductionCountryType = {
    iso_3166_1: string | null,
    name: string | null
}

type SpokenLanguageType = {
    english_name: string | null,
    iso_639_1: string | null,
    name: string | null
}
type CreatedByType = {
    id: number, name: string
}

type NetworkType = {
    name: string,
    id: number,
    logo_path: string | null,
    origin_country: string
}

type SeasonType = {
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    poster_path: string | null,
    season_number: number
}

interface CommonType {
    id: number,
    backdrop_path: string | null,
    genres: GenreType[],
    homepage: string | null,
    original_language: string | null,
    overview: string | null,
    production_companies: ProductionCompanyType[],
    production_countries: ProductionCountryType[],
    spoken_languages: SpokenLanguageType[],
    status: string | null,
    tagline: string | null,
    vote_average: number,
    vote_count: number,
    popularity: number,
    poster_path: string | null,
}

type EpisodeType = {
    air_date: string | null,
    episode_number: number,
    id: number,
    name: string,
    season_number: number,
    still_path: string | null,
    vote_average: number,
    vote_count: number,
    overview: string | null
}

export interface TVDetailsType extends CommonType {
    created_by: CreatedByType[],
    in_production: boolean,
    name: string,
    networks: NetworkType[],
    number_of_episodes: number,
    number_of_seasons: number,
    seasons: SeasonType[],
    type: string,
    original_name: string,
    first_air_date: string | null,
    next_episode_to_air: EpisodeType,
    last_episode_to_air: EpisodeType,
}

export interface MovieDetailsType extends CommonType {
    adult: boolean,
    belongs_to_collection?: string | null,
    budget: number,
    imdb_id: string | null,
    original_title: string | null,
    release_date: string,
    revenue: string | null,
    runtime: string | null,
    title: string | null,
    video: boolean,
}

type KeywordType = {
    id: number,
    name: string
}

export interface MovieKeywordsType {
    id: number,
    keywords: KeywordType[]
}

type CastItemType = {
    id: number,
    gender: number,
    adult: boolean,
    known_for_department: string | null,
    name: string | null,
    original_name: string | null,
    popularity: number,
    profile_path: string | null,
    cast_id: number,
    character: string | null,
    credit_id: number,
    order: number
}

export interface MovieCreditsType {
    id: number,
    cast: CastItemType[],
    crew: CastItemType[]
}

type BackdropItemType = {
    "aspect_ratio": number,
    "file_path": string | null,
    "height": number,
    "iso_639_1": string | null,
    "vote_average": number,
    "vote_count": number,
    "width": number
}

export interface MovieImagesType {
    id: number,
    backdrops: BackdropItemType[],
    posters: BackdropItemType[]
}

// interface VideoInfo {
//   poster_path: string | null,
//   id: number,
//   overview: string,
//   vote_average: number,
//   genre_ids: number[],
//   vote_count: number,
//   original_language: string,
//   backdrop_path: string | null,
//   popularity: number,
// }

// // https://developers.themoviedb.org/3/discover/movie-discover
// export interface MovieInfo extends VideoInfo {
//   adult: boolean,
//   release_date: string,
//   original_title: string,
//   title: string,
//   video: boolean,
// }
//
// // https://developers.themoviedb.org/3/discover/tv-discover
// export interface TVShowInfo extends VideoInfo {
//   first_air_date: string,
//   origin_country: string[],
//   name: string,
//   original_name: string,
// }
//
// export interface Discover<T> {
//   page: number,
//   results: T[],
//   total_results: number,
//   total_pages: number,
// }

interface QueryParameters {
    sort_by?: string,
    page?: number,
    vote_average_gte?: number,
    with_companies?: string,
    with_genres?: string,
    with_runtime_gte?: number,
    with_runtime_lte?: number,
}

interface QueryParametersMovies extends QueryParameters {
    release_date_gte?: string,
}

interface QueryParametersTVShows extends QueryParameters {
    air_date_gte?: string,
}

// It is recommended you cache this data within your application and check for updates every few days
export async function getConfiguration(fetchFn: (url: string, method?: string, body?: any, headers?: any) => Promise<any>) {
    try {
        return await fetchFn(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}`) as Configuration;
    } catch (e) {
        throw new Error('Something went wrong');
    }
}

// FIXME: fix any
export async function getMovies(fetchFn: (url: string, method?: string, body?: any, headers?: any) => Promise<any>, type: string, query?: QueryParametersMovies | QueryParametersTVShows, page = 1) {
    let queryString = '';
    if (query) {
        queryString = Object.entries(query).reduce((acc, el) => `${acc}&${el.join('=')}`, '');
    }
    try {
        const {
            results,
            total_pages
        } = await fetchFn(`https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}&page=${page}${queryString}`);
        return {
            results,
            total_pages,
        }
    } catch (e) {
        throw new Error('Something went wrong');
    }
}

export async function getMovie(fetchFn: (url: string, method?: string, body?: any, headers?: any) => Promise<any>, movieId: number, movieType: string) {
    try {
        return await fetchFn(`https://api.themoviedb.org/3/${movieType}/${movieId}?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}`)
    } catch (e) {
        throw new Error('Something went wrong');
    }
}

export async function getKeyWords(fetchFn: (url: string, method?: string, body?: any, headers?: any) => Promise<any>, movieId: number, movieType: string) {
    try {
        return await fetchFn(`https://api.themoviedb.org/3/${movieType}/${movieId}/keywords?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}`)
    } catch (e) {
        throw new Error('Something went wrong');
    }
}

export async function getCredits(fetchFn: (url: string, method?: string, body?: any, headers?: any) => Promise<any>, movieId: number, movieType: string) {
    try {
        return await fetchFn(`https://api.themoviedb.org/3/${movieType}/${movieId}/credits?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}`)
    } catch (e) {
        throw new Error('Something went wrong');
    }
}


export async function getImages(fetchFn: (url: string, method?: string, body?: any, headers?: any) => Promise<any>, movieId: number, movieType: string) {
    try {
        return await fetchFn(`https://api.themoviedb.org/3/${movieType}/${movieId}/images?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}`)
    } catch (e) {
        throw new Error('Something went wrong');
    }
}


