import { Component, Input, OnInit } from '@angular/core';
import { GamePicAnim } from 'src/app/animations/ProfilePicAnim';
import { Game } from 'src/app/models/Game';

@Component({
  selector: 'app-game-card-recently-played',
  templateUrl: './game-card-recently-played.component.html',
  styleUrls: ['./game-card-recently-played.component.less'],
  animations: [GamePicAnim]
})
export class GameCardRecentlyPlayedComponent implements OnInit {

  @Input() game: Game;
  
  constructor() { }

  ngOnInit(): void {
  }

}
