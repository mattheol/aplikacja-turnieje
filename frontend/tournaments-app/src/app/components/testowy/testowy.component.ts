import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-testowy',
  templateUrl: './testowy.component.html',
  styleUrls: ['./testowy.component.css']
})
export class TestowyComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void{
      this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

}
