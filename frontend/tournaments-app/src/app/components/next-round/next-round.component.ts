import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { Match } from "src/app/models/match";

@Component({
  selector: "app-next-round",
  templateUrl: "./next-round.component.html",
  styleUrls: ["./next-round.component.css"],
})
export class NextRoundComponent implements OnInit {
  @Output() onHideNextRound = new EventEmitter<boolean>();
  @Input() matches: Match[];

  ngOnInit() {
    console.log(this.matches);
  }

  setHideResult() {
    this.onHideNextRound.emit(true);
  }

  constructor() {}
}
