import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Character, CharactersResponse, Movie, MoviesResponse } from '@models';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { GetCharacters } from 'src/app/state/characters/characters.actions';
import CharactersState from 'src/app/state/characters/characters.state';
import { environment } from 'src/environments/environment';
import {
  CreateMovie,
  DeleteMovie,
  GetMovies,
  ToggleWatched,
} from '../../state/movies/movies.actions';
import MoviesState from '../../state/movies/movies.state';
import { CHARACTER_MOCK, MOVIES_MOCK } from './swapi.moc';
import { SwapiService } from './swapi.service';

describe('SwapiService', () => {
  let store: Store,
    swapiService: SwapiService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwapiService],
      imports: [
        NgxsModule.forRoot([MoviesState, CharactersState]),
        HttpClientTestingModule,
      ],
    });

    store = TestBed.inject(Store);
    swapiService = TestBed.inject(SwapiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all movies state', async () => {
    spyOn(swapiService, 'getMovies').and.returnValue(of(MOVIES_MOCK));

    await store.dispatch(new GetMovies()).toPromise();

    expect(swapiService.getMovies).toHaveBeenCalled();

    const movies: Movie[] = store.selectSnapshot(MoviesState.getMovies);

    expect(movies.length).toBeGreaterThan(0, 'filmes não encontrados');

    expect(movies).toBeTruthy('erro ao consultar os dados do filme');
  });

  it('should retrieve all movies response', () => {
    swapiService.getMovies().subscribe((movies: MoviesResponse) => {
      expect(movies.results.length).toBeGreaterThan(
        0,
        'filmes não encontrados'
      );

      expect(movies).toBeTruthy('erro ao consultara api');
    });
    const req = httpTestingController.expectOne(
      `${environment.swapiUrl}/films`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(MOVIES_MOCK);
  });

  it('should add and remove as watched', async () => {
    spyOn(swapiService, 'getMovies').and.returnValue(of(MOVIES_MOCK));

    await store.dispatch(new GetMovies()).toPromise();

    expect(swapiService.getMovies).toHaveBeenCalled();

    const movies: Movie[] = store.selectSnapshot(MoviesState.getMovies);

    expect(movies.length).toBeGreaterThan(0, 'filmes não encontrados');

    store.dispatch(new ToggleWatched(movies[0].episode_id));
    const added = store.selectSnapshot(
      MoviesState.IsMovieWatched(movies[0].episode_id)
    );
    expect(added).toEqual(
      true,
      'não foi possível adicionar o filme como assistido'
    );

    store.dispatch(new ToggleWatched(movies[0].episode_id));
    const removed = store.selectSnapshot(
      MoviesState.IsMovieWatched(movies[0].episode_id)
    );

    expect(removed).toEqual(
      false,
      'não foi possivel remover o filme como assistido'
    );
  });

  it('should create and delete movie', () => {
    store.dispatch(
      new CreateMovie({
        characters: [],
        title: 'Test Movie',
        director: 'Test director',
        producer: 'Test producer',
        cover: null,
        opening_crawl: null,
      })
    );

    const added = store.selectSnapshot(MoviesState.getAddedMovies);

    expect(added.length).toBeGreaterThan(
      0,
      'não foi possível adicionar o filme'
    );

    store.dispatch(new DeleteMovie(0));

    const removed = store.selectSnapshot(MoviesState.getAddedMovies);

    expect(removed.length).toEqual(0, 'não foi possível deletar o filme');
  });

  it('should retrieve all characters state', async () => {
    spyOn(swapiService, 'getCharacters').and.returnValue(of(CHARACTER_MOCK));

    await store.dispatch(new GetCharacters(1)).toPromise();

    expect(swapiService.getCharacters).toHaveBeenCalled();

    const characters: Character[] = store.selectSnapshot(
      CharactersState.getCharacters
    );

    expect(characters).toBeTruthy('erro ao consultar a api');
    expect(characters.length).toBeGreaterThan(0, 'personagens não encontrados');
  });

  it('should retrieve all characters response', async () => {
    swapiService.getCharacters(1).subscribe((character: CharactersResponse) => {
      expect(character.results.length).toBeGreaterThan(
        0,
        'personagens não encontrados'
      );
      expect(character).toBeTruthy('erro ao consultar a api');
    });

    const req = httpTestingController.expectOne(
      `${environment.swapiUrl}/people?page=1`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(CHARACTER_MOCK);
  });
});
