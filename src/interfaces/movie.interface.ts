interface IGenres {
  id: number;
  name: string;
}

export interface IMovie {
  original_title: string;
  release_date: string;
  poster_path: string;
  genres: IGenres[];
  runtime: number;
  overview: string;
  vote_average: number;
  imdb_id: string;
}
