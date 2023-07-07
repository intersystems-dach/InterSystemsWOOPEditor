import { Component } from '@angular/core';

@Component({
  selector: 'app-get-help',
  templateUrl: './get-help.component.html',
  styleUrls: ['./get-help.component.sass'],
})
export class GetHelpComponent {
  goBack() {
    window.history.back();
  }
}
