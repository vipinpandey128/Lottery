import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../CreateUsers/Models/app.UserModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../CreateUsers/Services/app.UserRegistration.Service';
import { NotificationService } from '../services/Notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { _agentUserService } from './service/_agentUser.service';

@Component({
  selector: 'app-AgentUser',
  templateUrl: './AgentUser.component.html',
  styleUrls: ['./AgentUser.component.css'],
})
export class AgentUserComponent implements OnInit {
  AllUserList: UserModel[];
  errorMessage: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'Id',
    'UserName',
    'FullName',
    'Contactno',
    'Status',
    'CurrentBal',
    'EditAction',
    'DeleteAction',
  ];
  dataSource: any;
  UserModel: UserModel = new UserModel();
  private _userService;
  output: any;
  private _snack;
  ngOnInit(): void {
    this.getAllUser();
  }

  constructor(
    private datePipe: DatePipe,
    private _Route: Router,
    private userService: _agentUserService,
    private snack: NotificationService
  ) {
    this._userService = userService;
    this._snack = snack;
  }
  onSubmit() {
    this._userService.SaveUser(this.UserModel).subscribe((response) => {
     // console.log(this.UserModel);
      this.output = response;
      if (this.output.StatusCode == '409') {
        this._snack.openSnackBar('User Already Exists');
      } else if (this.output.StatusCode == '200') {
        this._snack.openSnackBar('User Created Successfully');
        this.getAllUser();
      } else {
        this._snack.openSnackBar('Something Went Wrong');
      }
    });
  }

  getAllUser() {
    this._userService.GetAllUsers().subscribe(
      (allUsers) => {
        console.log(allUsers);
        this.AllUserList = allUsers;
        this.dataSource = new MatTableDataSource(this.AllUserList);
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
  Delete(Id, userRefId): void {
    if (confirm('Are you sure to delete User ?')) {
      this._userService.DeleteUser(Id, userRefId).subscribe((response) => {
        if (response.StatusCode == '200') {
          this._snack.openSnackBar('Deleted User Successfully');
          this.getAllUser();
        } else {
          this._snack.openSnackBar('Something Went Wrong');
        }
      });
    }
  }

  Edit(Id, userRefId): void {
    this._userService.GetUserId(Id, userRefId).subscribe((response) => {
      //console.log(response);
      if (response!=null) {
        this.UserModel = response;
      } else {
        this._snack.openSnackBar('Something Went Wrong');
      }
    });
  }
}
