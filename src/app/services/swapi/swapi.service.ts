import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CharactersResponse, MoviesResponse } from '@models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(private http: HttpClient) {}

  public getMovies(): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(`${environment.swapiUrl}/films`);
  }

  public getCharacters(page: number): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(
      `${environment.swapiUrl}/people?page=${page}`
    );
  }
}
