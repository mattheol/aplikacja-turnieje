import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  isActive: boolean;
  isLoginActive: boolean;

  constructor() {}

  ngOnInit() {
    this.isActive = false;
    this.isLoginActive = false;
  }

  showRegisterForm() {
    this.isActive = true;
  }

  showLoginForm() {
    this.isLoginActive = true;
  }

  changeHide(val: boolean) {
    this.isActive = !val;
  }

  changeHideLogin(val: boolean) {
    this.isLoginActive = !val;
  }
}
