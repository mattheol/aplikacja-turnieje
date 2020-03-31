import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  isActive: boolean;

  constructor() {}

  ngOnInit() {
    this.isActive = false;
  }

  showRegisterForm() {
    this.isActive = true;
  }

  changeHide(val: boolean) {
    this.isActive = !val;
  }
}
