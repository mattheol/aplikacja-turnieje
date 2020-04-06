import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"],
})
export class LoginFormComponent implements OnInit {
  @Output() onHideLogin = new EventEmitter<boolean>();

  setHideLogin() {
    this.onHideLogin.emit(true);
  }

  myForm: FormGroup;

  hide = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      login: ["", [Validators.required, Validators.minLength(5)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  get loginInput() {
    return this.myForm.get("login");
  }

  get passwordInput() {
    return this.myForm.get("password");
  }

  submit(form: FormGroupDirective) {
    this.userService
      .authenticate(
        new User(
          -1,
          null,
          null,
          null,
          this.loginInput.value,
          this.passwordInput.value,
          null,
          null,
          null,
          null,
          null
        )
      )
      .subscribe(
        (res) => {
          this.toastr.success("Udane logowanie", "", {
            positionClass: "toast-top-center",
          });
          this.setHideLogin();
        },
        (err) =>
          this.toastr.error(err.error, "", {
            positionClass: "toast-top-center",
          })
      );
  }
}
