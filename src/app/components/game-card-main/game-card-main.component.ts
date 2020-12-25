import { Component, Input, OnInit, NgZone } from '@angular/core';
import { GamePicAnim } from 'src/app/animations/ProfilePicAnim';
import { Game } from 'src/app/models/Game';
import { IpcService } from 'src/app/services/ipc.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-game-card-main',
  templateUrl: './game-card-main.component.html',
  styleUrls: ['./game-card-main.component.less'],
  animations: [GamePicAnim]
})
export class GameCardMainComponent implements OnInit {

  @Input() game: Game;

  constructor(private ipc: IpcService, private loader: LoaderService, private _ngZone: NgZone) { }

  ngOnInit(): void {

    this.ipc.on('success', (event, arg) => {
      this._ngZone.run(() => {
        this.loader.stopLoader();
      });
    });


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

  moreInfo() {

  }

}
