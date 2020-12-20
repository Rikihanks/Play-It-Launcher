import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
    //private router: Router
  ) {
    this.user$ = this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )


  }

   registerUser(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

   loginUser(email, password) {
     return firebase.auth().signInWithEmailAndPassword(email, password);
   }

   updateUserData(userCred, username, avatar) {
    console.log(userCred);
    
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${userCred.user.uid}`);

    const data = { 
      uid: userCred.user.uid || "", 
      email: userCred.user.email || "", 
      displayName: username || "", 
      photoURL: avatar || ""
    } 
    console.log(data);
    
    return userRef.set(data, { merge: true })


  }

  async signOut() {
    await this.afAuth.signOut();
    //this.router.navigate(['/']);
  }
}
