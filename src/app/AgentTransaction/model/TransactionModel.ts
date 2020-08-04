export interface TransactionViewModel {
  GameName:string;
  BetNumber:number;
  BetAmount:number;
  WinPer:number;
  TransactionTypeName:string;
  TransactionAmount:number;
  Username:string;
  DateTime:Date;
  SchemeName:string;
}

export class SearchModel{
    fromDate:Date;
    toDate:Date;
}
