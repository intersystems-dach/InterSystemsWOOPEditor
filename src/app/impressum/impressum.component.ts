import { Component } from '@angular/core';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.sass'],
})
export class ImpressumComponent {
  goBack() {
    window.history.back();
  }
}
