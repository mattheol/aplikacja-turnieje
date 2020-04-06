import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-my-tournaments",
  templateUrl: "./my-tournaments.component.html",
  styleUrls: ["./my-tournaments.component.css"],
})
export class MyTournamentsComponent implements OnInit {
  private userId: Number;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUsers().subscribe((users) => {
      this.userId = users[1].id;
      this.userService
        .getUserTournaments(this.userId)
        .subscribe((tournaments) => console.log(tournaments));
    });
  }
}
