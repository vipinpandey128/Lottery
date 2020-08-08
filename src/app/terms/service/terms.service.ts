import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TermsService {
  private data: any;
    private apiUrl = environment.apiEndpoint + "/api/UserProfile/terms";
    token: any;
    username: any;
    constructor(private http: HttpClient) {
    this.data = JSON.parse(localStorage.getItem('AdminUser'));
    if(this.data==null)
    {
      this.data = JSON.parse(localStorage.getItem('AgentUser'));
    }
    if(this.data==null)
    {
      this.data = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.token = this.data.token;
}

public UpdateTerm() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.get<any>(this.apiUrl, { headers: headers })
        .pipe(
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
