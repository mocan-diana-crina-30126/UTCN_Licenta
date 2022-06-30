import {Genre} from "./genre";

export interface Movie {
  id: number;
  title: string;
  duration: number;
  release_date: Date;
  movie: any;
  image: any;
  image_path: string;
  overview: string;
  imdb_rating: number;
  language: string;
  director_id: number;
  content: string;
  popularity: number;
  genres: Genre[];
  isSelected: boolean;
  isEdit: boolean;
}

export const MovieColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'title',
    type: 'text',
    label: 'Title',
  },
  {
    key: 'duration',
    type: 'number',
    label: 'Duration',
  },
  {
    key: 'release_date',
    type: 'date',
    label: 'Release date',
  },
  {
    key: 'imdb_rating',
    type: 'number',
    label: 'Rating',
  },
  {
    key: 'popularity',
    type: 'number',
    label: 'Popularity',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  }
]

