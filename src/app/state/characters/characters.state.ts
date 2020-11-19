import { Injectable } from '@angular/core';
import { Character, CharactersResponse } from '@models';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SwapiService } from '@services';
import { GetCharacters } from './characters.actions';

@State<CharactersStateModel>({
  name: 'characters',
  defaults: { all: [], count: 0 },
})
@Injectable()
export default class CharactersState {
  constructor(private swapiService: SwapiService) {}
  @Action(GetCharacters)
  async loadPeople(
    ctx: StateContext<CharactersStateModel>,
    { page, table }: GetCharacters
  ) {
    const charactersResponse: CharactersResponse = await this.swapiService
      .getCharacters(page)
      .toPromise();

    let characters = [
      ...(page === 1 || table ? [] : ctx.getState().all),
      ...charactersResponse.results,
    ];

    return ctx.patchState({ all: characters, count: charactersResponse.count });
  }

  @Selector()
  static getCharacters(state: CharactersStateModel): Character[] {
    return state.all;
  }

  @Selector()
  static getCharactersCount(state: CharactersStateModel): number {
    return state.count;
  }
}

export interface CharactersStateModel {
  all: Character[];
  count: number;
}
