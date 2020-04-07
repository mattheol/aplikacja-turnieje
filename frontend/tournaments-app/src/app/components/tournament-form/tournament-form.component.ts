import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { TournamentService } from 'src/app/services/tournament.service';
import { Tournament } from 'src/app/models/tournament';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.css']
})
export class TournamentFormComponent implements OnInit {
  @Output() onHide = new EventEmitter<boolean>();

  setHide() {
    this.onHide.emit(true);
  }
  
  myForm: FormGroup;
  constructor(private fb: FormBuilder, private tournamentService: TournamentService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5)]],
      description: ["", [Validators.required, Validators.minLength(5)]],
      numberOfPlayers :["", [Validators.required]],
      enrollmentEnd: [ [Validators.required]],
      isPrivate: ["", [Validators.required]],
      type: ["", [Validators.required]],
      randomBracket: Boolean,
      isForTeams:Boolean
    });
  }

  @ViewChild(FormGroupDirective, { static: false })
  formDirective: FormGroupDirective;
  
  submit(form: FormGroupDirective) {
    this.tournamentService
      .postTournament(
        new Tournament(
          -1,
          null,
          null,
          null,
          this.nameInput.value,
          this.isPrivateInput.value,
          this.numberOfPlayersInput.value,
          this.descriptionInput.value,
          this.randomBracketInput.value,
          this.isForTeamsInput.value,
          this.typeInput.value,
          null,
          new Date(this.enrollmentEndInput.value),
        )
      )
      .subscribe(
        res => {
          this.toastr.success("Dodano turniej","", { positionClass:'toast-top-center'})
          this.setHide();
        },
        err => this.toastr.error(err.error,"", { positionClass:'toast-top-center'})
      );

  }
  
  get nameInput() {
    return this.myForm.get("name");
  }
  get descriptionInput() {
    return this.myForm.get("description");
  }
  get enrollmentEndInput() {
    return this.myForm.get("enrollmentEnd");
  }
  get typeInput() {
    return this.myForm.get("type");
  }
  get isPrivateInput() {
    return this.myForm.get("isPrivate");
  }
  get randomBracketInput() {
    return this.myForm.get("randomBracket");
  }
  get isForTeamsInput() {
    return this.myForm.get("isForTeams");
  }
  get numberOfPlayersInput() {
    return this.myForm.get("numberOfPlayers");
  }
}
