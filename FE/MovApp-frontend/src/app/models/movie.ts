export interface Movie {
    id: number;
    title: string;
    duration: number;
    release_date: Date;
    image_path: string;
    overview: string;
    imdb_rating: number;
    language: string;
    director_id: number;
    content: string;
    popularity: number;
}

// export interface Movies extends Array<Movie>{}

// export interface Movie {
//     results?: (ResultsEntity)[] | null;
//     page: number;
//     total_results: number;
//     dates: Dates;
//     total_pages: number;
//   }
//   export interface ResultsEntity {
//     popularity: number;
//     vote_count: number;
//     video: boolean;
//     poster_path: string;
//     content: string;
//     image_path: string;
//     id: number;
//     adult: boolean;
//     backdrop_path: string;
//     original_language: string;
//     original_title: string;
//     genre_ids?: (number)[] | null;
//     title: string;
//     vote_average: number;
//     overview: string;
//     release_date: string;
//   }
//   export interface Dates {
//     maximum: string;
//     minimum: string;
//   }
  