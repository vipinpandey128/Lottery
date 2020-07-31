import { _depositMoneyService } from './_service/_depositMoney.service';
import { Component, OnInit } from '@angular/core';
import {
  AgentModel,
  TransactionAmountModel,
} from '../AddMoney/_model/AgentModel';
import { UserModel } from '../CreateUsers/Models/app.UserModel';
import { TransactionType } from '../_model/TransactionType';
import { NotificationService } from '../services/Notification.service';
import { TransactionTypeService } from '../services/TransactionType.service';
import { _agentUserService } from '../AgentUser/service/_agentUser.service';

@Component({
  selector: 'app-DepositMoney',
  templateUrl: './DepositMoney.component.html',
  styleUrls: ['./DepositMoney.component.css'],
})
export class DepositMoneyComponent implements OnInit {
  agentModel: AgentModel = new AgentModel();
  searchType = ['Please select Search Type', 'Mobile Number', 'User Name'];
  searchValue: number;
  userData: string;
  private _depositMoney;
  private _userService;
  private _transactionTypeService;
  userModel: UserModel = new UserModel();
  transactionType: TransactionType[];
  transactionModel: TransactionAmountModel = new TransactionAmountModel();
  constructor(
    private snack: NotificationService,
    private userService: _agentUserService,
    private depositMoney: _depositMoneyService,
    private transactionTypeService: TransactionTypeService
  ) {
    this._userService = userService;
    this._transactionTypeService = transactionTypeService;
    this._depositMoney = depositMoney;
  }

  ngOnInit() {
    this.searchValue = 0;
    this._transactionTypeService.getTransactionType().subscribe((data) => {
      this.transactionType = data;
    });
  }

  onSubmit() {
    if (this.searchValue < 1 && this.userData != '') {
      this.snack.openSnackBar('Please select search type !!!!!!!');
    } else {
      this._userService
        .GetUserDetails(this.userData, this.searchValue)
        .subscribe((userData) => {
          if (userData == null) {
            this.snack.openSnackBar('No User Found !!!!');
          } else {
            this.userModel = userData;
          }
        });
    }
  }

  saveAmount() {
    if (this.userModel != null) {
      this.transactionModel.UserId = this.userModel.Id;
      this.transactionModel.CurrentBal = this.userModel.CurrentBal;
      this._depositMoney
        .DepositMoney(this.transactionModel)
        .subscribe((transaction) => {
          if (transaction.StatusCode == 400) {
            this.snack.openSnackBar('you do not have sufficient balance');
          } else if (transaction.StatusCode == 500) {
            this.snack.openSnackBar('something went wrong !! please try again');
          } else if (transaction.StatusCode == 200) {
            this.snack.openSnackBar('Transaction Successfully Done !!');
          }
        });
    }
  }
}
