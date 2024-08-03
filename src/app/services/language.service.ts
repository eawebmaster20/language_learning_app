import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private selectedLanguage = new BehaviorSubject<string | null>(null);
  selectedLanguage$ = this.selectedLanguage.asObservable();

  constructor() {}

  selectedLanguageChanged(language: string) {
    this.selectedLanguage.next(language);
    console.log(language)
  }

  getSelectedLanguage(): string | null {
    return this.selectedLanguage.getValue();
  }
}
