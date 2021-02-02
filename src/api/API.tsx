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

export interface MovieDetailsType {
    id: number,
    adult: boolean,
    backdrop_path: string | null,
    belongs_to_collection?: string | null,
    budget: number,
    genres: GenreType[],
    homepage: string | null,
    imdb_id: string | null,
    original_language: string | null,
    original_title: string | null,
    overview: string | null,
    popularity: number,
    poster_path: string | null,
    production_companies: ProductionCompanyType[],
    production_countries: ProductionCountryType[],
    release_date: string,
    revenue: string | null,
    runtime: string | null,
    spoken_languages: SpokenLanguageType[],
    status: string | null,
    tagline: string | null,
    title: string | null,
    video: boolean,
    vote_average: number,
    vote_count: number,
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
export async function getMovies(fetchFn: (url: string, method?: string, body?: any, headers?: any) => Promise<any>, type: 'movie' | 'tv', query?: QueryParametersMovies | QueryParametersTVShows, page = 1) {
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

export async function getMovie(fetchFn: (url: string, method?: string, body?: any, headers?: any) => Promise<any>, movieId: number) {
    try {
        return await fetchFn(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}`)
    } catch (e) {
        throw new Error('Something went wrong');
    }
}

export async function getKeyWords(fetchFn: (url: string, method?: string, body?: any, headers?: any) => Promise<any>, movieId: number) {
    try {
        return await fetchFn(`https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}`)
    } catch (e) {
        throw new Error('Something went wrong');
    }
}

export async function getCredits(fetchFn: (url: string, method?: string, body?: any, headers?: any) => Promise<any>, movieId: number) {
    try {
        return await fetchFn(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}`)
    } catch (e) {
        throw new Error('Something went wrong');
    }
}


export async function getImages(fetchFn: (url: string, method?: string, body?: any, headers?: any) => Promise<any>, movieId: number) {
    try {
        return await fetchFn(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}`)
    } catch (e) {
        throw new Error('Something went wrong');
    }
}


