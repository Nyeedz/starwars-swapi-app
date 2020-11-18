import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Planet } from '@models';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import PlanetsState from 'src/app/state/planets/planets.state';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss'],
})
export class PlanetDetailComponent implements OnInit  {
  planet$: Observable<Planet>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public url: string,
    private store: Store,
  ) {}

  ngOnInit() {
    this.planet$ = this.store.select(PlanetsState.getPlanet(this.url));
  }
}
