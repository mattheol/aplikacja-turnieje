import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { TournamentDTO } from "src/app/models/tournament";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";

@Component({
  selector: "app-my-tournaments",
  templateUrl: "./my-tournaments.component.html",
  styleUrls: ["./my-tournaments.component.css"],
})
export class MyTournamentsComponent implements OnInit {
  private tournaments: TournamentDTO[];
  constructor(
    private userService: UserService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    let login = this.tokenStorageService.getUser();
    this.userService
      .getUserTournaments(login)
      .subscribe((tournaments) => (this.tournaments = tournaments));
  }

  redirectToTournament(id: Number) {
    this.router.navigate(["/turnieje", id]);
  }
}
