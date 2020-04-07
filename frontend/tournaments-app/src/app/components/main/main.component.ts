import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import {Router} from "@angular/router"

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  isActive: boolean;
  isLoginActive: boolean;

  constructor(public tokenService:TokenStorageService,private router: Router) {}

  ngOnInit() {
    this.isActive = false;
    this.isLoginActive = false;
  }

  logout(){
    this.tokenService.signOut();
    this.router.navigate(['/home'])
  }

  isLoggedIn(){
    return sessionStorage.getItem("token")!= null;
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
