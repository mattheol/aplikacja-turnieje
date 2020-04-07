import { Tournament } from './../models/tournament';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TournamentService {
  private url = environment.basicUrl + "/tournaments";

  constructor(private http: HttpClient) {}

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.url);
  }

  getTournament(id: Number): Observable<Tournament> {
    return this.http.get<Tournament>(this.url + `/${id}`);
  }
  postTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>(this.url, tournament);
  }
}
