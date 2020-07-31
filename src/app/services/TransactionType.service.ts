import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TransactionType } from '../_model/TransactionType';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {

  private data: any;
  token: any;
  username: any;

  constructor(private http: HttpClient) {
    this.data = JSON.parse(localStorage.getItem('AdminUser'));
    if(this.data==null || this.data=='')
    {
      this.data = JSON.parse(localStorage.getItem('AgentUser'));
    }
    this.token = this.data.token;
  }


public getTransactionType()  
  {  
    let apiUrl = environment.apiEndpoint + "/api/TransactionTypes";
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.get<TransactionType[]>(apiUrl, { headers: headers }).pipe(tap(data => data),
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
