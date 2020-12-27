import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Game } from '../models/Game';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { User } from '../models/User';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  gamessn;
  games = new BehaviorSubject<Game[]>([]);
  private user: User;
  private subscription: Subscription;
  
  constructor(public auth: AuthService, private afs: AngularFirestore, private http: HttpClient) {

    this.subscription = this.auth.user$.subscribe(u => {
      this.user = u;
      if(u != null) {
       let ref = this.afs.doc(`users/${u.uid}`).collection<Game>('games').valueChanges();
       ref.subscribe(games => {
          this.games.next(games);
       })
      }else {
        this.games.next([]);
      }
    })

    
   }

   updateUserGame(game: Game) {
    const gameRef: AngularFirestoreDocument<Game> = this.afs.doc(`users/${this.user.uid}/games/${game.id}`);
    //console.log(gameRef);
    
    return gameRef.set(game, { merge: true })
  }

  findSteamGameNameById(id) {
    return this.http.get("http://api.steampowered.com/ISteamApps/GetAppList/v0002/").toPromise();
  }

  getSteamCoverUrlByGameId(id: string) {
    return "https://steamcdn-a.akamaihd.net/steam/apps/"+id+"/header.jpg";
  }

  getSteamInfoByGameId(id: string) {

    return this.http.get("https://store.steampowered.com/api/appdetails?appids="+id).toPromise();
    //const strippedString = ;
  }

  
}
