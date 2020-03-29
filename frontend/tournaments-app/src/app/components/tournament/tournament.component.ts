import { Component, OnInit } from "@angular/core";
import { Tournament } from "src/app/models/tournament";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-tournament",
  templateUrl: "./tournament.component.html",
  styleUrls: ["./tournament.component.css"]
})
export class TournamentComponent implements OnInit {
  tournament: Tournament;
  id: Number;

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.router.snapshot.params["id"];
  }
}
