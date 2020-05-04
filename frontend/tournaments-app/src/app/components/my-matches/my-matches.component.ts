import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { Match } from "src/app/models/match";

@Component({
  selector: "app-my-matches",
  templateUrl: "./my-matches.component.html",
  styleUrls: ["./my-matches.component.css"],
})
export class MyMatchesComponent implements OnInit {
  public matches: Match[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUserMatches();
  }

  getUserMatches() {
    this.userService
      .getUserMatches()
      .subscribe((matches) => this.prepareMatchesArray(matches));
  }

  prepareMatchesArray(matches: Match[]) {
    this.matches = matches.sort(
      (match1, match2) =>
        new Date(match1.startTime).getTime() -
        new Date(match2.startTime).getTime()
    );
  }

  setBackgroundImg(match: Match) {
    if (!match.winnerId) {
      return "url(../../../assets/match.png)";
    } else if (match.matchParticipants[0].id == match.winnerId) {
      return "url(../../../assets/match-left.png)";
    } else {
      return "url(../../../assets/match-right.png)";
    }
  }

  // redirectToTournament(id: Number) {
  //   this.router.navigate(["/turnieje", id]);
  // }

  getLogin() {
    return JSON.parse(sessionStorage.getItem("login"));
  }

  getOpponentLogin(match: Match) {
    let participants = match.matchParticipants;
    let opponent = participants.find((u) => u.login != this.getLogin());
    return opponent.login;
  }

  getOpponentName(match: Match) {
    let participants = match.matchParticipants;
    if (participants.length === 1) {
      return "?";
    } else {
      let opponent = participants.find((u) => u.login != this.getLogin());
      return opponent.firstName + " " + opponent.lastName;
    }
  }

  getOpponentTeamName(match: Match) {
    console.log(match.matchParticipants);
  }
}
