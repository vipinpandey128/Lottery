import { TransactionTypeService } from './../services/TransactionType.service';
import { TransactionType } from './../_model/TransactionType';
import { NotificationService } from './../services/Notification.service';
import { Component, OnInit } from '@angular/core';
import { AgentModel, TransactionAmountModel } from './_model/AgentModel';
import { UserService } from '../CreateUsers/Services/app.UserRegistration.Service';
import { UserModel } from '../CreateUsers/Models/app.UserModel';
import { AddMoneyService } from './_service/AddMoney.service';

@Component({
  selector: 'app-AddMoney',
  templateUrl: './AddMoney.component.html',
  styleUrls: ['./AddMoney.component.css']
})
export class AddMoneyComponent implements OnInit {
  agentModel:AgentModel = new AgentModel();
  searchType = ["Please select Search Type","Mobile Number","User Name"];
  searchValue:number;
  userData:string;
  private _depositMoney;
  private _userService;
  private _transactionTypeService;
  userModel:UserModel = new UserModel();
  transactionType:TransactionType[];
  transactionModel:TransactionAmountModel = new TransactionAmountModel();
  constructor(private snack:NotificationService,
     private userService:UserService,private depositMoney:AddMoneyService,
      private transactionTypeService:TransactionTypeService) {
    this._userService = userService;
    this._transactionTypeService = transactionTypeService;
    this._depositMoney = depositMoney;
   }

  ngOnInit() {
    this.searchValue = 0;
    this._transactionTypeService.getTransactionType().subscribe(data=>{
      this.transactionType = data;
      //console.log(data);
    });
  }

  onSubmit()
  {
    if(this.searchValue<1 && this.userData!='')
    {
      this.snack.openSnackBar('Please select search type !!!!!!!');
    }
    else
    {
        this._userService.GetUserDetails(this.userData,this.searchValue).subscribe(userData=>{
        //console.log(userData);
        this.userModel = userData;
    });
    
    }
  }

  saveAmount()
  {
   
    if(this.userModel!=null)
    {
      this.transactionModel.UserId = this.userModel.Id;
      this.transactionModel.TransactionAmount = this.userModel.CurrentBal;
      this._depositMoney.DepositMoney(this.transactionModel).subscribe(transaction=>{
        if(transaction.StatusCode==400)
        {
          this.snack.openSnackBar("you do not have sufficient balance");
        }
        else if(transaction.StatusCode==500)
        {
          this.snack.openSnackBar("something went wrong !! please try again");
        }
        else if(transaction.StatusCode==200)
        {
          this.snack.openSnackBar("Transaction Successfully Done !!");
        }
      });
    }
  }
 
}
