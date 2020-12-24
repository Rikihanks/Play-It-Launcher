import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { IgdbService } from 'src/app/services/igdb.service';
import { IpcService } from 'src/app/services/ipc.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Game } from 'src/app/models/Game';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProfilePicAnim } from 'src/app/animations/ProfilePicAnim';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  animations: [ProfilePicAnim]
})
export class MainComponent implements OnInit {

  games: Game[];
  private user: User;
  private subscription: Subscription = new Subscription();
  private gamesSubscription: Subscription = new Subscription();

  constructor(public auth: AuthService, public ipc: IpcService, public gamesService: GamesService) { }


  async ngOnInit(): Promise<void> {
    this.subscription.add(this.auth.user$.subscribe(u => {
      this.user = u;
      if(this.user != null) {
         this.subscribeToGames();
      }
    }));




    /**/

  }

  subscribeToGames() {
    this.gamesSubscription.add(
      this.gamesService.games.subscribe(games => {
        this.games = games;
      }));
  }

  canShowLogoutButton() {
    return this.user != null;
  }

  logoutAndClean() {
    this.gamesService.games.next([]);
    this.auth.signOut()
    this.gamesSubscription.unsubscribe();
    this.gamesSubscription = new Subscription();
    //todo pending
  }



}


