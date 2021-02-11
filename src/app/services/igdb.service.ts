import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../models/Game';

@Injectable({
  providedIn: 'root'
})
export class IgdbService {

  private baseUrl = "https://play-it-proxy.herokuapp.com/";

  constructor(private http: HttpClient) { }

  findGame(gameName: string): Observable<Game[]> {
    return this.http.post(this.baseUrl + "games", "fields name, cover, summary;  where name ~\""+ gameName+"\"*;",
    ) as Observable<Game[]>;
  }

  findCover(coverId: number): Observable<any> {
    if (!coverId) {
      return of(null);
    }
    return this.http.post(this.baseUrl + "covers", "fields url; where id=" + coverId + ";") as Observable<any>;
  }
}
