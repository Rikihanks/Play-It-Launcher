import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/Game';

@Component({
  selector: 'app-game-card-search',
  templateUrl: './game-card-search.component.html',
  styleUrls: ['./game-card-search.component.less']
})
export class GameCardSearchComponent implements OnInit {

  @Input() game: Game;

  constructor() { }

  ngOnInit(): void {
    
  }

}
