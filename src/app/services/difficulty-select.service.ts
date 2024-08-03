import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DifficultySelectService {

  difficultySelected = '';

  difficultyLevel = ['beginner', 'intermediate', 'advanced']

  constructor() { }

 
}
