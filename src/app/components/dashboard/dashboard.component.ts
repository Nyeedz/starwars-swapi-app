import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Logout } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  navbarOpen: boolean = true;
  routeSubscription: Subscription;
  currentRoute = '/movies';
  routes = [
    { title: 'Filmes', url: '/movies' },
    { title: 'Personagens', url: '/characters' },
  ];

  constructor(private store: Store, private router: Router) {
    this.setCurrentRouteSubscription();
  }

  setCurrentRouteSubscription() {
    this.routeSubscription = this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(({ url }: NavigationEnd) => {
        this.currentRoute = url;
      });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.store.dispatch(new Logout());
    this.router.navigate(['/login']);
  }
}
