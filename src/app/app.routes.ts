import { Routes } from '@angular/router';
import { SentenceBuildingComponent } from './components/sentence-building/sentence-building.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ModeSelectComponent } from './components/mode-select/mode-select.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { DifficultyComponent } from './components/difficulty/difficulty.component';
import { QuizReviewComponent } from './components/quiz-review/quiz-review.component';

import { routeAccessGuard } from './guards/route-access.guard';
import { MainQuizComponent } from './components/main-quiz/main-quiz.component';
import { ScoreComponent } from './components/score/score.component';
import { scoreGuard } from './guards/score.guard';

import { VocabularyComponent } from './components/vocabulary/vocabulary.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomePageComponent },
  {
    path: 'language',
    title: 'Language Select',
    component: SelectLanguageComponent,
  },
  { path: 'mode', title: 'Game Mode', component: ModeSelectComponent },
  // add route guard to prevent from accessing difficulty select directly without accessing game mode
  {
    path: 'difficulty-select',
    title: 'Difficulty Select',
    component: DifficultyComponent,
    canActivate: [routeAccessGuard],
  },

  { path: 'quiz',
    title: 'Quiz',
    component: MainQuizComponent,
    canActivate: [routeAccessGuard]
 },
  {
    path: 'sentence',
    title: 'Sentence Building',
    component: SentenceBuildingComponent,
  },
  { path: 'score', title: 'Score', component: ScoreComponent
    // canActivate: [scoreGuard]
   },
  { path: 'vocabulary',
    title: 'Vocabulary',
    component: VocabularyComponent,
  },
  { path: 'review', title: 'Quiz Review', component: QuizReviewComponent },
  { path: '**', title: 'Not Found Page', component: PageNotFoundComponent },
];
