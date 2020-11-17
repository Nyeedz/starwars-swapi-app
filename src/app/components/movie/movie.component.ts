import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '@models';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteMovie,
  ToggleWatched,
} from 'src/app/state/movies/movies.actions';
import MoviesState from 'src/app/state/movies/movies.state';

@Component({
  selector: 'movie-card',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  @Input() index: number;
  watched$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.watched$ = this.store.select(
      MoviesState.IsMovieWatched(this.movie.episode_id)
    );
  }

  toggleWatched(episode_id: number) {
    this.store.dispatch(new ToggleWatched(episode_id));
  }

  deleteMovie(index: number) {
    this.store.dispatch(new DeleteMovie(index));
  }
}
