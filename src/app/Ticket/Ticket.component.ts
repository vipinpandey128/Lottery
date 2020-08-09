import { NotificationService } from './../services/Notification.service';
import { TicketService } from './service/ticket.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameViewModel } from '../Game/Models/GameViewModel';
import { BetTransactionModel } from './service/model/TicketModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-Ticket',
  templateUrl: './Ticket.component.html',
  styleUrls: ['./Ticket.component.css']
})
export class TicketComponent implements OnInit {
  betForm: FormGroup;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  private _gameService;
  gameViewModel:GameViewModel;
  AllBetTransaction: BetTransactionModel[];
  errorMessage: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'GameName',
    'BetNumber',
    'TicketNumber',
    'BetAmount',
    'CreatedDate',
    // 'EditAction',
    // 'DeleteAction',
  ];
  dataSource: any;
  action: boolean = false;
  output: any;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  ///constructor created and initializing properties
  constructor(private snack:NotificationService,private ticketService:TicketService) { 
    this._gameService = ticketService;
    this.betForm = new FormGroup({
      betNumber: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$"),
      Validators.minLength(1),Validators.maxLength(2)]),
      betAmount: new FormControl('', [Validators.required]),
      GameId: new FormControl('')
    });
  }

  ngOnInit() {
    this.getAllGame();
    this.getTransaction();
  }

  getAllGame(){
    this._gameService.GetAllGame().subscribe(response=>{
      this.gameViewModel = response;
      console.log(this.gameViewModel);
    });
  }

  getTransaction()
  {
    this._gameService.GetBetByCurrentUser().subscribe(response=>{
      this.AllBetTransaction = response;
      this.dataSource = new MatTableDataSource(this.AllBetTransaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      console.log(this.gameViewModel);
    });
  }

  onSubmit(GameId)
  {
    this.betForm.value.GameId=GameId
    if(!this.betForm.invalid)
    {
      if((this.betForm.value.betNumber>0 && this.betForm.value.betNumber<50))
      {
        if(this.betForm.value.betAmount>0 && (this.betForm.value.betAmount%100==0))
        {
          this._gameService.CreateBet(this.betForm.value).subscribe(response=>{
            if(response.StatusCode==201)
            {
              this.snack.openSnackBar('सट्टेबाजी सफलतापूर्वक बनाई गई है....');
            }
            else if(response.StatusCode==204)
            {
              this.snack.openSnackBar('आपके पास पर्याप्त राशि नहीं है ....');
            }else if(response.StatusCode==200)
            {
              this.snack.openSnackBar('फिर से कोशिश करें || हमें कुछ तकनीकी समस्या मिली....');
            }
            else
            {
              this.snack.openSnackBar('अनधिकृत अनुरोध....');
            }
          });
        }
        else
        {
          this.snack.openSnackBar("बेट अमाउंट 100,200,300,400,500 इस तरह से होनी चाहिए |");
        }
      }
      else
      {
        this.snack.openSnackBar("बेटिंग नंबर 0 से लेकर 50 तक होनी चाहिए |");
      }
    }
    else
    {
      this.snack.openSnackBar('Please fill the required fields..');
      return;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
