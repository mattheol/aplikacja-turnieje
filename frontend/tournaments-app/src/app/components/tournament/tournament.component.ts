import { Component, OnInit } from "@angular/core";
import { Tournament } from "src/app/models/tournament";
import { ActivatedRoute } from "@angular/router";
import { TournamentService } from "src/app/services/tournament.service";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material";
import { TournamentAcceptationComponent } from "../tournament-acceptation/tournament-acceptation.component";
import { InviteDialogComponent } from '../invite-dialog/invite-dialog.component';
import { Match } from "src/app/models/match";


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
  isOrganizer: boolean;

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
      this.isOrganizer = this.checkIfOrganizer();
    });
  }

  openDialog() {
    if (
      !this.isForTeams ||
      (this.teamName != undefined && this.teamName.length > 0)
    ) {
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

  openInvitationDialog(){
    let dialogRef = this.dialog.open(InviteDialogComponent, {data :{tournament: this.tournament}});
  }

  checkIfOrganizer() {
    let organizers = this.tournament.organizers;
    let organizer = organizers.find((u) => u.login === this.getLogin());
    if (organizer === undefined) return false;
    return true;
  }

  getLogin() {
    return JSON.parse(sessionStorage.getItem("login"));
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

  generateBracket() {
    if (this.tournament.participants.length >= 2) {
      let copy = this.tournament.participants.slice();
      let shuffledPlayers = this.shuffle(copy);
      let matches = [];
      let stop = false;
      let j = 2;
      let p = 1;
      while (!stop) {
        j = Math.pow(2, p);
        if (j >= shuffledPlayers.length) {
          stop = true;
        }
        p++;
      }
      let numberOFMatches = j / 2;
      let matchNumber = 0;
      do {
        if (numberOFMatches - matchNumber < shuffledPlayers.length) {
          let player1 = shuffledPlayers.shift();
          let player2 = shuffledPlayers.shift();
          matches.push(
            new Match(
              -1,
              [player1.participant, player2.participant],
              null,
              null,
              player1.teamName,
              player2.teamName,
              null,
              null,
              "1",
              null
            )
          );
        } else {
          let player = shuffledPlayers.shift();
          matches.push(
            new Match(
              -1,
              [player.participant],
              null,
              player.participant.id,
              player.teamName,
              "?",
              "1:0",
              null,
              "1",
              null
            )
          );
        }
        matchNumber++;
      } while (matchNumber !== numberOFMatches);
      this.tournamentService
        .saveFirstRoundMatches(matches, this.id)
        .subscribe((res) => window.location.reload());
    }
  }

  shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  checkIfOrganizer() {
    let organizers = this.tournament.organizers;
    let organizer = organizers.find(
      (u) => u.login === JSON.parse(sessionStorage.getItem("login"))
    );
    if (organizer === undefined) return false;
    return true;
  }
}
