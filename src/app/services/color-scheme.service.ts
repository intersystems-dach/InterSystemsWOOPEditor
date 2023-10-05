import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  public darkModeEnabled = false;

  constructor(private localStorageService: LocalStorageService) {
    let colorScheme = this.localStorageService.getColorScheme();
    if (colorScheme == null) {
      colorScheme = this.detectPrefersColorScheme();
    }
    if (colorScheme === 'dark') {
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

  funkyMode() {
    document.documentElement.setAttribute('data-theme', 'funky');
    this.darkModeEnabled = true;
  }

  oceanMode() {
    document.documentElement.setAttribute('data-theme', 'ocean');
    this.darkModeEnabled = false;
  }

  sunsetMode() {
    document.documentElement.setAttribute('data-theme', 'sunset');
    this.darkModeEnabled = false;
  }

  rubyMode() {
    document.documentElement.setAttribute('data-theme', 'ruby');
    this.darkModeEnabled = true;
  }

  coralMode() {
    document.documentElement.setAttribute('data-theme', 'coral');
    this.darkModeEnabled = false;
  }

  lavenderMode() {
    document.documentElement.setAttribute('data-theme', 'lavender');
    this.darkModeEnabled = true;
  }

  detectPrefersColorScheme(): string {
    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      // If the browser does not support prefers-color-scheme, set the default to dark.
      return 'light';
    }
  }
}
