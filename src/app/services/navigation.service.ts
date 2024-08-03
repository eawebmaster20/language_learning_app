import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  vistedMode: boolean =  false;
  quizCompleted: boolean =  false;

  // mark mode as visited
  markModeVisited():void {
    this.vistedMode = true;
  }

  hasModeVisited():boolean {
    return this.vistedMode;
  }

  // Mark quiz as completed
  markQuizCompleted(): void {
    this.quizCompleted = true;
  }

  // Check if quiz has been completed
  isQuizCompleted(): boolean {
    return this.quizCompleted;
  }
}
