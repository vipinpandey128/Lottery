import { NotificationService } from './../services/Notification.service';
import { UserProfileService } from './service/user-profile.service';
import { Userprofile } from './model/userprofile';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TransactionViewModel } from '../AgentTransaction/model/TransactionModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent implements OnInit {
  UserModel:Userprofile = new Userprofile();
  dataSource: MatTableDataSource<TransactionViewModel>;
  private _userProfileService;
  output: any;
  errorMessage: any;
  AllAgentList: TransactionViewModel[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('TABLE', { static: false }) table: ElementRef;
  displayedColumns = [
    'TransactionTypeName',
    'TransactionAmount',
    'Username',
    'DateTime'
  ];
  constructor(private userprofile:UserProfileService, private snac:NotificationService)
  { 
    this._userProfileService = userprofile;
  }

  ngOnInit() : void {
     this._userProfileService.GetCurrentUser()
       .subscribe(userProfileData => this.UserModel = userProfileData);
  }

  onSubmit()
  {
    this._userProfileService.UpdateCurrentUser(this.UserModel).subscribe(
      response => {
          this.output = response
           if (this.output.StatusCode == "204") {
              this.snac.openSnackBar('User Details Updated Successfully');
          }
          else if (this.output.StatusCode == "400") {
            this.snac.openSnackBar('User Details Updated Successfully');
        }
          else {
            this.snac.openSnackBar('Something Went Wrong');
          }
      });
  }

  getAllTransactions()
  {
    this._userProfileService.GetCurrentUserTransactions().subscribe(
      (allAgentTransaction) => {
        //console.log(allAgentTransaction);
        this.AllAgentList = allAgentTransaction;
        this.dataSource = new MatTableDataSource(this.AllAgentList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },

      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

}
