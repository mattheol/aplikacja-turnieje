import { Component, OnInit } from "@angular/core";
import { TournamentDTO } from "src/app/models/tournament";
import { TournamentService } from "src/app/services/tournament.service";

const chunk = 6;

@Component({
  selector: "app-tournaments-list",
  templateUrl: "./tournaments-list.component.html",
  styleUrls: ["./tournaments-list.component.css"],
})
export class TournamentsListComponent implements OnInit {
  tournaments: TournamentDTO[];
  pages : number[]=[];
  currentPage :number;
  pageTournaments:any=[];
  currentTournaments: TournamentDTO[];


  constructor(private tournamentService: TournamentService) {}

  ngOnInit() {
    this.getTournaments();
  }

  getTournaments(): void {
    this,
      this.tournamentService.getTournaments().subscribe((tournaments) => {
        this.currentTournaments = []
        this.pageTournaments= []
        this.pages =[]
        this.tournaments = tournaments;
        for (let i=0;i<this.tournaments.length; i+=chunk) {
          this.pageTournaments.push(this.tournaments.slice(i,i+chunk))
        }
        for(let j=0;j<this.pageTournaments.length;j++){
          this.pages.push(j+1)
        }
        this.currentTournaments=this.pageTournaments[0] ;   
        this.currentPage = 0;
      });
  }

  changePage(page){
    this.currentPage = page-1
    this.currentTournaments=this.pageTournaments[page-1];    
  }
}
