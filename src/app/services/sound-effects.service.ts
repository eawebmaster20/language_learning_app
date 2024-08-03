import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundEffectsService {

  private audioCache: Map<string, HTMLAudioElement> = new Map();

  // Array of sound objects with key and URL
  private soundEffects = [
    { key: 'sound1', url: 'assets/sound effects/correct-answer.wav' },
    { key: 'sound2', url: 'assets/sound effects/hover.wav' },
    { key: 'sound3', url: 'assets/sound effects/wrong-answer.wav' },
    { key: 'sound4', url: 'assets/sound effects/click.wav' },
    { key: 'sound5', url: 'assets/sound effects/congratulatory-clap.wav' },
  ];

  constructor() {
    this.preloadAllSounds();
  }

  private preloadAllSounds(): void {
    this.soundEffects.forEach(sound => {
      this.preloadAudio(sound.url, sound.key);
    });
  }

  private preloadAudio(url: string, key: string): void {
    const audio = new Audio(url);
    audio.preload = 'auto';

    audio.addEventListener('canplaythrough', () => {
      this.audioCache.set(key, audio);
      console.log(`Preloaded ${key}`);
    });

    audio.addEventListener('error', (event) => {
      console.error(`Failed to load audio: ${url}`, event);
    });

    audio.load();
  }

  getAudio(key: string): HTMLAudioElement | undefined {
    return this.audioCache.get(key);
  }

  playSound(key: string): void {
    const audio = this.getAudio(key);
    if (audio) {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    } else {
      console.warn('Audio not found in cache for key:', key);
    }
  }
}

