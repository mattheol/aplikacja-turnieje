import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import { TournamentService } from "src/app/services/tournament.service";
import { Tournament } from "src/app/models/tournament";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";

@Component({
  selector: "tournament-form",
  templateUrl: "./tournament-form.component.html",
  styleUrls: ["./tournament-form.component.css"],
})
export class TournamentFormComponent implements OnInit {
  RandomBracketchecked: boolean = false;
  Teamschecked: boolean = false;
  minDate = new Date();

  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5)]],
      description: ["", [Validators.required, Validators.minLength(5)]],
      numberOfPlayers: ["", [Validators.required]],
      enrollmentEnd: [[Validators.required]],
     // isPrivate: ["", [Validators.required]],
      type: ["", [Validators.required]],
      randomBracket: "",
      isForTeams: "",
    });
  }

  @ViewChild(FormGroupDirective, { static: false })
  formDirective: FormGroupDirective;

  submit(form: FormGroupDirective) {
    this.tournamentService
      .postTournament(
        this.tokenStorageService.getUser(),
        new Tournament(
          -1,
          [],
          null,
          null,
          this.nameInput.value,
          null,
          this.numberOfPlayersInput.value,
          this.descriptionInput.value,
          null,
          this.isForTeamsInput,
          this.typeInput.value,
          null,
          new Date(this.enrollmentEndInput.value)
        )
      )
      .subscribe(
        (res) => {
          this.toastr.success("Dodano turniej", "", {
            positionClass: "toast-top-center",
          });
          this.redirectToTournament(res.id);
        },
        (err) =>
          this.toastr.error(err.error, "", {
            positionClass: "toast-top-center",
          })
      );
  }

  redirectToTournament(id: Number): void {
    this.router.navigate(["/turnieje", id]);
  }

  get nameInput() {
    return this.myForm.get("name");
  }
  get descriptionInput() {
    return this.myForm.get("description");
  }
  get enrollmentEndInput() {
    var date = new Date(this.myForm.get("enrollmentEnd").value);
    date.setSeconds(0);
    this.myForm.get("enrollmentEnd").setValue(date);
    return this.myForm.get("enrollmentEnd");
  }
  get typeInput() {
    return this.myForm.get("type");
  }
  get isPrivateInput() {
    return this.myForm.get("isPrivate");
  }
  get randomBracketInput() {
    return this.RandomBracketchecked;
  }
  get isForTeamsInput() {
    return this.Teamschecked;
  }
  get numberOfPlayersInput() {
    return this.myForm.get("numberOfPlayers");
  }

  changeValueRandom(value) {
    this.RandomBracketchecked = !value;
  }

  changeValueTeams(value) {
    this.Teamschecked = !value;
  }
}
