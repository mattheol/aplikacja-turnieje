import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Invitation } from 'src/app/models/invitation';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invitation-detail',
  templateUrl: './invitation-detail.component.html',
  styleUrls: ['./invitation-detail.component.css']
})
export class InvitationDetailComponent implements OnInit {

  public invitation: Invitation;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private userService: UserService,private toastr: ToastrService,
  public dialogRef: MatDialogRef<InvitationDetailComponent>) { }

  ngOnInit() {
    this.invitation=this.data.invitation;
  }

  accept(){
    this.invitation.confirmType='ACCEPTED';
    this.userService.updateInvitation(this.invitation.id,this.invitation)
    .subscribe(res => {
     
      this.toastr.success("Odpowiedź została zapisana","", { positionClass:'toast-top-center'})
      this.dialogRef.close();
    
  
    },
    err => this.toastr.error(err.error,"", { positionClass:'toast-top-center'}))
  }

  reject(){
    this.invitation.confirmType='REJECTED';
    this.userService.updateInvitation(this.invitation.id,this.invitation)
      .subscribe(res => {
     
        this.toastr.success("Odpowiedź została zapisana","", { positionClass:'toast-top-center'})
        this.dialogRef.close();
      
    
      },
      err => this.toastr.error(err.error,"", { positionClass:'toast-top-center'}))
  }

}
