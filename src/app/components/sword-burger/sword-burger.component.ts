import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'sword-burger',
  template: `
    <div class="burger" #burger>
      <div class="saber top">
        <div class="handle"></div>
        <div class="light"></div>
      </div>
      <div class="saber middle">
        <div class="light"></div>
        <div class="handle"></div>
      </div>
      <div class="saber bottom">
        <div class="handle"></div>
        <div class="light"></div>
      </div>
    </div>
  `,
  styleUrls: ['./sword-burger.component.scss'],
})
export class SwordBurgerComponent implements AfterViewInit {
  @Output() action: EventEmitter<null> = new EventEmitter();
  @ViewChild('burger') burger: ElementRef;

  ngAfterViewInit() {
    this.burger.nativeElement.addEventListener('click', (event) =>
      this.action.emit()
    );
  }
}
