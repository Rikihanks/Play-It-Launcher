import { Component, Input, OnInit } from '@angular/core';
import { GamePicAnim } from 'src/app/animations/ProfilePicAnim';
import { Game } from 'src/app/models/Game';

@Component({
  selector: 'app-game-card-main',
  templateUrl: './game-card-main.component.html',
  styleUrls: ['./game-card-main.component.less'],
  animations: [GamePicAnim]
})
export class GameCardMainComponent implements OnInit {

  @Input() game: Game;
  
  constructor() { }

  ngOnInit(): void {
  }

}
