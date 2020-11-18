import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NgxsModule } from '@ngxs/store';
import { NumberToRomanPipe } from 'src/app/pipes/number-to-roman.pipe';
import { UnknownToQuestionMarkPipe } from 'src/app/pipes/unknow-to-question-mark.pipe';
import { AbbreviateNumberPipe } from 'src/app/pipes/abbreviate-number.pipe';
import { AuthState } from 'src/app/state/auth/auth.state';
import CharactersState from 'src/app/state/characters/characters.state';
import PlanetsState from 'src/app/state/planets/planets.state';
import MoviesState from 'src/app/state/movies/movies.state';
import { CharactersComponent } from '../characters/characters.component';
import CreateMovieComponent from '../create-movie/create-movie.component';
import { HomeComponent } from '../home/home.component';
import { LoadingComponent } from '../loading/loading.component';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { PlanetDetailComponent } from '../planet-detail/planet-detail.component';
import { MovieComponent } from '../movie/movie.component';
import { SwordBurgerComponent } from '../sword-burger/sword-burger.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    NumberToRomanPipe,
    UnknownToQuestionMarkPipe,
    AbbreviateNumberPipe,
    DashboardComponent,
    LoadingComponent,
    HomeComponent,
    MovieComponent,
    SwordBurgerComponent,
    CreateMovieComponent,
    CharactersComponent,
    MovieDetailComponent,
    PlanetDetailComponent
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
    MatSnackBarModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    NgxsModule.forFeature([AuthState, MoviesState, CharactersState, PlanetsState]),
  ],
})
export class DashboardModule {}
