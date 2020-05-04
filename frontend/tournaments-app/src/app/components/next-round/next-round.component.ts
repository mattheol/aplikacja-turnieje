import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { Match } from "src/app/models/match";
import { ActivatedRoute } from "@angular/router";
import { TournamentService } from "src/app/services/tournament.service";

@Component({
  selector: "app-next-round",
  templateUrl: "./next-round.component.html",
  styleUrls: ["./next-round.component.css"],
})
export class NextRoundComponent implements OnInit {
  @Output() onHideNextRound = new EventEmitter<boolean>();
  @Input() matches: Match[];
  newMatches;
  tournamentId;

  constructor(
    private route: ActivatedRoute,
    private tourService: TournamentService
  ) {}

  ngOnInit() {
    this.tournamentId = this.route.snapshot.params["id"];
    this.prepareMatches();
  }

  prepareMatches() {
    let array: any[] = [];
    for (let i = 0; i < this.matches.length; i++) {
      let winnerId = this.matches[i].winnerId;
      let teamWon;
      let participant;
      if (this.matches[i].teamName) {
        //forTeams
        if (winnerId == this.matches[i].matchParticipants[0].id) {
          teamWon = this.matches[i].teamName;
          participant = this.matches[i].matchParticipants[0];
        } else {
          teamWon = this.matches[i].opponentTeamName;
          participant = this.matches[i].matchParticipants[1];
        }
      } else {
        if (winnerId == this.matches[i].matchParticipants[0].id) {
          participant = this.matches[i].matchParticipants[0];
        } else {
          participant = this.matches[i].matchParticipants[1];
        }
      }
      array.push({ participant, teamWon });
    }
    let arr = [];
    let k = 0;
    for (let i = 0; i < array.length / 2; i++) {
      arr[i] = array.slice(k, k + 2);
      k += 2;
    }
    this.newMatches = arr;
  }

  saveMatches() {
    let matches: Match[];
    let stage = (Number.parseInt(this.matches[0].stage) + 1).toString();
    matches = this.newMatches.map(
      (m) =>
        new Match(
          -1,
          [m[0].participant, m[1].participant],
          null,
          null,
          m[0].teamWon ? m[0].teamWon : null,
          m[1].teamWon ? m[1].teamWon : null,
          null,
          null,
          stage,
          null
        )
    );
    this.tourService
      .saveNextRoundMatches(matches, this.tournamentId)
      .subscribe((res) => this.setHideResult());
  }

  setHideResult() {
    this.onHideNextRound.emit(true);
  }
}
