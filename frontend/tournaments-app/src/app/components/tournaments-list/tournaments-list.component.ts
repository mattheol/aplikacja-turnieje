import { Component, OnInit } from "@angular/core";
import { Tournament } from "src/app/models/tournament";
import { TournamentService } from "src/app/services/tournament.service";

@Component({
  selector: "app-tournaments-list",
  templateUrl: "./tournaments-list.component.html",
  styleUrls: ["./tournaments-list.component.css"]
})
export class TournamentsListComponent implements OnInit {
  tournaments: Tournament[];
  constructor(private tournamentService: TournamentService) {}

  ngOnInit() {
    this.getTournaments();
  }

  getTournaments(): void {
    this,
      this.tournamentService
        .getUsers()
        .subscribe(tournaments => (this.tournaments = tournaments));
  }
}
