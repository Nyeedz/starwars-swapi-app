import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Character, Movie } from '@models';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetCharacters } from 'src/app/state/characters/characters.actions';
import CharactersState from 'src/app/state/characters/characters.state';
import { CreateMovie, EditMovie } from '../../state/movies/movies.actions';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
})
export default class CreateMovieComponent implements OnInit, AfterViewInit {
  @ViewChild('characterSelect') selectElem: MatSelect;
  @Select(CharactersState.getCharacters) characters$: Observable<Character[]>;
  charactersPage = 2;
  lastPage = null;
  loadingNewPage = false;
  movieForm: FormGroup;
  isInvalid: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      movie: Partial<Movie>;
      index: number;
    },
    public dialogRef: MatDialogRef<CreateMovieComponent>,
    private fb: FormBuilder,
    private store: Store,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      characters: [null, Validators.required],
      title: [null, Validators.required],
      director: [null, Validators.required],
      producer: [null, Validators.required],
      cover: [null],
      opening_crawl: [null],
    });

    this.loadCharacters(1);

    if (this.data) {
      this.movieForm.patchValue(this.data.movie);
    }
  }

  async loadCharacters(page: number) {
    await this.store.dispatch(new GetCharacters(page)).toPromise();
    this.lastPage = Math.floor(
      this.store.selectSnapshot(CharactersState.getCharactersCount) / 9
    );
  }

  ngAfterViewInit(): void {
    this.selectElem.openedChange.subscribe(() =>
      this.registerPanelScrollEvent()
    );
  }

  registerPanelScrollEvent(): void {
    if (!this.selectElem.panel) {
      return;
    }

    const panel = this.selectElem.panel.nativeElement;
    panel.addEventListener('scroll', (event) =>
      this.getCharactersNextPage(event)
    );
  }

  async getCharactersNextPage(event) {
    if (
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight
    ) {
      if (this.loadingNewPage == true || this.charactersPage > this.lastPage) {
        return;
      }

      this.loadingNewPage = true;
      await this.loadCharacters(this.charactersPage);
      this.charactersPage += 1;
      event.target.scrollTop = event.target.scrollTop + 20;
      this.loadingNewPage = false;
    }
  }

  createMovie(): void {
    if (this.movieForm.invalid) {
      this.isInvalid = true;
      return;
    }

    let movie: Partial<Movie> = this.movieForm.getRawValue();

    const time = new Date().getTime();

    const date = new Date(time);
    movie.release_date = date.toString();

    this.store
      .dispatch(
        this.data
          ? new EditMovie(movie, this.data.index)
          : new CreateMovie(movie)
      )
      .subscribe(() => this.dialogRef.close());

    this._snackBar.open(
      `Filme ${this.data ? 'editado' : 'cadastrado'} com sucesso!`,
      'Ok',
      {
        duration: 50000,
        panelClass: 'snackbar-background',
      }
    );
  }
}
