import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { Match } from "src/app/models/match";
const chunk = 5;

@Component({
  selector: "app-my-matches",
  templateUrl: "./my-matches.component.html",
  styleUrls: ["./my-matches.component.css"],
})
export class MyMatchesComponent implements OnInit {
  matches: Match[];
  pages : number[]=[];
  currentPage :number;
  pageMatches:any=[];
  currentMatches: Match[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUserMatches();
  }

  getUserMatches() {
    this.userService
      .getUserMatches()
      .subscribe((matches) => {
        this.currentMatches = []
        this.pageMatches= []
        this.pages =[]
        this.prepareMatchesArray(matches)
        for (let i=0;i<this.matches.length; i+=chunk) {
          this.pageMatches.push(this.matches.slice(i,i+chunk))
        }
        for(let j=0;j<this.pageMatches.length;j++){
          this.pages.push(j+1)
        }
        this.currentMatches=this.pageMatches[0] ;   
        this.currentPage = 0;

      })
     ;
  }

  changePage(page){
    this.currentPage = page-1
    this.currentMatches=this.pageMatches[page-1];    
  }

  prepareMatchesArray(matches: Match[]) {
    this.matches = matches.sort(
      (match1, match2) =>
        new Date(match1.startTime).getTime() -
        new Date(match2.startTime).getTime()
    );
  }

  setBackgroundImg(match: Match) {
    if (!match.winnerId) {
      return "url(../../../assets/match.png)";
    } else if (match.matchParticipants[0].id === match.winnerId  ) {
      return "url(../../../assets/match-left.png)";
    } else {
      return "url(../../../assets/match-right.png)";
    }
  }

  // redirectToTournament(id: Number) {
  //   this.router.navigate(["/turnieje", id]);
  // }

  getLogin() {
    return JSON.parse(sessionStorage.getItem("login"));
  }

  getOpponentLogin(match: Match) {
    let participants = match.matchParticipants;
    let opponent = participants.find((u) => u.login != this.getLogin());
    return opponent.login;
  }

  getOpponentName(match: Match) {
    let participants = match.matchParticipants;
    if (participants.length === 1) {
      return "?";
    } else {
      let opponent = participants.find((u) => u.login != this.getLogin());
      return opponent.firstName + " " + opponent.lastName;
    }
  }


  getScoreLeft(match: Match){
    let s = match.score
    if(s !== null ){
      let k = s.split(":");
      return k[0]
    }
  }

  getScoreRight(match: Match){
    let s = match.score
    if(s !== null ){
      let k = s.split(":");
      return k[1]
    }
  }
}
