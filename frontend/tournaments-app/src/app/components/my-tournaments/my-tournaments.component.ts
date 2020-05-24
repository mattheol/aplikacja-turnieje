import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { TournamentDTO } from "src/app/models/tournament";
import { Router } from "@angular/router";

const chunk = 5;

@Component({
  selector: "app-my-tournaments",
  templateUrl: "./my-tournaments.component.html",
  styleUrls: ["./my-tournaments.component.css"],
})
export class MyTournamentsComponent implements OnInit {
  tournaments: TournamentDTO[];
  pages: number[] = [];
  currentPage: number;
  pageTournaments: any = [];
  currentTournaments: TournamentDTO[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUserTournaments();
  }

  getUserTournaments() {
    this.userService.getUserTournaments().subscribe((tournaments) => {
      this.currentTournaments = [];
      this.pageTournaments = [];
      this.pages = [];
      this.tournaments = tournaments;
      for (let i = 0; i < this.tournaments.length; i += chunk) {
        this.pageTournaments.push(this.tournaments.slice(i, i + chunk));
      }
      for (let j = 0; j < this.pageTournaments.length; j++) {
        this.pages.push(j + 1);
      }
      this.currentTournaments = this.pageTournaments[0];
      this.currentPage = 0;
    });
  }

  changePage(page) {
    this.currentPage = page - 1;
    this.currentTournaments = this.pageTournaments[page - 1];
  }

  redirectToTournament(id: Number) {
    this.router.navigate(["/turnieje", id]);
  }
}
