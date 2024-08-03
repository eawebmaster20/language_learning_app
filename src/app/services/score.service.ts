import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  correctScore: number = 0;
  selectedAnswer: string = '';
  wrongQuestions: string[] = [];
  answeredQuestions: string[] = [];

  constructor() { }


  setCorrectScore(score: number) {
    this.correctScore = score;
  }

  getCorrectScore(): number {
    return this.correctScore;
  }

  // Adds the question and selected answer to the answeredQuestions array
  addAllAnsweredQuestions(question: string, selectedAnswer:string) {
    this.answeredQuestions.push(`${question}: ${selectedAnswer}`);

  }

  getAllAnsweredQuestions() : string[] {
    return this.answeredQuestions;
  }


  // Adds the question, selected answer, and the correct answer to the wrongQuestions array
  addWrongQuestion(question: string, selectedAnswer:string,answer: string) {
    if (selectedAnswer !== answer) {
      this.wrongQuestions.push(`${question}, ${selectedAnswer}, ${answer}`);
    }
  }

  getWrongQuestions(): string[] {
    return this.wrongQuestions;
  }


  // Check if a perfect score is achieved and trigger confetti
  checkForConfetti() {
    const totalQuestions = this.answeredQuestions.length;
    if (this.correctScore === totalQuestions && totalQuestions > 0) {
      this.triggerConfetti();
    }
  }

  // Function to trigger confetti
  private triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}


