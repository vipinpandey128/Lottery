import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { TransactionAmountModel } from 'src/app/AddMoney/_model/AgentModel';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class _depositMoneyService {
  private data: any;
  private apiUrl = environment.apiEndpoint + "/api/AllTransactions";
  token: any;
  username: any;
  constructor(private http: HttpClient) {
    this.data = JSON.parse(localStorage.getItem('AgentUser'));
   // console.log(this.data);
    this.token = this.data.token;
  }

  // Deposit Money
  public DepositMoney(transactionModel: TransactionAmountModel) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.post(this.apiUrl, transactionModel, { headers: headers }).pipe(tap(data => data),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };


}

