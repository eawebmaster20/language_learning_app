import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { GameModeService } from '../../services/game-mode.service';
import { DifficultySelectService } from '../../services/difficulty-select.service';
import { FormsModule } from '@angular/forms';
import {
  QuizQuestion,
  Categories,
  Section,
} from '../../interfaces/quizInterface';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { ScoreService } from '../../services/score.service';
import { Router } from '@angular/router';
import { SoundEffectsService } from '../../services/sound-effects.service';
import 'animate.css';

@Component({
  selector: 'app-main-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-quiz.component.html',
  styleUrl: './main-quiz.component.css',
})
export class MainQuizComponent {
  questions: QuizQuestion[] = [];
  filteredQuestions: QuizQuestion[] = [];
  currentGameMode: string = '';
  currentCategory: string = '';
  selectedDifficulty: string | null = '';
  questionsData: Section[] = [];

  // getting current data index
  currentQuestionIndex: number = 0;
  currentSectionIndex: number = 0;

  // tracking correct answers
  correctScore: number = 0;
  selectedAnswer: string = '';
  showCheckBtn: boolean = false;
  isChecked: boolean = false;
  isCorrect: boolean = false;
  isIncorrect: boolean = false;

  // User word selection in sentence construction
  userSelection: string[] = [];

  // Hiding the next button
  isNextVisible = false;

  // Disabling answer buttons after clicking check
  isDisabled = false;
  isCheckButtonClicked = false;

  // Fill-in answers array
  userFillins: string[] = [];

  // Progress bar value
  progressValue: number = 0;

