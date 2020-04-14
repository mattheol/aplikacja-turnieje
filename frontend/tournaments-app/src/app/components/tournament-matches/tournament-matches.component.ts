import { Component, OnInit, Input } from "@angular/core";
import { TournamentService } from "src/app/services/tournament.service";
import { Match } from "src/app/models/match";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-tournament-matches",
  templateUrl: "./tournament-matches.component.html",
  styleUrls: ["./tournament-matches.component.css"],
})
export class TournamentMatchesComponent implements OnInit {
  @Input() forTeams: boolean;
  matches: Match[];
  tourId: Number;
  maxRound: Number;
  rounds: string[];
  roundMatches: Match[][];
  constructor(
    private tournamentService: TournamentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.forTeams);
    this.roundMatches = [];
    this.tourId = this.activatedRoute.snapshot.params["id"];
    this.getMatches();
  }

  getMatches() {
    this.tournamentService
      .getTournamentMatches(this.tourId)
      .subscribe((res) => {
        //console.log(res);
        this.matches = res;
        this.getMaxRound();
      });
  }

  getMaxRound() {
    let maxStage = 0;
    if (this.matches.length) {
      maxStage = parseInt(this.matches[0].stage);
      for (const match of this.matches) {
        if (parseInt(match.stage) > maxStage) {
          maxStage = parseInt(match.stage);
        }
      }
      this.rounds = Array.from(Array(maxStage), (_, i) => "Runda " + (i + 1));
      // console.log(this.rounds);
    }
    this.maxRound = maxStage;
    for (let i = 1; i <= maxStage; i++) {
      this.roundMatches.push(this.getMatchesFromRound(i));
    }
  }

  getMatchesFromRound(round: Number): Match[] {
    //console.log(round);
    return this.matches.filter((match) => match.stage === round.toString());
  }
}
