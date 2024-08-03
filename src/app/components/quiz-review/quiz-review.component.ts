import { Component } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { Router } from '@angular/router';
import { SoundEffectsService } from '../../services/sound-effects.service';

@Component({
  selector: 'app-quiz-review',
  standalone: true,
  imports: [],
  templateUrl: './quiz-review.component.html',
  styleUrl: './quiz-review.component.css',
})
export class QuizReviewComponent {
  constructor(
    private scoreService: ScoreService,
    public soundEffect: SoundEffectsService,
    public router: Router
  ) {}

  score: number = this.scoreService.getCorrectScore();
  wrongQuestions: string[] = this.scoreService.getWrongQuestions();
  answeredQuestions: string[] = this.scoreService.getAllAnsweredQuestions();

  // redirect user to retake quiz
  navigateToMode() {
    this.router.navigate(['/mode']);
  }
}
