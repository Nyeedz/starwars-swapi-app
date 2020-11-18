import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Character } from '@models';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetCharacters } from 'src/app/state/characters/characters.actions';
import CharactersState from 'src/app/state/characters/characters.state';
import { GetPlanet } from 'src/app/state/planets/planets.actions';
import { PlanetDetailComponent } from '../planet-detail/planet-detail.component';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Select(CharactersState.getCharacters) characters$: Observable<Character[]>;
  displayedColumns: string[] = [
    'name',
    'height',
    'mass',
    'birth_year',
    'gender',
    'homeworld',
  ];
  resultsLength = 0;
  isLoading = false;
  dataSource: MatTableDataSource<Character>;

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadCharacters(1);
  }

  async loadCharacters(page: number) {
    this.isLoading = true;
    await this.store.dispatch(new GetCharacters(page, true)).toPromise();
    const characters = this.store.selectSnapshot(CharactersState.getCharacters);
    this.dataSource = new MatTableDataSource(characters);
    this.resultsLength = this.store.selectSnapshot(
      CharactersState.getCharactersCount
    );
    this.isLoading = false;
  }

  async onPaginate(event: PageEvent) {
    await this.loadCharacters(this.paginator.pageIndex + 1);
  }

  openPlanetModal(url: string) {
    this.store.dispatch(new GetPlanet(url));

    const dialogRef = this.dialog.open(PlanetDetailComponent, {
      autoFocus: false,
      data: url,
      panelClass: ['full-modal', 'planet'],
    });
  }
}
