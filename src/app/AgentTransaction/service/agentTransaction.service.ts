import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { TransactionViewModel } from '../model/TransactionModel';

@Injectable({
  providedIn: 'root',
})
export class AgentTransactionService {

  private data: any;
  private apiUrl = environment.apiEndpoint + "/api/AgentTransaction";
  token: any;
  username: any;

  constructor(private http: HttpClient) {
    this.data = JSON.parse(localStorage.getItem('AgentUser'));
        this.token = this.data.token;
  }

   // Get All Transaction
   public GetAllTransactions() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    console.log(headers.getAll);
    return this.http.get<TransactionViewModel[]>(this.apiUrl, { headers: headers }).pipe(tap(data => data),
        catchError(this.handleError)
    );
}



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
      //  console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
       // console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
};
}
