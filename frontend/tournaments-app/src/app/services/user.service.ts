import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private url = environment.basicUrl + "/users";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url)
      .pipe(tap((_) => console.log("fetched users")));
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  authenticate(user: User): Observable<any> {
    return this.http.post(environment.basicUrl + "/authenticate", user, {
      responseType: "text",
    });
  }
}
