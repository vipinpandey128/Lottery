import { NotificationService } from './../services/Notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserModel } from './Models/app.UserModel';
import { UserService } from './Services/app.UserRegistration.Service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    templateUrl: './app.UserRegistration.html',
    styleUrls: [
    ]
})


export class UserRegistrationComponent implements OnInit {
  AllUserList: UserModel[];
  errorMessage: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    "Id",
    "UserName",
    "FullName",
    "Contactno",
    "Status",
    "EditAction",
    "DeleteAction",
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
        private userService: UserService,
        private snack: NotificationService
    ) {
        this._userService = userService;
        this._snack = snack;
    }
    onSubmit() 
    {
        this._userService.SaveUser(this.UserModel).subscribe(
            response => {
               // console.log(this.UserModel);
            this.output = response
            if (this.output.StatusCode == "409") {
                this._snack.openSnackBar('User Already Exists');
            }
            else if (this.output.StatusCode == "200") {
                this._snack.openSnackBar('User Created Successfully');
                this.getAllUser();
            }
            else {
                this._snack.openSnackBar('Something Went Wrong');
            }
        });
    }

    getAllUser() {
        this._userService.GetAllUsers().subscribe(
          (allUsers) => {
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
      Delete(Id): void {
        if (confirm("Are you sure to delete User ?")) {
          this._userService.DeleteUser(Id).subscribe((response) => {
            if (response.StatusCode == "200") {
                this._snack.openSnackBar("Deleted User Successfully");
              this.getAllUser();
            } else {
                this._snack.openSnackBar("Something Went Wrong");
            }
          });
        }
      }
    
   
    
}