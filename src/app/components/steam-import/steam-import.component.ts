import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { GamesService } from 'src/app/services/games.service';
import { IpcService } from 'src/app/services/ipc.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ModalParentComponent } from '../modal-parent/modal-parent.component';

@Component({
  selector: 'app-steam-import',
  templateUrl: './steam-import.component.html',
  styleUrls: ['./steam-import.component.less']
})
export class SteamImportComponent extends ModalParentComponent implements OnInit {

  path: string;

  constructor(private ipc: IpcService, private gamesService: GamesService, private loader: LoaderService) {
    super();
  }

  ngOnInit(): void {
  }

  importarJuegosSteam() {
    this.loader.startLoader();

    this.ipc.sendAddSteamGamess(this.path);

    this.ipc.on('steamAppIds', (sender, values: string []) => {

      values.forEach(async value => {

        let game = new Game();

        let steamNameResponse = await this.gamesService.findSteamGameNameById(value);
        if(steamNameResponse != null) {
          let res2: any = steamNameResponse;
          let apps = res2.applist.apps;

          game.id = parseInt(value);
          let appInfo = apps.find(element => element.appid == value);
          game.name = appInfo.name;         
        }

        let steamGameInfo = await this.gamesService.getSteamInfoByGameId(value);
        if(steamGameInfo != null) {
          game.summary = steamGameInfo[value].data.about_the_game.replace(/(<([^>]+)>)/gi, "");
          game.horizontalCoverUrl = this.gamesService.getSteamCoverUrlByGameId(value);
          game.category = "STEAM";
        }

        
        this.gamesService.updateUserGame(Object.assign({}, game));

        this.loader.stopLoader();

      })

    })
  }

}
