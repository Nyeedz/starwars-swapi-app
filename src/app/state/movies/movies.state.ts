import { Injectable } from '@angular/core';
import { Movie, MoviesResponse } from '@models';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import { SwapiService } from '@services';
import {
  CreateMovie,
  DeleteMovie,
  EditMovie,
  GetMovies,
  ToggleWatched,
} from './movies.actions';

@State<MoviesStateModel>({
  name: 'movies',
  defaults: { watched: [], all: [], added: [] },
})
@Injectable()
export default class MoviesState {
  constructor(private swapiService: SwapiService, private store: Store) {}
  @Action(GetMovies)
  async loadMovies(ctx: StateContext<MoviesStateModel>) {
    const moviesResponse: MoviesResponse = await this.swapiService
      .getMovies()
      .toPromise();

    const fixedCovers: Movie[] = moviesResponse.results.map((movie: Movie) => {
      movie.cover = movie.episode_id
        ? 'assets/images/episodes/episode_id' + movie.episode_id + '.jpg'
        : 'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=9416292&qld=90&l=430&a=-1=1006378633';

      return movie;
    });

    return ctx.patchState({ all: fixedCovers });
  }

  @Action(ToggleWatched)
  toggleWatched(
    ctx: StateContext<MoviesStateModel>,
    { episode_id }: ToggleWatched
  ) {
    const state = ctx.getState();

    let watched: number[] = [...state.watched];

    if (watched.includes(episode_id)) {
      watched = watched.filter((ep) => ep !== episode_id);
    } else {
      watched.push(episode_id);
    }

    ctx.patchState({ watched });
  }

  @Action(CreateMovie)
  addMovie(ctx: StateContext<any>, { movie }: CreateMovie) {
    const state = ctx.getState();
    const user = this.store.selectSnapshot((state) => state.auth.username);

    // let userMovies = state.added.find(
    //   (addedMovies) => addedMovies.username === user
    // );

    let addedMovies: Partial<Movie>[] = [...state.added];

    added.push({
      ...movie,
      cover:
        movie?.cover ||
        'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=9416292&qld=90&l=430&a=-1=1006378633',
    });

    ctx.patchState({ added });
  }

  @Action(EditMovie)
  editMovie(ctx: StateContext<MoviesStateModel>, { movie, index }: EditMovie) {
    const state = ctx.getState();

    // let added: Partial<Movie>[] = [...state.added];

    // added[index] = { ...added[index], ...movie };

    // ctx.patchState({ added });
  }

  @Action(DeleteMovie)
  deleteMovie(ctx: StateContext<MoviesStateModel>, { index }: EditMovie) {
    const state = ctx.getState();

    // const added: Partial<Movie>[] = state.added.filter(
    //   (movie: Movie, i) => i !== index
    // );

    // ctx.patchState({ added });
  }

  @Selector()
  static getMovies(state: MoviesStateModel): Movie[] {
    return state.all;
  }

  @Selector()
  static getAddedMovies(state: MoviesStateModel): Partial<Movie>[] {
    // return state.added.movies;
  }

  static IsMovieWatched(
    episode_id: number
  ): (state: MoviesStateModel) => boolean {
    return createSelector([MoviesState], (state: MoviesStateModel) => {
      return !!state.watched.find((ep: number) => ep === episode_id);
    });
  }
}

export interface MoviesStateModel {
  watched: number[];
  all: Movie[];
  added: AddedMovies[];
}

interface AddedMovies {
  username: string
  movies: Partial<Movie>[];
}