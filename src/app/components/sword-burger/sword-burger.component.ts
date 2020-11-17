import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Movie } from '@models';

@Component({
  selector: 'sword-burger',
  template: `
    <div id="burger">
      <div class="bun top"></div>
      <div class="filling"></div>
      <div class="bun bottom"></div>
    </div>
  `,
  styleUrls: ['./sword-burger.component.scss'],
})
export class SwordBurgerComponent {
  @Output() action: EventEmitter<null> = new EventEmitter();

  @HostListener('click', ['$event'])
  onClick($event: any) {
    this.action.emit();
  }
}
