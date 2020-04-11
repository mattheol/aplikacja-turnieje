import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { tap } from "rxjs/operators";
import { TournamentDTO } from "../models/tournament";
import { Match } from '../models/match';

@Injectable({
  providedIn: "root",
})
export class UserService {
  private url = environment.basicUrl + "/users";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
    // .pipe(tap((_) => console.log("fetched users")));
  }

  getUserTournaments(): Observable<TournamentDTO[]> {
    return this.http.get<TournamentDTO[]>(`${environment.basicUrl}/my-tournaments`);
  }

  getUserMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${environment.basicUrl}/my-matches`);
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
}
