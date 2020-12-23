import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { IgdbService } from 'src/app/services/igdb.service';
import { IpcService } from 'src/app/services/ipc.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Game } from 'src/app/models/Game';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({  opacity: 0, boxShadow: 'none', offset: 0 }),
            animate('2s ease-out', 
                    style({ opacity: 1 , boxShadow: '0 0 35px #39ceb0', offset: 0.1}))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 300, opacity: 1 }),
            animate('1s ease-in', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class MainComponent implements OnInit, OnDestroy {

  private user: User;
  private subscription: Subscription;

  constructor(public auth: AuthService, public ipc: IpcService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
     this.subscription = this.auth.user$.subscribe(u => {
      this.user = u;
    })

    /**/
    
  }

  canShowLogoutButton() {
   return this.user != null;
  }

  

}
 

