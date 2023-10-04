
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserManger } from 'src/utils/classes';

@Component({
  selector: 'app-settings-header',
  templateUrl: './settings-header.component.html',
  styleUrls: ['./settings-header.component.scss'],
})
export class SettingsHeaderComponent {
  @Input() selected: string = 'storage';
  @Output() selectedChange = new EventEmitter<string>();
  constructor(private router: Router) {}

  setSelected(selected: string) {
    this.selected = selected;
    this.router.navigate(['/settings', selected]);
    this.selectedChange.emit(selected);
  }

  getUserLevel() {
    return UserManger.userLevel;
  }
}
