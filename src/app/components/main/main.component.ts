import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { IpcService } from 'src/app/services/ipc.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit, OnDestroy {

  private user: User;
  private subscription: Subscription;

  constructor(public auth: AuthService, private loader: LoaderService, public ipc: IpcService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
     this.subscription = this.auth.user$.subscribe(u => {
      this.user = u;
    })
  }

  canShowLogoutButton() {
   return this.user != null;
  }




}
