import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from '../characters/characters.component';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: '/movies',
        pathMatch: 'full',
      },
      {
        path: 'movies',
        component: HomeComponent,
        pathMatch: 'full',
      },
      {
        path: 'characters',
        component: CharactersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
