import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { IgdbService } from 'src/app/services/igdb.service';
import { IpcService } from 'src/app/services/ipc.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Game } from 'src/app/models/Game';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProfilePicAnim } from 'src/app/animations/ProfilePicAnim';
import { GamesService } from 'src/app/services/games.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  animations: [ProfilePicAnim]
})
export class MainComponent implements OnInit {
  

  games: Game[];
  private user: User;
   // your current result based on filters input
  filteredGames: Game[];
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

  onSearchChange(e) {
    if(e == "" || e == undefined || e == null) {
      this.filteredGames = this.games;
      return;
    }
    
    this.filteredGames = this._filterByName(e);
    
  }

  getUnRepeatedCategories() {
    let categories = [];
    this.games.forEach(game => {
      if(!categories.includes(game.category)) {
        categories.push(game.category);
      }
    })
    return categories;
  }

  platformSelectChanged(value) {
    console.log(value);
    if(value == "") {
      this.filteredGames = this.games;
    }else {
      this.filteredGames = this.filterByCategory(value)
    }
  }


  private _filterByName(value): Game[] {
    const filterValue = value.toLowerCase();

    return this.games.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private filterByCategory(value): Game[] {
    const filterValue = value.toLowerCase();

    return this.games.filter(option => option.category.toLowerCase().includes(filterValue));
  }

  subscribeToGames() {
    this.gamesSubscription.add(
      this.gamesService.games.subscribe(games => {
        this.games = games;
        this.filteredGames = games;
        
      }));
  }

  canShowLogoutButton() {
    return this.user != null;
  }

  logoutAndClean() {
    //i dont know why, but logging out triggers the games subscription so i have to clean it
    this.gamesService.games.next([]);
    this.auth.signOut()
    this.gamesSubscription.unsubscribe();
    this.gamesSubscription = new Subscription();
  }



}


