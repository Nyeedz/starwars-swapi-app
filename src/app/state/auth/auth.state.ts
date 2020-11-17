import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Login, Logout } from './auth.actions';

@State<AuthStateModel>({ name: 'auth', defaults: { username: null } })
@Injectable()
export class AuthState {
  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, { username }) {
    ctx.patchState({ username });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ username: null });
  }

  @Selector()
  static getUser(state: AuthStateModel): string {
    return state.username;
  }
}

export interface AuthStateModel {
  username: string;
}
