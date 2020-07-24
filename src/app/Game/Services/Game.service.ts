import { GameModel } from './../Models/GameModel';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AssignRolesViewModel } from 'src/app/AssignRole/Models/AssignRolesViewModel';
import { tap, catchError } from 'rxjs/operators';
import { AssignRemoveModel } from 'src/app/AssignRole/Models/AssignRemoveModel';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private data: any;
  private apiUrl = environment.apiEndpoint + "/api/AllGames/";
  token: any;
  username: any;

  constructor(private http: HttpClient) {
    this.data = JSON.parse(localStorage.getItem('AdminUser'));
    this.token = this.data.token;
  }

    

  // Allgames
  public getAllGamesAsync(): Observable<any> {
    let apiUrl = this.apiUrl;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.get<Observable<any>>(apiUrl, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete games
  public deleteGameByID(gameId:number) {
    let apiUrl = environment.apiEndpoint + gameId;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.delete<any>(apiUrl, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get By ID games
  public getGameByID(gameId:number) {
    let apiUrl = environment.apiEndpoint + gameId;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.get<any>(apiUrl, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Add Game
  public AddGame(assignmodel: GameModel) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.post<any>(this.apiUrl, assignmodel, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update Game
  public UpdateGame(assignmodel: GameModel) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http.put<any>(this.apiUrl+assignmodel.GameId, assignmodel, { headers: headers })
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
