import { Injectable } from '@angular/core';
import { Planet } from '@models';
import { Action, createSelector, State, StateContext } from '@ngxs/store';
import { SwapiService } from '@services';
import { GetPlanet } from './planets.actions';

@State<PlanetsStateModel>({
  name: 'planets',
  defaults: { all: [] },
})
@Injectable()
export default class PlanetsState {
  constructor(private swapiService: SwapiService) {}
  @Action(GetPlanet)
  async loadPlanet(ctx: StateContext<PlanetsStateModel>, { url }: GetPlanet) {
    const state = ctx.getState();
    const id = parseInt(url.match(/(\d+)/)[0]);
    const newPlanet: Planet = await this.swapiService.getPlanet(id).toPromise();

    let planets: Planet[] = [...state.all];
    const planetIndex = planets.findIndex((planet) => planet.url === url);

    if (planetIndex >= 0) {
      planets[planetIndex] = newPlanet;
    } else {
      planets.push(newPlanet);
    }

    return ctx.patchState({ all: planets });
  }

  static getPlanet(url: string): (state: PlanetsStateModel) => Planet {
    return createSelector([PlanetsState], (state: PlanetsStateModel) => {
      return state.all.find((planet) => planet.url === url);
    });
  }
}

export interface PlanetsStateModel {
  all: Planet[];
}
