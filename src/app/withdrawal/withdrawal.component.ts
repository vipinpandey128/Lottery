import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../CreateUsers/Models/app.UserModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../services/Notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { _agentUserService } from '../AgentUser/service/_agentUser.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogBalComponent } from '../components/my-loader/dialog-bal.component';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {
  animal: string;
  name: string;
 dialogConfig: MatDialogConfig;
 dialogWithForm: MatDialogRef<DialogBalComponent>; 


  AllUserList: UserModel[];
  errorMessage: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    "UserName",
    "FullName",
    "Contactno",
    "Balance",
    "Status",
    "Deposit",
    "Withdrawal"
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
        private dialogModel: MatDialog,
        private datePipe: DatePipe,
        private _Route: Router,
        private userService: _agentUserService,
        private snack: NotificationService
    ) {
        this._userService = userService;
        this._snack = snack;
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
 
    Deposit(userId)
    {
      const dialogWithForm = this.dialogModel.open(DialogBalComponent, {
        width: '250px',
        data: { animal: this.animal, lastName: this.name }
        });
       
        // When user close the dialog
        dialogWithForm.afterClosed().subscribe(result => {
        console.log('You have closed the dialog'+result);
        if (result) {
        this.animal = result.animal;
        this.name = result.name;
        }
        });
    }


    openDialog(): void {
      const dialogRef = this.dialogModel.open(DialogBalComponent, {
        width: '250px',
        data: {name: this.name, animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }
 
}
