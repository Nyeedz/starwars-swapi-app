import { Movie } from '@models';

export class GetMovies {
  static readonly type = 'getMovies';
}

export class ToggleWatched {
  static readonly type = 'watchedMovies';

  constructor(public episode_id: number) {}
}

export class CreateMovie {
  static readonly type = 'createMovie';

  constructor(public movie: Partial<Movie>) {}
}

export class EditMovie {
  static readonly type = 'editMovie';

  constructor(public movie: Partial<Movie>, public index: number) {}
}
export class DeleteMovie {
  static readonly type = 'deleteMovie';

  constructor(public index: number) {}
}
