import { UserSettingsComponent } from './../user-settings/user-settings.component';
import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import {Router} from "@angular/router"
import { MatDialog } from '@angular/material';
import { UserPasswordComponent } from '../user-password/user-password.component';

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  isActive: boolean;
  isLoginActive: boolean;

  constructor(
    public tokenService:TokenStorageService,
    private router: Router,
    public dialog: MatDialog) {}

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

  openDialog(){
    window.scrollTo(0, 0);
    let dialogRef = this.dialog.open(UserSettingsComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result === "true"){
      }
    })
  }

  changePassword(){
    window.scrollTo(0, 0);
    let dialogRef = this.dialog.open(UserPasswordComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result === "true"){
          
      }
    })
  }
  
}
