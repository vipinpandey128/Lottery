import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../CreateUsers/Models/app.UserModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../services/Notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { _agentUserService } from '../AgentUser/service/_agentUser.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogBalComponent } from '../components/my-loader/dialog-bal.component';
import { TransactionAmountModel } from '../AddMoney/_model/AgentModel';
import { _depositMoneyService } from '../DepositMoney/_service/_depositMoney.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css'],
})
export class WithdrawalComponent implements OnInit {
  amount: number;
  pin: number;
  agentBal:number;
  dialogConfig: MatDialogConfig;
  dialogWithForm: MatDialogRef<DialogBalComponent>;
  private _depositMoney;
  transactionModel: TransactionAmountModel = new TransactionAmountModel();
  AllUserList: UserModel[];
  errorMessage: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'UserName',
    'FullName',
    'Contactno',
    'Balance',
    'Status',
    'Deposit',
    'Withdrawal',
  ];
  dataSource: any;
  UserModel: UserModel = new UserModel();
  private _userService;
  output: any;
  private _snack;
  ngOnInit(): void {
    this.getAllUser();
    this.userBalance();
  }

  constructor(
    private dialogModel: MatDialog,
    private datePipe: DatePipe,
    private _Route: Router,
    private userService: _agentUserService,
    private snack: NotificationService,
    private depositMoney: _depositMoneyService
  ) {
    this._userService = userService;
    this._snack = snack;
    this._depositMoney = depositMoney;
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

  userBalance()
  {
    this._userService.GetAgentBal().subscribe(
      (agentBalance) => {
         this.agentBal = agentBalance;
      },

      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Deposit(userId,trType) {
    const dialogWithForm = this.dialogModel.open(DialogBalComponent, {
      width: '250px',
      data: { amount: this.amount, pin: this.pin },
    });

    // When user close the dialog
    dialogWithForm.afterClosed().subscribe((result) => {
      if (result) {
        console.log('result', result);
        this.amount = result.amount;
        this.pin = result.pin;

        this.transactionModel.UserId = userId;
        this.transactionModel.pin = result.pin;
        this.transactionModel.TransactionAmount = result.amount;
        this.transactionModel.TransactionTypeId =trType;
        console.log(this.transactionModel);
        this._depositMoney
          .DepositMoney(this.transactionModel)
          .subscribe((transaction) => {
            if (transaction.StatusCode == 400) {
              this.snack.openSnackBar('you do not have sufficient balance');
            } else if (transaction.StatusCode == 500) {
              this.snack.openSnackBar(
                'something went wrong !! please try again'
              );
            }
           else if (transaction.StatusCode == 401) {
            this.snack.openSnackBar(
              'Unauthorized User !! Please Enter Valid Pin'
            );
          } else if (transaction.StatusCode == 200) {
              this.snack.openSnackBar('Transaction Successfully Done !!');
              this.getAllUser();
              this.userBalance();
            }
          });
      }
    });
  }
}
