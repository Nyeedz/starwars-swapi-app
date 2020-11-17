import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/auth/auth.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.store.selectSnapshot(AuthState.getUser)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
