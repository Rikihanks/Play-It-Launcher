import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.stopLoader();
   }

   startLoader() {
     this.loading$.next(true);
   }

   stopLoader() {
     this.loading$.next(false);
   }
}
