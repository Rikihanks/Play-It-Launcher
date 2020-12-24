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
export class MainComponent implements OnInit, OnDestroy {

  games: Game[];
  private user: User;
  private subscription: Subscription;

  constructor(public auth: AuthService, public ipc: IpcService, public gamesService: GamesService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
     this.subscription = this.auth.user$.subscribe(u => {
      this.user = u;
    })

    
    this.gamesService.games.subscribe(games => {
      this.games = games;
    })
    
   

    /**/
    
  }

  canShowLogoutButton() {
   return this.user != null;
  }

  logoutAndClean() {
    this.auth.signOut()
    //todo pending
    setTimeout(() => {
      this.gamesService.games.next([]);
    }, 500);
  }

  

}
 

