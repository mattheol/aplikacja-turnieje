import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Match } from 'src/app/models/match';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.css']
})
export class MyMatchesComponent implements OnInit {
  public matches: Match[];
  
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserMatches();
  }

 getUserMatches() {
    this.userService
      .getUserMatches()
      .subscribe(matches => this.prepareMatchesArray(matches));
  }

  prepareMatchesArray(matches :Match[]){
    this.matches = matches.sort((match1, match2)=> (new Date(match1.startTime).getTime() - new Date(match2.startTime).getTime()));
  }

  // redirectToTournament(id: Number) {
  //   this.router.navigate(["/turnieje", id]);
  // }

  getLogin(){
    return sessionStorage.getItem('login');
  }

  getOpponentLogin(match : Match){
    let participants = match.matchParticipants;
    let opponent = participants.find(u=>u.login!=this.getLogin());
    return opponent.login;
  }

}
