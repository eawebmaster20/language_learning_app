import { Component, Inject } from '@angular/core';
import { DifficultySelectService } from '../../services/difficulty-select.service';
import { Router } from '@angular/router';
import { GameModeService } from '../../services/game-mode.service';
import { CategoryService } from '../../services/category.service';
import { SoundEffectsService } from '../../services/sound-effects.service';

@Component({
  selector: 'app-difficulty',
  standalone: true,
  imports: [],
  templateUrl: './difficulty.component.html',
  styleUrl: './difficulty.component.css',
})
export class DifficultyComponent {
  constructor(
    public difficulty: DifficultySelectService,
    private router: Router,
    private category: CategoryService,
    public soundEffect: SoundEffectsService
  ) {}


  
  difficultySelected: boolean = false;

  onDifficultySelect(event: any) {
    this.difficultySelected = true;
    this.difficulty.difficultySelected = event.target.textContent;
    this.category.setCurrentCategory = event.target.textContent;
    // console.log(this.difficulty.difficultySelected);
  }

  navigateToSelectedMode() {
    this.router.navigate(['/quiz']);
  }
}
