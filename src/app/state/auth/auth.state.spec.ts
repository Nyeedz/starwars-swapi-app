import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Login, Logout } from './auth.actions';
import { AuthState } from './auth.state';

describe('AuthState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AuthState])],
    });

    store = TestBed.inject(Store);
  });

  it('should retrieve user', () => {
    store.dispatch(new Login('Luke Skywalker'));

    const user: string = store.selectSnapshot(AuthState.getUser);

    expect(user).toBeTruthy('user not found');
  });

  it('it should logout user', () => {
    store.dispatch(new Login('Luke Skywalker'));

    const user: string = store.selectSnapshot(AuthState.getUser);

    expect(user).toBeTruthy('user not found');

    store.dispatch(new Logout());

    const userLogged = store.selectSnapshot(AuthState.getUser);

    expect(userLogged).toBeNull('erro ao deslogar o usuário');
  });
});
