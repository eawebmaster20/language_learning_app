import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModeSelectComponent } from './components/mode-select/mode-select.component';
import { MainQuizComponent } from './components/main-quiz/main-quiz.component';
import { SentenceBuildingComponent } from './components/sentence-building/sentence-building.component';
import { DialogueSimulationComponent } from './components/dialogue-simulation/dialogue-simulation.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { DifficultyComponent } from './components/difficulty/difficulty.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ScoreComponent } from "./components/score/score.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ModeSelectComponent,
    DifficultyComponent,
    SelectLanguageComponent,
    MainQuizComponent,
    SentenceBuildingComponent,
    DialogueSimulationComponent,
    HomePageComponent,
    ScoreComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'monolangue';
}
