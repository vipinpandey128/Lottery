import { AgentTransactionService } from './service/agentTransaction.service';
import { NotificationService } from './../services/Notification.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionViewModel, SearchModel } from './model/TransactionModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-AgentTransaction',
  templateUrl: './AgentTransaction.component.html',
  styleUrls: ['./AgentTransaction.component.css'],
})
export class AgentTransactionComponent implements OnInit {
  dataSource: MatTableDataSource<TransactionViewModel>;
  searchModel:SearchModel = new SearchModel();
  fromminDate: Date;
  frommaxDate: Date;
  showDatepicker: boolean;
  exportbutton: boolean;
  tominDate: Date;
  tomaxDate: Date;
  private _agentTr;
  errorMessage:any;
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

  constructor(private snack:NotificationService, private agentTR: AgentTransactionService) {
    this._agentTr = agentTR;
  }

  ngOnInit(): void {

    this.fromminDate = new Date();
    this.frommaxDate = new Date();
    this.fromminDate.setDate(this.fromminDate.getDate() - 60);
    this.frommaxDate.setDate(this.frommaxDate.getDate() + 30);
    this.tominDate = new Date();
    this.tomaxDate = new Date();
    this.showDatepicker = true;
    this.exportbutton = true;
    this.getAllTransactions();
  }

  onChangeFromDate(todate: Date) {
    console.log(this.showDatepicker);
    this.showDatepicker = !this.showDatepicker;
    console.log(this.showDatepicker);
    this.tominDate = todate;
    this.tomaxDate.setDate(this.tominDate.getDate() + 60);
  }

  onSubmit() {
    console.log(this.searchModel);
    if (
      this.searchModel.fromDate == null &&
      this.searchModel.toDate == null
    ) {

      this.snack.openSnackBar('Please select valid date !!');

    }
  }

  getAllTransactions()
  {
    this._agentTr.GetAllTransactions().subscribe(
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
