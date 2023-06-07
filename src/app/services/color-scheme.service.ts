import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  public darkModeEnabled = false;

  constructor(private localStorageService: LocalStorageService) {
    if (localStorageService.getColorScheme() === 'dark') {
      this.darkMode();
    } else {
      this.lightMode();
    }
  }

  isDarkModeEnabled() {
    return this.darkModeEnabled;
  }

  darkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
    this.darkModeEnabled = true;
    this.localStorageService.setColorScheme(true);
  }

  lightMode() {
    document.documentElement.setAttribute('data-theme', 'light');
    this.darkModeEnabled = false;
    this.localStorageService.setColorScheme(false);
  }

  detectPrefersColorScheme(): string {
    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'darkMode'
        : 'lightMode';
    } else {
      // If the browser does not support prefers-color-scheme, set the default to dark.
      return 'darkMode';
    }
  }
}
