import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Movie } from '@models';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetMovies } from 'src/app/state/movies/movies.actions';
import MoviesState from 'src/app/state/movies/movies.state';
import CreateMovieComponent from '../create-movie/create-movie.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  activeTab = 1;
  @Select(MoviesState.getMovies) movies$: Observable<Movie>[];
  @Select(MoviesState.getAddedMovies) AddedMovies$: Observable<Movie>[];

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(new GetMovies());
  }

  openCreateMovieModal(): void {
    const dialogRef = this.dialog.open(CreateMovieComponent, {
      autoFocus: false,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`The dialog was closed, result: ${result}`);
    });
  }
}
