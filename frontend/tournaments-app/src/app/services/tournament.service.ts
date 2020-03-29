import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tournament } from "../models/tournament";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TournamentService {
  private url = environment.basicUrl + "/tournaments";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Tournament[]> {
    console.log("adasd");
    return this.http.get<Tournament[]>(this.url);
  }
}
