import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { GamesService } from 'src/app/services/games.service';
import { IgdbService } from 'src/app/services/igdb.service';
import { IpcService } from 'src/app/services/ipc.service';
import { ModalParentComponent } from '../modal-parent/modal-parent.component';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.less']
})
export class NewGameComponent extends ModalParentComponent implements OnInit {

  showInputPlatform: boolean;
  userGames: Game[];
  gameName: string;
  gamePlatform: string = "Platform";
  games: Game[];
  gamesCopy: Game[];
  addedProgramPath: string;
  gameFilePath: string;
  selectedGame: Game = null;

  @ViewChild("selectGameFile") selectFile;
  
  @ViewChild("selectAddedProgramFile") selectAddedProgramFile;

  constructor(private igdb: IgdbService, private ipc: IpcService, private gamesServ: GamesService) {
    super();
  }

  ngOnInit(): void {

    this.gamesServ.games.subscribe(games => {
      this.userGames = games;
      
    });

  }

  async findGame(name: string) {
    if(!name) {
      return;
    }

    this.selectedGame = null;

    let games = await this.igdb.findGame(name).toPromise();

    games.forEach(async game => {
      let coverArray = await this.igdb.findCover(game.cover).toPromise();
      game.verticalCoverUrl = coverArray ? this.formatCoverUrl(coverArray, 't_cover_big') : null;
      game.horizontalCoverUrl = coverArray ? this.formatCoverUrl(coverArray, 't_screenshot_med') : null;
    })

    this.games = games;
    
  }

  getUnRepeatedCategories() {
    let categories = [];
    this.userGames.forEach(game => {
      if(!categories.includes(game.category)) {
        categories.push(game.category);
      }
    })
    return categories;
  }

  canShowInputPlatform() {
    return this.showInputPlatform;
  }

  platformSelectChange(value) {
    if(value == "other") {
      this.showInputPlatform = true;
      console.log('si');
      
    }else {
      this.showInputPlatform = false;
      console.log('no');
      
    }
    this.gamePlatform = value;
  }

  platformInputChange(value) {
    this.gamePlatform = value;
  }

  selectGame(game) {
      this.selectedGame = game;
      this.gamesCopy = this.games;
      this.games = [this.selectedGame];
  }

  saveGame() {
    this.selectedGame.gamePath = this.gameFilePath;
    this.selectedGame.category = this.gamePlatform;
    this.addedProgramPath ? this.selectedGame.addedPrograms = [this.addedProgramPath] : this.selectedGame.addedPrograms = [];
    
    this.gamesServ.updateUserGame(this.selectedGame).then(
      super.getSelfReference('newGameModal').hide()
    );
    
  }

  onGameFileChange() {
    this.gameFilePath = this.selectFile.nativeElement.files[0].path;
  }

  onAddedFileChange() {
    this.addedProgramPath = this.selectAddedProgramFile.nativeElement.files[0].path;
  }

  openFilePicker(filePickerId: string) {
    document.getElementById(filePickerId).click();
  }

  formatCoverUrl(coverArray: any, coverType: string): string {
    return "https://"+coverArray[0].url.substring(2).replace('t_thumb', coverType);
  }


}
