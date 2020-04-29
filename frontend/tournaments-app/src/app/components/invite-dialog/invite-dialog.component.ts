import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Tournament } from 'src/app/models/tournament';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css']
})
export class InviteDialogComponent implements OnInit {
  public tournament: Tournament;
  myForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService, private toastr: ToastrService,
    public dialogRef: MatDialogRef<InviteDialogComponent>) { }

  ngOnInit() {
    this.tournament = this.data.tournament;
    this.myForm = this.fb.group({
      login: ["", [Validators.required]],
      message: ["", [Validators.required]],
    })
  }

  get loginInput() {
    return this.myForm.get("login");
  }
  get messageInput() {
    return this.myForm.get("message");
  }

  submit(form: FormGroupDirective) {
    // this.userService
    //   .postUser(
      this.userService.invite(this.myForm.get("login").value,
        {
          tournament: this.tournament,
          invitationMessage: this.myForm.get("message").value,
          invitationTime: Date.now(),
          confirmType : 'NONE'
        }
      )
      .subscribe(
        res => {
          this.toastr.success("Wysłano zaproszenie","", { positionClass:'toast-top-center'})
          this.dialogRef.close();
        
      
        },
        err => this.toastr.error(err.error,"", { positionClass:'toast-top-center'})
      );
  }

}