import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loaderInterceptor';
import { LoginComponent } from './components/login/login.component';
import { ModalParentComponent } from './components/modal-parent/modal-parent.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { GameCardSearchComponent } from './components/game-card-search/game-card-search.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameCardMainComponent } from './components/game-card-main/game-card-main.component';
import { GameCardRecentlyPlayedComponent } from './components/game-card-recently-played/game-card-recently-played.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent,
    LoaderComponent,
    LoginComponent,
    ModalParentComponent,
    NewGameComponent,
    GameCardSearchComponent,
    GameCardMainComponent,
    GameCardRecentlyPlayedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [LoaderService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
