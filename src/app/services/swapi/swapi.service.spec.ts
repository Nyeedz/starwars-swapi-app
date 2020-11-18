import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';
import { TestBed } from '@angular/core/testing';
import {
  Character,
  CharactersResponse,
  Movie,
  MoviesResponse,
  Planet,
} from '@models';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { Login } from 'src/app/state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';
import { GetCharacters } from 'src/app/state/characters/characters.actions';
import CharactersState from 'src/app/state/characters/characters.state';
import { GetPlanet } from 'src/app/state/planets/planets.actions';
import PlanetsState from 'src/app/state/planets/planets.state';
import { environment } from 'src/environments/environment';
import {
  CreateMovie,
  DeleteMovie,
  EditMovie,
  GetMovies,
  ToggleWatched,
} from '../../state/movies/movies.actions';
import MoviesState from '../../state/movies/movies.state';
import { CHARACTER_MOCK, MOVIES_MOCK, PLANETS_MOCK } from './swapi.moc';
import { SwapiService } from './swapi.service';

describe('SwapiService', () => {
  let store: Store,
    swapiService: SwapiService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwapiService],
      imports: [
        NgxsModule.forRoot([
          MoviesState,
          CharactersState,
          AuthState,
          PlanetsState,
        ]),
        HttpClientTestingModule,
      ],
    });

    store = TestBed.inject(Store);
    swapiService = TestBed.inject(SwapiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // Movies Test
  it('should retrieve all movies state', async () => {
    spyOn(swapiService, 'getMovies').and.returnValue(of(MOVIES_MOCK));

    await store.dispatch(new GetMovies()).toPromise();

    expect(swapiService.getMovies).toHaveBeenCalled();
    expect(swapiService.getMovies).toHaveBeenCalledTimes(1);

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

      expect(movies).toBeTruthy('erro ao consultara api /films');
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
    expect(swapiService.getMovies).toHaveBeenCalledTimes(1);

    const movies: Movie[] = store.selectSnapshot(MoviesState.getMovies);

    expect(movies.length).toBeGreaterThan(0, 'filmes não encontrados');

    store.dispatch(new ToggleWatched(movies[0].episode_id));
    const added: boolean = store.selectSnapshot(
      MoviesState.IsMovieWatched(movies[0].episode_id)
    );
    expect(added).toEqual(
      true,
      'não foi possível adicionar o filme como assistido'
    );

    store.dispatch(new ToggleWatched(movies[0].episode_id));
    const removed: boolean = store.selectSnapshot(
      MoviesState.IsMovieWatched(movies[0].episode_id)
    );

    expect(removed).toEqual(
      false,
      'não foi possivel remover o filme como assistido'
    );
  });

  it('should create and delete movie', () => {
    store.dispatch(new Login('Luke Skywalker'));

    const user: string = store.selectSnapshot(AuthState.getUser);

    expect(user).toBeTruthy('user not found');

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

  it('should edit movie', () => {
    store.dispatch(new Login('Luke Skywalker'));

    const user: string = store.selectSnapshot(AuthState.getUser);

    expect(user).toBeTruthy('user not found');

    store.dispatch(
      new CreateMovie({
        characters: [],
        title: 'Test movie',
        director: 'Test director',
        producer: 'Test producer',
        cover: null,
        opening_crawl: null,
      })
    );

    const added: Partial<Movie>[] = store.selectSnapshot(
      MoviesState.getAddedMovies
    );

    expect(added.length).toBeGreaterThan(
      0,
      'não foi possível adicionar o filme'
    );

    store.dispatch(
      new EditMovie(
        {
          characters: [
            'http://swapi.dev/api/people/1/',
            'http://swapi.dev/api/people/2/',
            'http://swapi.dev/api/people/3/',
          ],
          title: 'Test movie edited',
          director: 'Test director edited',
          producer: 'Test producer edited',
          cover:
            'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=9416292&qld=90&l=430&a=-1=1006378633',
          opening_crawl: 'File editado',
        },
        0
      )
    );

    const edited: Partial<Movie>[] = store.selectSnapshot(
      MoviesState.getAddedMovies
    );

    const compareMovies = Object.keys(added).every(
      (key) => added[key] === edited[key]
    );

    expect(compareMovies).toBeFalse();
  });

  //Characters test
  it('should retrieve all characters state', async () => {
    spyOn(swapiService, 'getCharacters').and.returnValue(of(CHARACTER_MOCK));

    await store.dispatch(new GetCharacters(1)).toPromise();

    expect(swapiService.getCharacters).toHaveBeenCalled();
    expect(swapiService.getCharacters).toHaveBeenCalledTimes(1);

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
      expect(character).toBeTruthy('erro ao consultar a api /people');
    });

    const req = httpTestingController.expectOne(
      `${environment.swapiUrl}/people?page=1`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(CHARACTER_MOCK);
  });

  //Planets test
  it('should retrive a planet state', async () => {
    spyOn(swapiService, 'getPlanet').and.returnValue(of(PLANETS_MOCK));

    await store.dispatch(new GetPlanet(PLANETS_MOCK.url)).toPromise();

    expect(swapiService.getPlanet).toHaveBeenCalled();
    expect(swapiService.getPlanet).toHaveBeenCalledTimes(1);

    const planet: Planet = store.selectSnapshot(
      PlanetsState.getPlanet(PLANETS_MOCK.url)
    );

    expect(planet).toBeTruthy('planea não encontrado');
  });

  it('should retrieve a planet response', () => {
    swapiService
      .getPlanet(1)
      .subscribe((planet: Planet) =>
        expect(planet).toBeTruthy('erro ao consultar a api /planets')
      );

    const req = httpTestingController.expectOne(
      `${environment.swapiUrl}/planets/1`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(PLANETS_MOCK);
  });
});
