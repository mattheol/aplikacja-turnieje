import { Component, OnInit } from "@angular/core";
import { Tournament } from "src/app/models/tournament";
import { ActivatedRoute } from "@angular/router";
import { TournamentService } from "src/app/services/tournament.service";

@Component({
  selector: "app-tournament",
  templateUrl: "./tournament.component.html",
  styleUrls: ["./tournament.component.css"]
})
export class TournamentComponent implements OnInit {
  tournament: Tournament;
  id: Number;

  constructor(
    private router: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngOnInit() {
    this.id = this.router.snapshot.params["id"];
    this.getTournament();
  }

  getTournament() {
    this.tournamentService
      .getTournament(this.id)
      .subscribe(tournament => (this.tournament = tournament));
  }
}
