import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings-advanced',
  templateUrl: './settings-advanced.component.html',
  styleUrls: ['./settings-advanced.component.sass'],
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
}
