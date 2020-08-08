import { Userprofile } from './../model/userprofile';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TransactionViewModel } from 'src/app/AgentTransaction/model/TransactionModel';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private data: any;
  private apiUrl = environment.apiEndpoint + '/api/UserProfile';
  token: any;
  username: any;

  constructor(private http: HttpClient) {
    let token = JSON.parse(localStorage.getItem('AgentUser'));
    if (token == null) {
      token = JSON.parse(localStorage.getItem('AdminUser'));
    } if (token == null) {
      token = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.token = token.token;
  }

  // Get User Profile
  public GetCurrentUser() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    console.log(this.apiUrl);
    return this.http.get<Userprofile[]>(this.apiUrl, { headers: headers }).pipe(tap(data => data),
        catchError(this.handleError)
    );
}

// Update User Profile
public UpdateCurrentUser(userprofile:Userprofile) {
  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
  console.log(this.apiUrl);
  console.log(userprofile);
  return this.http.put(this.apiUrl+"/"+userprofile.Id, userprofile, { headers: headers }).pipe(tap(data => data),
      catchError(this.handleError)
  );
}

// Get All Transaction
public GetCurrentUserTransactions() {
  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
  console.log(headers.getAll);
  return this.http.get<TransactionViewModel[]>(this.apiUrl+"/GetUserTransaction", { headers: headers }).pipe(tap(data => data),
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
