import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from 'src/app/state/auth/auth.state';
import CharactersState from 'src/app/state/characters/characters.state';
import MoviesState from 'src/app/state/movies/movies.state';
import { CharactersComponent } from '../characters/characters.component';
import CreateMovieComponent from '../create-movie/create-movie.component';
import { HomeComponent } from '../home/home.component';
import { LoadingComponent } from '../loading/loading.component';
import { MovieComponent } from '../movie/movie.component';
import { SwordBurgerComponent } from '../sword-burger/sword-burger.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LoadingComponent,
    HomeComponent,
    MovieComponent,
    SwordBurgerComponent,
    CreateMovieComponent,
    CharactersComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    NgxsModule.forFeature([AuthState, MoviesState, CharactersState]),
  ],
})
export class DashboardModule {}
