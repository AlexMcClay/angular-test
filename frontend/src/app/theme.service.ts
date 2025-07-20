import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private STORAGE_KEY = 'darkMode';
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const storedPreference = localStorage.getItem(this.STORAGE_KEY);

    if (storedPreference !== null) {
      this.setDarkMode(storedPreference === 'true');
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.setDarkMode(prefersDark);

      localStorage.setItem(this.STORAGE_KEY, prefersDark.toString());
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (localStorage.getItem(this.STORAGE_KEY) === null) {
          // Only update if user hasn't set a preference
          this.setDarkMode(e.matches);
        }
      });
  }

  toggleDarkMode(): void {
    const currentValue = this.darkModeSubject.value;
    this.setDarkMode(!currentValue);
  }

  private setDarkMode(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    localStorage.setItem(this.STORAGE_KEY, isDark.toString());

    if (isDark) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }

  getDarkMode(): Observable<boolean> {
    return this.darkMode$;
  }
}
