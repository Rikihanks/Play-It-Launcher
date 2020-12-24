import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Game } from '../models/Game';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  gamessn;
  games = new BehaviorSubject<Game[]>([]);
  private user: User;
  private subscription: Subscription;
  
  constructor(public auth: AuthService, private afs: AngularFirestore) {

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
    return gameRef.set(game, { merge: true })
  }

  
}
