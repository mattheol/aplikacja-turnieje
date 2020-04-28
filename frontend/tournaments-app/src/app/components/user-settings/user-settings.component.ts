import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { stringify } from 'querystring';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

 



  myForm: FormGroup;


  constructor(private fb: FormBuilder, private us: UserService, public tokenService:TokenStorageService,
    private toastr: ToastrService,public dialogRef: MatDialogRef<UserSettingsComponent>) {this.setfirstnameInput() }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      firstname: ["", [Validators.required, Validators.minLength(2)]],
      lastname: ["", [Validators.required, Validators.minLength(2)]],
      gender: ""})

  }
  setfirstnameInput(){
    this.us.getUserData().subscribe(u =>{
      this.myForm = this.fb.group({
        email: [u.email, [Validators.required, Validators.email]],
        firstname: [u.firstName, [Validators.required, Validators.minLength(2)]],
        lastname: [u.lastName, [Validators.required, Validators.minLength(2)]],
        gender: u.gender
    });
    console.log(u.gender)
    });
}

  get emailInput() {
    return this.myForm.get("email");
  }

  get firstnameInput() {
    return this.myForm.get("firstname");
  }
  get lastnameInput() {
    return this.myForm.get("lastname");
  }
  get genderInput() {
    return this.myForm.get("gender");
  }

  submit(form: FormGroupDirective) {
    // this.userService
    //   .postUser(
      this.us.updateUser(
        new User(
          -1,
          null,
          null,
          null,
          this.tokenService.getUser(),
          null,
          this.firstnameInput.value,
          this.lastnameInput.value,
          this.emailInput.value,
          null,
          this.genderInput.value
        )
      )
      .subscribe(
        res => {
          this.toastr.success("Zmieniono poprawnie","", { positionClass:'toast-top-center'})
          this.dialogRef.close();
        
      
        },
        err => this.toastr.error(err.error,"", { positionClass:'toast-top-center'})
      );
  }

}
