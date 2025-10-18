import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-photo-card',
  imports: [MatIconModule, RouterModule],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.scss'
})
export class PhotoCard {
  id = input.required<string>();
  src = input();
  isFavorite = input();

  toggleFavorite = output<string>();
}
