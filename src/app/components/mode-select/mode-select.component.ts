import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { SoundEffectsService } from '../../services/sound-effects.service';

@Component({
  selector: 'app-mode-select',
  standalone: true,
  imports: [],
  templateUrl: './mode-select.component.html',
  styleUrl: './mode-select.component.css',
})
export class ModeSelectComponent {
  constructor(private category: CategoryService,
    private router: Router,
    private navigationService: NavigationService,
    public soundEffect: SoundEffectsService) {}
  
  setCategory(category: string) {
    this.category.setCurrentCategory(category);
    this.navigationService.markModeVisited();
    this.router.navigate(['/difficulty-select']);
  }
}
