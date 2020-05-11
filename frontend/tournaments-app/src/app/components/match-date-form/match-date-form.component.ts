import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { Match } from "src/app/models/match";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { TournamentService } from "src/app/services/tournament.service";

@Component({
  selector: "app-match-date-form",
  templateUrl: "./match-date-form.component.html",
  styleUrls: ["./match-date-form.component.css"],
})
export class MatchDateFormComponent implements OnInit {
  @Output() onHideDateMatch = new EventEmitter<boolean>();
  @Input() match: Match;
  @Input() forTeams: boolean;
  minDate = new Date();
  myForm: FormGroup;

  setHideDateMatch() {
    this.onHideDateMatch.emit(true);
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private tournamentService: TournamentService
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      dateMatch: [
        this.match.startTime == null ? new Date() : this.match.startTime,
        [Validators.required],
      ],
    });
  }

  get dateMatchInput() {
    var date = new Date(this.myForm.get("dateMatch").value);
    date.setSeconds(0);
    this.myForm.get("dateMatch").setValue(date);
    return this.myForm.get("dateMatch");
  }

  submit() {
    this.match.startTime = new Date(this.dateMatchInput.value);
    this.tournamentService
      .updateMatchScore(this.match, this.match.tournament.id)
      .subscribe(
        (res) => {
          this.toastr.success("Zapisano zmiany", "", {
            positionClass: "toast-top-center",
          });
          this.setHideDateMatch();
        },
        (err) =>
          this.toastr.error("Coś poszło nie tak...", "", {
            positionClass: "toast-top-center",
          })
      );
  }
}
