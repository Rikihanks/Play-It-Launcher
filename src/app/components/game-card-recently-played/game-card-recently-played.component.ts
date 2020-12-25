import { Component, Input, NgZone, OnInit } from '@angular/core';
import { GamePicAnim } from 'src/app/animations/ProfilePicAnim';
import { Game } from 'src/app/models/Game';
import { IpcService } from 'src/app/services/ipc.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-game-card-recently-played',
  templateUrl: './game-card-recently-played.component.html',
  styleUrls: ['./game-card-recently-played.component.less'],
  animations: [GamePicAnim]
})
export class GameCardRecentlyPlayedComponent implements OnInit {

  @Input() game: Game;
  
  constructor(private ipc: IpcService, private loader: LoaderService, private _ngZone: NgZone) { }

  ngOnInit(): void {
  }

  sendIpcPlay() {
    this.loader.startLoader();

    if (this.game.addedPrograms.length > 0) {
      this.game.addedPrograms.map(program => {
        this.ipc.sendOpenFile(program);
      })
    }

    this.ipc.sendOpenFile(this.game.gamePath);
  }

}
