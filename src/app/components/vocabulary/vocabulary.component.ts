import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { GameModeService } from '../../services/game-mode.service';
import { DifficultySelectService } from '../../services/difficulty-select.service';
import {
  QuizQuestion,
  Categories,
  Section,
} from '../../interfaces/quizInterface';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vocabulary',
  standalone: true,
  imports: [],
  templateUrl: './vocabulary.component.html',
  styleUrl: './vocabulary.component.css'
})
export class VocabularyComponent {
  questions: QuizQuestion[] = [];
  filteredQuestions: QuizQuestion[] = [];
  currentGameMode: string = '';
  currentCategory: string = '';
  selectedDifficulty: string | null = '';
  questionsData: Section[] = [];

  // getting current data index
  currentQuestionIndex: number = 0;
  currentSectionIndex: number = 0;

  constructor(
    private dataService: DataService,
    public gameModeService: GameModeService,
    private difficultyService: DifficultySelectService,
    public categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.currentGameMode = this.gameModeService.getCurrentGameMode();
    this.selectedDifficulty = this.difficultyService.difficultySelected;
    this.currentCategory = this.categoryService.getCurrentCategory();

    console.log(this.categoryService.getCurrentCategory());
    this.dataService.getAllQuestions().subscribe((data: Categories) => {
      let tempData =
        data[this.categoryService.getCurrentCategory()][
          this.difficultyService.difficultySelected.toLowerCase()
        ];
      console.log(tempData);
      this.questionsData = Object.values(tempData);
      console.log(this.questionsData);
      console.log(this.difficultyService.difficultySelected);

      this.questionsData = Object.values(tempData);

      this.questionsData.sort((a, b) => {
        if (a.sectionDescription === 'greetings') return -1;
        if (b.sectionDescription === 'greetings') return 1;
        return 0;
      });
      // filtering questions based on game mode
      if (this.questionsData.length > 0) {
        this.questions = this.questionsData[this.currentSectionIndex].questions;
      }
    });
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.nextSection();
    }
  }

  nextSection() {
    if (this.currentSectionIndex < this.questionsData.length - 1) {
      this.currentSectionIndex++;
      this.currentQuestionIndex = 0;
      this.questions = this.questionsData[this.currentSectionIndex].questions;
    } else {
      // All sections and questions completed
      console.log('Quiz completed');
    }
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  getCurrentSectionDescription() {
    return this.questionsData[this.currentSectionIndex].sectionDescription;
  }
}
