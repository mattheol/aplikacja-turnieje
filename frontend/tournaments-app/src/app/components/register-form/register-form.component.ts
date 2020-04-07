import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.css"]
})
export class RegisterFormComponent implements OnInit {
  @Output() onHide = new EventEmitter<boolean>();

  setHide() {
    this.onHide.emit(true);
  }

  myForm: FormGroup;

  hide = true;

  constructor(private authService: AuthenticationService,private fb: FormBuilder, private userService: UserService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      login: ["", [Validators.required, Validators.minLength(5)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      firstname: ["", [Validators.required, Validators.minLength(2)]],
      lastname: ["", [Validators.required, Validators.minLength(2)]],
      gender: "M",
      birthday: ""
    });
  }

  @ViewChild(FormGroupDirective, { static: false })
  formDirective: FormGroupDirective;

  submit(form: FormGroupDirective) {
    // this.userService
    //   .postUser(
      this.authService.register(
        new User(
          -1,
          null,
          null,
          null,
          this.loginInput.value,
          this.passwordInput.value,
          this.firstnameInput.value,
          this.lastnameInput.value,
          this.emailInput.value,
          new Date(this.birthdayInput.value),
          this.genderInput.value
        )
      )
      .subscribe(
        res => {
          this.toastr.success("Zarejestrowano poprawnie","", { positionClass:'toast-top-center'})
          this.setHide();
        },
        err => this.toastr.error(err.error,"", { positionClass:'toast-top-center'})
      );
  }

  get emailInput() {
    return this.myForm.get("email");
  }
  get passwordInput() {
    return this.myForm.get("password");
  }
  get loginInput() {
    return this.myForm.get("login");
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
  get birthdayInput() {
    return this.myForm.get("birthday");
  }
}
