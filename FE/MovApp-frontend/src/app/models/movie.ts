export interface Movie {
    id: number;
    subtitle_id: number;
    title: string;
    year: number;
    duration: number;
    release_date: Date;
    image_path: string;
    overview: string;
    imdb_rating: number;
    language_id: number;
    director_id: number;
    content: string;
}