import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SoundEffectsService } from '../../services/sound-effects.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

constructor(private router: Router, public soundEffect: SoundEffectsService) {}
navigateToLanguage(){
  this.router.navigate(['/language']);
}
}
