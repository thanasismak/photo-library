import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-photo-card',
  imports: [MatIconModule, RouterModule],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.scss'
})
export class PhotoCard {
  id = input();
  src = input();
  isFavorite = input();
  // toggleFavorite = new EventEmitter<string>();
}
