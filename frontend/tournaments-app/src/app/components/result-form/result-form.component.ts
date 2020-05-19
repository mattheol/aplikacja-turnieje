import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Match } from "src/app/models/match";
import { TournamentService } from "src/app/services/tournament.service";

@Component({
  selector: "app-result-form",
  templateUrl: "./result-form.component.html",
  styleUrls: ["./result-form.component.css"],
})
export class ResultFormComponent implements OnInit {
  @Output() onHideResult = new EventEmitter<boolean>();
  @Input() match: Match;
  @Input() forTeams: boolean;

  setHideResult() {
    this.onHideResult.emit(true);
  }

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private tournamentService: TournamentService
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      result: [this.match.score, [Validators.required,Validators.pattern("[0-9]+:[0-9]{1,}")]],
      winner: [, [Validators.required]],
    });
    this.match.matchParticipants[0].id;
  }

  get resultInput() {
    return this.myForm.get("result");
  }

  get winnerInput() {
    return this.myForm.get("winner");
  }

  submit(form: FormGroupDirective) {
    this.match.score = this.resultInput.value;
    this.match.winnerId = this.winnerInput.value;
    this.tournamentService
      .updateMatchScore(this.match, this.match.tournament.id)
      .subscribe(
        (res) => {
          this.toastr.success("Zapisano zmiany", "", {
            positionClass: "toast-top-center",
          });
          this.setHideResult();
        },
        (err) =>
          this.toastr.error("Coś poszło nie tak...", "", {
            positionClass: "toast-top-center",
          })
      );
  }

  isValidForm() {
    return this.resultInput.value != "" && this.resultInput.value != null && this.winnerInput.value != null;
      //||
      // this.winnerInput.value != null ||
      // (this.resultInput.value === "" && this.winnerInput.value === null)
  
  }
}
