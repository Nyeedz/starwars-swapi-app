import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Character } from '@models';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetCharacters } from 'src/app/state/characters/characters.actions';
import CharactersState from 'src/app/state/characters/characters.state';
import { CreateMovie } from '../../state/movies/movies.actions';

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
    private fb: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<CreateMovieComponent>
  ) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      characters: [null, Validators.required],
      title: [null, Validators.required],
      director: [null, Validators.required],
      producer: [null, Validators.required],
      cover: [null, Validators.required],
      opening_crawl: [null],
    });

    this.loadCharacters(1);
  }

  async loadCharacters(page: number) {
    await this.store.dispatch(new GetCharacters(page)).toPromise();
    this.lastPage = Math.floor(
      this.store.selectSnapshot(CharactersState.getCharactersCount) / 9
    );
  }

  ngAfterViewInit() {
    this.selectElem.openedChange.subscribe(() =>
      this.registerPanelScrollEvent()
    );
  }

  registerPanelScrollEvent() {
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

  createMovie() {
    if (this.movieForm.invalid) {
      this.isInvalid = true;
      return;
    }

    this.store
      .dispatch(new CreateMovie(this.movieForm.getRawValue()))
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
