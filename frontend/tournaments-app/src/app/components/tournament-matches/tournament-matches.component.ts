import { Component, OnInit } from "@angular/core";
import { TournamentService } from "src/app/services/tournament.service";
import { Match } from "src/app/models/match";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-tournament-matches",
  templateUrl: "./tournament-matches.component.html",
  styleUrls: ["./tournament-matches.component.css"],
})
export class TournamentMatchesComponent implements OnInit {
  matches: Match[];
  tourId: Number;
  constructor(
    private tournamentService: TournamentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tourId = this.activatedRoute.snapshot.params["id"];
    this.getMatches();
  }

  getMatches() {
    this.tournamentService
      .getTournamentMatches(this.tourId)
      .subscribe((res) => console.log(res));
  }
}
