import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { Router } from '@angular/router';
import { SoundEffectsService } from '../../services/sound-effects.service';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
})
export class ScoreComponent implements OnInit {
  score: number = 0;
  wrongQuestions!: string[];
  answeredQuestions!: string[];
  congratMsg: boolean = false;

  constructor(
    private scoreService: ScoreService,
    public router: Router,
    public soundEffect: SoundEffectsService
  ) {}

  ngOnInit(): void {
    this.score = this.scoreService.getCorrectScore();
    this.wrongQuestions = this.scoreService.getWrongQuestions();
    this.answeredQuestions = this.scoreService.getAllAnsweredQuestions();
    
    console.log('wrong questions:', this.wrongQuestions);
    
    console.log('answered questions:', this.answeredQuestions);
    this.displayCongrat();
  }
  
  displayCongrat() {
    if (this.score === this.answeredQuestions.length) {
      this.congratMsg = true;
      this.soundEffect.playSound('sound5');
      this.scoreService.checkForConfetti();
    }
    return this.congratMsg;
  }
  
  navigateToReview() {
    this.router.navigate(['/review']);
  }
}
