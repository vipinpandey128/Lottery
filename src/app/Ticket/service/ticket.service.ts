import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TicketModel } from './model/TicketModel';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

    private data: any;
    private betUrl = environment.apiEndpoint + "/api/Ticket";
    private gameUrl = environment.apiEndpoint + "/api/AllGames";
    token: any;
    username: any;

constructor(private http:HttpClient) { 
  this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.data.token;
}

    
    GetAllGame()
    {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this.http.get<any>(this.gameUrl, { headers: headers })
          .pipe(
              catchError(this.handleError)
          );
    }

    GetBetByCurrentUser()
    {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(this.betUrl, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    CreateBet(ticketModel:TicketModel)
    {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.betUrl, ticketModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    DeleteBet(betId, ticketNumber)
    {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.delete<any>(this.betUrl+"/"+betId+"/"+ticketNumber, { headers: headers })
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
