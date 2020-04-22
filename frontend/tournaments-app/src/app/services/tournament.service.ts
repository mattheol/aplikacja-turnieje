import { Tournament, TournamentDTO } from "./../models/tournament";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Match } from "../models/match";
import { User } from "../models/user";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class TournamentService {
  private url = environment.basicUrl + "/tournaments";

  constructor(private http: HttpClient) {}

  getTournaments(): Observable<TournamentDTO[]> {
    return this.http.get<TournamentDTO[]>(this.url, httpOptions);
  }

  getTournament(id: Number): Observable<Tournament> {
    return this.http.get<Tournament>(this.url + `/${id}`, httpOptions);
  }

  postTournament(
    login: string,
    tournament: Tournament
  ): Observable<Tournament> {
    return this.http.post<Tournament>(this.url, tournament);
  }

  getTournamentMatches(id: Number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.url}/${id}/matches`, httpOptions);
  }

  updateMatchScore(match: Match, idTour: number): Observable<void> {
    const params = new HttpParams().set("idTour", idTour.toString());
    return this.http.put<void>(`${environment.basicUrl}/matches`, match, {
      params,
    });
  }

  enrollUserToTournament(
    login: string,
    idTour: number,
    teamName: string
  ): Observable<void> {
    const params = new HttpParams()
      .set("idTour", idTour.toString())
      .set("teamName", teamName);

    return this.http.post<void>(
      `${environment.basicUrl}/enroll`,
      {},
      {
        params,
      }
    );
  }

  disenrollUserFromTournament(
    login: string,
    idTour: number,
    teamName: string
  ): Observable<void> {
    const params = new HttpParams()
      .set("idTour", idTour.toString())
      .set("teamName", teamName);

    return this.http.delete<void>(`${environment.basicUrl}/disenroll`, {
      params,
    });
  }
}
