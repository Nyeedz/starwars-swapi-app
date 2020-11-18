import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Movie } from '@models';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteMovie,
  ToggleWatched,
} from 'src/app/state/movies/movies.actions';
import MoviesState from 'src/app/state/movies/movies.state';
import CreateMovieComponent from '../create-movie/create-movie.component';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'movie-card',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  @Input() index: number;
  watched$: Observable<boolean>;

  constructor(private store: Store, public dialog: MatDialog) {}

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

  editMovie(movie: Partial<Movie>, index: number) {
    this.dialog.open(CreateMovieComponent, {
      autoFocus: false,
      width: '400px',
      data: {
        movie,
        index,
      },
    });
  }

  movieDetails(movie: Movie | Partial<Movie>) {
    this.dialog.open(MovieDetailComponent, {
      autoFocus: false,
      data: movie,
      panelClass: 'full-modal',
    });
  }
}
