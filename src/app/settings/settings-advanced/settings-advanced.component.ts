import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManger } from 'src/utils/classes';

@Component({
  selector: 'app-settings-advanced',
  templateUrl: './settings-advanced.component.html',
  styleUrls: ['./settings-advanced.component.scss'],
})
export class SettingsAdvancedComponent {
  selected: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let x = this.route.snapshot.paramMap.get('settingsName');
    if (x == null) {
      this.selected = '';
      return;
    }
    this.selected = x;
  }

  setSelected(event: string): void {
    this.selected = event;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  getUserLevel() {
    return UserManger.userLevel;
  }
}
