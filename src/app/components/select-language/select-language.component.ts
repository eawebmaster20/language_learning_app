import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Router } from '@angular/router';
import { SoundEffectsService } from '../../services/sound-effects.service';

@Component({
  selector: 'app-select-language',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.css'],
})
export class SelectLanguageComponent {
  isLanguageSelected: boolean = false;
  selectedLanguage: string | null = null;

  constructor(
    private languageService: LanguageService,
    private router: Router,
    public soundEffect: SoundEffectsService
  ) {}
  onLanguageSelect(language: string) {
    if (language === 'French') {
      this.isLanguageSelected = true;
      this.languageService.selectedLanguageChanged(language);
      this.selectedLanguage = language;
      console.log('Language selected:', language);
    }
  }

  onContinue() {
    if (this.isLanguageSelected) {
      this.router.navigate(['/mode']);
    }
  }
}
