import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameModeService {
  private currentGameMode = '';

  constructor() {}

  getCurrentGameMode() {
    return this.currentGameMode;
  }

  setCurrentGameMode(gameMode: string) {
    this.currentGameMode = gameMode;
  }
}
