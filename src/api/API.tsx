// 401 || 404
type BadResult = {
  status_message: string,
  status_code: number,
}

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

interface VideoInfo {
  poster_path: string | null,
  id: number,
  overview: string,
  vote_average: number,
  genre_ids: number[],
  vote_count: number,
  original_language: string,
  backdrop_path: string | null,
  popularity: number,
}

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
    queryString = Object.entries(query).reduce((acc, el) => `${acc}&${el.join('=')}`,'');
  }
  try {
    const {results, total_pages} = await fetchFn(`https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}&page=${page}${queryString}`);
    return {
      results,
      total_pages,
    }
  } catch (e) {
    throw new Error('Something went wrong');
  }
}
