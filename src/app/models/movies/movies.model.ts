export interface MoviesResponse {
  count: number;
  next: any;
  previous: any;
  results: Movie[];
}

export interface Movie {
  characters: string[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
  cover?: string;
}
