import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { tap, map } from "rxjs/operators";
import { TournamentDTO } from "../models/tournament";
import { Match } from '../models/match';
import { Invitation } from '../models/invitation';

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

  getUser(loginVal): Observable<User> {
    let user = this.getUsers().pipe(
      map(u=>u.find(usr => usr.login))
    );
    return user;
    
    // .pipe(tap((_) => console.log("fetched users")));
  }

  getUserData(): Observable<User> {
    return this.http.get<User>(`${environment.basicUrl}/my-data`);
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
  updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${environment.basicUrl}/my-data`,user);
  }

  getInvitations():  Observable<Invitation[]>{
    return this.http.get<Invitation[]>(`${environment.basicUrl}/my-invitations`);
  }
  updateInvitation(id:number, invitation: Invitation):  Observable<any>{
    return this.http.put<any>(`${environment.basicUrl}/my-invitations/${id}`,invitation);
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<User> {
    console.log("service")
    return this.http.put<User>(`${environment.basicUrl}/my-password`,{oldPassword, newPassword});
  }

}
