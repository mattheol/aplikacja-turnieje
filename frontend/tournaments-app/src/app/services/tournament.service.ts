import { Tournament } from "./../models/tournament";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: "root",
})
export class TournamentService {
  private url = environment.basicUrl + "/tournaments";

  constructor(private http: HttpClient) {}

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.url,httpOptions);
  }

  getTournament(id: Number): Observable<Tournament> {
    return this.http.get<Tournament>(this.url + `/${id}`,httpOptions);
  }
  postTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>(this.url, tournament);
  }
}
