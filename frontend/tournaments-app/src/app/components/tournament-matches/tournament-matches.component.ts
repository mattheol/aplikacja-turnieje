import { Component, OnInit, Input } from "@angular/core";
import { TournamentService } from "src/app/services/tournament.service";
import { Match } from "src/app/models/match";
import { ActivatedRoute } from "@angular/router";
import { Tournament } from "src/app/models/tournament";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-tournament-matches",
  templateUrl: "./tournament-matches.component.html",
  styleUrls: ["./tournament-matches.component.css"],
})
export class TournamentMatchesComponent implements OnInit {
  @Input() forTeams: boolean;
  @Input() tournament: Tournament;
  matches: Match[];
  tourId: Number;
  maxRound: number;
  rounds: string[];
  roundMatches: Match[][];
  isOrganizer: boolean;
  isResultActive: boolean;
  matchResult: Match;
  isNextRoundActive: boolean = false;
  matchesForNextRound: Match[];

  constructor(
    private tournamentService: TournamentService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.roundMatches = [];
    this.tourId = this.activatedRoute.snapshot.params["id"];
    this.getMatches();
    this.isOrganizer = this.checkIfOrganizer();
    this.isResultActive = false;
  }

  getMatches() {
    this.tournamentService
      .getTournamentMatches(this.tourId)
      .subscribe((res) => {
        //console.log(res);
        this.matches = res;
        this.getMaxRound();
      });
  }

  getMaxRound() {
    let maxStage = 0;
    if (this.matches.length) {
      maxStage = parseInt(this.matches[0].stage);
      for (const match of this.matches) {
        if (parseInt(match.stage) > maxStage) {
          maxStage = parseInt(match.stage);
        }
      }
      this.rounds = Array.from(Array(maxStage), (_, i) => "Runda " + (i + 1));
      // console.log(this.rounds);
    }
    this.maxRound = maxStage;
    for (let i = 1; i <= maxStage; i++) {
      this.roundMatches.push(this.getMatchesFromRound(i));
    }
  }

  getMatchesFromRound(round: Number): Match[] {
    //console.log(round);
    return this.matches.filter((match) => match.stage === round.toString());
  }

  getLogin() {
    return JSON.parse(sessionStorage.getItem("login"));
  }

  checkIfOrganizer() {
    let organizers = this.tournament.organizers;
    let organizer = organizers.find((u) => u.login === this.getLogin());
    if (organizer === undefined) return false;
    return true;
  }

  setBackgroundImg(match: Match) {
    if (!match.winnerId) {
      return "url(../../../assets/match.png)";
    } else if (match.matchParticipants[0].id == match.winnerId) {
      return "url(../../../assets/match-left.png)";
    } else {
      return "url(../../../assets/match-right.png)";
    }
  }

  showResultForm(match: Match) {
    this.matchResult = match;
    this.isResultActive = true;
  }

  goToNextRound() {
    let length = this.roundMatches[this.maxRound - 1].length;
    if (
      length !==
      this.roundMatches[this.maxRound - 1].filter((m) => m.winnerId !== null)
        .length
    ) {
      this.toastr.error("Wpisz wynik wszystkim meczom", "", {
        positionClass: "toast-top-center",
      });
    } else {
      console.log("organizuje mecze...");
      this.matchesForNextRound = this.roundMatches[this.maxRound - 1];
      this.isNextRoundActive = true;
    }
  }

  changeHideNextRound(val: boolean) {
    this.isNextRoundActive = !val;
  }

  changeHideResult(val: boolean) {
    this.isResultActive = !val;
  }
}
