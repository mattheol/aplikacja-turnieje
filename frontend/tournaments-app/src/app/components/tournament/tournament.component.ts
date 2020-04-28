import { Component, OnInit } from "@angular/core";
import { Tournament } from "src/app/models/tournament";
import { ActivatedRoute } from "@angular/router";
import { TournamentService } from "src/app/services/tournament.service";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material";
import { TournamentAcceptationComponent } from "../tournament-acceptation/tournament-acceptation.component";

@Component({
  selector: "app-tournament",
  templateUrl: "./tournament.component.html",
  styleUrls: ["./tournament.component.css"],
})
export class TournamentComponent implements OnInit {
  tournament: Tournament;
  id: number;
  userLogin: string;
  teamName: string;
  isUserEnrolled: boolean;
  isForTeams: boolean;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private tokenStorageService: TokenStorageService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isUserEnrolled = true;
    this.id = this.route.snapshot.params["id"];
    this.userLogin = this.tokenStorageService.getUser();
    this.getTournament();
  }

  checkIfUserIsAlreadyEnrolled() {
    if (
      this.tournament.participants.filter(
        (item) => item.participant.login === this.userLogin.toString()
      ).length !== 0
    ) {
      this.isUserEnrolled = true;
    } else {
      this.isUserEnrolled = false;
    }
  }

  getTournament() {
    this.tournamentService.getTournament(this.id).subscribe((tournament) => {
      this.tournament = tournament;
      this.checkIfUserIsAlreadyEnrolled();
      this.isForTeams = this.tournament.isForTeams;
    });
  }

  openDialog() {

    if (!this.isForTeams || this.teamName != undefined && this.teamName.length > 0) {

      let dialogRef = this.dialog.open(TournamentAcceptationComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result === "true") {
          this.enrollUser();
        }
      });
    } else
      this.toastr.warning("Nazwa drużyny jest wymagana", "", {
        positionClass: "toast-top-center",
      });
  }

  checkDate() {
    return new Date(this.tournament.enrollmentEnd) > new Date();
  }

  checkIfFull() {
    return (
      this.tournament.participants.length === this.tournament.numberOfPlayers
    );
  }

  enrollUser() {
    console.log(this.teamName);
    this.tournamentService
      .enrollUserToTournament(this.userLogin, this.id, this.teamName)
      .subscribe(
        (res) => {
          this.toastr.success("Dołączyłeś do turnieju", "", {
            positionClass: "toast-top-center",
          });
          this.getTournament();
        },
        (err) => {}
      );
  }

  disenrollUser() {
    console.log(this.teamName);
    this.tournamentService
      .disenrollUserFromTournament(this.userLogin, this.id, this.teamName)
      .subscribe(
        (res) => {
          this.toastr.success("Wypisałeś się z turnieju", "", {
            positionClass: "toast-top-center",
          });
          this.getTournament();
        },
        (err) => {}
      );
  }
}