  constructor(
    private dataService: DataService,
    public gameModeService: GameModeService,
    private difficultyService: DifficultySelectService,
    public categoryService: CategoryService,
    private scoreService: ScoreService,
    public router: Router,
    public soundEffects: SoundEffectsService
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

      this.setInitialProgressValue();
    });
  }

  setInitialProgressValue(): void {
    let Qnum = this.currentQuestionIndex + 1;
    let data = this.questionsData;
    let sectionLength = data.length;
    let count = 1;
    let IncreamentValue = 0;

    let totalquestions: number = 0;

    // Getting total number of quesitions for
    for (let i = 0; i < sectionLength; i++) {
      totalquestions += data[i].questions.length;
    }

    // console.log('total questions: ', totalquestions);
    // console.log('current question: ', Qnum);

    IncreamentValue = (count / totalquestions) * 100;
    this.progressValue = IncreamentValue;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.resetForNextQuestion();
    } else {
      this.nextSection();
    }

    this.updateProgressBar();
  }

  nextVocabularyQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.resetForNextVocabularyQuestion();
    } else {
      this.nextSection();
    }

    this.updateProgressBar();
  }

  nextSection() {
    if (this.currentSectionIndex < this.questionsData.length - 1) {
      this.currentSectionIndex++;
      this.currentQuestionIndex = 0;
      this.questions = this.questionsData[this.currentSectionIndex].questions;
      this.resetForNextQuestion();
    } else {
      // All sections and questions completed
      // display scores
      this.router.navigate(['/score']);
    }
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  getCurrentSectionDescription() {
    return this.questionsData[this.currentSectionIndex].sectionDescription;
  }

  // Play Dialogue Sound
  playSound(audioUrl: string) {
    let sound: HTMLAudioElement = new Audio(audioUrl);
    sound.play();
  }

  // get selected option
  getSelectedAnswer(option: string) {
    this.selectedAnswer = option;
    return this.selectedAnswer;
  }

  // Check constructed sentence
  checkConstructedSentence() {
    if (
      this.userSelection.join('').toLowerCase() ===
      this.questions[this.currentQuestionIndex].answer
        .toLowerCase()
        .split(' ')
        .join('')
    ) {
      this.correctScore++;
      this.scoreService.setCorrectScore(this.correctScore);
      console.log(this.correctScore);
      this.soundEffects.playSound('sound1');
      this.userSelection = [];
    } else {
      this.soundEffects.playSound('sound3');
      this.scoreService.addWrongQuestion(
        this.questions[this.currentQuestionIndex].question,
        this.selectedAnswer,
        this.questions[this.currentQuestionIndex].answer
      );
    }
    this.isChecked = true;
  }

  // check if selected answer is correct
  checkSelectedAnswer() {
    if (!this.selectedAnswer) {
      return;
    }

    // Add to answeredQuestions regardless of correctness
    this.scoreService.addAllAnsweredQuestions(
      this.questions[this.currentQuestionIndex].question,
      this.selectedAnswer
    );

    if (
      this.questions[this.currentQuestionIndex].answer === this.selectedAnswer
    ) {
      this.correctScore++;
      this.scoreService.setCorrectScore(this.correctScore);
      this.isCorrect = true;
      this.isNextVisible = true;
      console.log(this.correctScore);
    } else {
      // adds wrongly answered question to wrong questions array
      this.scoreService.addWrongQuestion(
        this.questions[this.currentQuestionIndex].question,
        this.selectedAnswer,
        this.questions[this.currentQuestionIndex].answer
      );

      this.isNextVisible = true;
      // this.wrongQuestions.push(this.questions[this.currentQuestionIndex].question,
      //     this.selectedAnswer,
      //     this.questions[this.currentQuestionIndex].answer)
      //     console.log(this.wrongQuestions)
      this.isIncorrect = true;
    }

    // Logging the user's selction
    // console.log(this.userSelection.join('').toLowerCase());
    // console.log(
    //   this.questions[this.currentQuestionIndex].answer
    //     .toLowerCase()
    //     .split(' ')
    //     .join('')
    // );
    this.isChecked = true;
  }

  //Play sound1 when correct answer is clicked
  playAnswerSound() {
    if (
      this.questions[this.currentQuestionIndex].answer === this.selectedAnswer
    ) {
      this.soundEffects.playSound('sound1');
    }
    //Play sound3 when wrong answer is clicked
    else if (
      this.questions[this.currentQuestionIndex].answer !== this.selectedAnswer
    ) {
      this.soundEffects.playSound('sound3');
    }
  }

  // Reset state for the next question
  resetForNextQuestion() {
    this.isChecked = false;
    this.showCheckBtn = false;
    this.isCorrect = false;
    this.isIncorrect = false;
    this.userFillins = [];
    this.userSelection = [];
    this.isNextVisible = false;
  }
  // Reset state for the next vocabulary question
  resetForNextVocabularyQuestion() {
    this.isChecked = false;
    this.showCheckBtn = false;
    this.selectedAnswer = '';
    this.isCorrect = false;
    this.isIncorrect = false;
    this.userFillins = [];
    this.userSelection = [];
    this.isNextVisible = false;
  }

  isCorrectOption(option: string): boolean {
    return this.isCorrect && this.selectedAnswer === option;
  }

  isIncorrectOption(option: string): boolean {
    return this.isIncorrect && this.selectedAnswer === option;
  }

  isSelectedOption(option: string): boolean {
    return this.selectedAnswer === option;
  }

  checkSentence(word: string) {
    this.userSelection.push(word);
    this.userFillins.push(word);
    this.checkSelectedAnswer();
    // console.log(this.userSelection);
  }

  toggleDisabled() {
    this.isCheckButtonClicked = !this.isCheckButtonClicked;
    this.isDisabled = !this.isDisabled;
    console.log(this.isDisabled);
  }

  //  Check if the option should be disabled
  shouldDisable(option: string): boolean {
    return (
      this.isCheckButtonClicked &&
      this.selectedAnswer !== null &&
      option !== this.getCurrentQuestion().answer &&
      option !== this.selectedAnswer
    );
  }

  removeFiller(word: string) {
    let index = this.userFillins.indexOf(word);
    this.userFillins.splice(index, 1);
  }

  updateProgressBar(): void {
    let Qnum = this.currentQuestionIndex + 1;
    let data = this.questionsData;
    let sectionLength = data.length;
    let count = 1;
    let IncreamentValue = 0;

    let totalquestions: number = 0;

    // Getting total number of quesitions for
    for (let i = 0; i < sectionLength; i++) {
      totalquestions += data[i].questions.length;
    }

    console.log('dialog - total questions: ', totalquestions);
    console.log('dialog - current question: ', Qnum);

    IncreamentValue = (count / totalquestions) * 100;
    console.log('dialog - value increase: ', IncreamentValue);
    this.progressValue += IncreamentValue;
  }

  navigateToDifficultySelect() {
    this.router.navigate(['/difficulty-select']);
  }
  // updateProgressBar() : void {
  //   let Qnum = this.currentQuestionIndex+1;
  //   let data = this.questionsData;
  //   let sectionLength =data.length;

  //   let questionlengths: number[] = [];
  //   let totalquestions: number = 0;

  //   // Getting length of various sections
  //   for(let i = 0; i < sectionLength; i++) {
  //     questionlengths[i] = data[i].questions.length;
  //     // console.log('question type', data[i].sectionDescription)
  //   }

  //   // Add together the question lenths
  //   for(let i = 0; i < sectionLength; i++) {
  //     totalquestions += questionlengths[i];
  //   }

  //   // console.log('Current Section: ', this.getCurrentSectionDescription());

  //   // console.log("Qnum", Qnum);
  //   // console.log("totalquestions", totalquestions);

  //   let value = (Qnum / totalquestions)*100;
  //   // console.log("value", value);

  //   // Assign value to progressValue variable
  //   this.progressValue = value;

  //   // console.log("progressValue", this.progressValue);
  //   // console.log('Current Index: ', this.currentQuestionIndex);
  //   // console.log(data[0].questions.length -1);

  //   for (let i = 0; i < sectionLength; i++) {
  //     if (i === this.currentSectionIndex) {

  //       let questionsInSection = data[i].questions.length;

  //       if (this.currentQuestionIndex === questionsInSection - 1) {
  //         this.newValue = value;
  //         console.log('Current Index:', this.currentQuestionIndex);
  //         console.log('New Value:', this.newValue);
  //         this.newValue = value;
  //       } else {
  //         console.log("Not there yet");
  //       }
  //       break;
  //     }

  //   }

  //   value = this.newValue;
  //   console.log(this.newValue);

  // }
}
