import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Invitation } from 'src/app/models/invitation';
import { MatDialog } from '@angular/material';
import { InvitationDetailComponent } from '../invitation-detail/invitation-detail.component';

@Component({
  selector: 'app-my-invitations',
  templateUrl: './my-invitations.component.html',
  styleUrls: ['./my-invitations.component.css']
})
export class MyInvitationsComponent implements OnInit {

  invitations: Invitation[];
  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getUserInvitations();
  }

  getUserInvitations() {
    this.userService
      .getInvitations()
      .subscribe(invitations => {

      this.invitations = invitations;
     
    });
  }

  

  openDialog(invitation : Invitation){
    window.scrollTo(0, 0);
    let dialogRef = this.dialog.open(InvitationDetailComponent,{ height: '300px',
    width: '440px', data:{invitation} });
    dialogRef.afterClosed().subscribe(() => this.getUserInvitations())
  }

}
