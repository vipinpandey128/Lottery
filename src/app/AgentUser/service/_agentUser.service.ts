import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserModel } from 'src/app/CreateUsers/Models/app.UserModel';
import { UserDropdownModel } from 'src/app/CreateUsers/Models/app.UserDropdownModel';

@Injectable({
  providedIn: 'root'
})
export class _agentUserService {

  private data: any;
  private apiUrl = environment.apiEndpoint + "/api/AgentUser";
  token: any;
  username: any;

  constructor(private http: HttpClient) {
      this.data = JSON.parse(localStorage.getItem('AgentUser'));
      this.token = this.data.token;
  }



    // Save User
    public SaveUser(usermodel: UserModel)
    {
       // console.log("service");
        //console.log(usermodel);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl, usermodel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Update User
    public UpdateUser(usermodel: UserModel) {
        var putUrl = this.apiUrl+"/" + usermodel.Id;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.put<any>(putUrl, usermodel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }


    // Get GetUser Details
    public GetUserDetails(searchData, filterType) {
        var userData = this.apiUrl+"/" + searchData+"/"+filterType;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<UserModel>(userData, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

     // Get MemberBy Id
     public GetUserId(Id) {
        var editUrl = this.apiUrl+"/" + Id;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<UserModel>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    // Get All Users
    public GetAllUsers() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        //console.log(this.apiUrl);
        return this.http.get<UserModel[]>(this.apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    // Get All Users
    public GetAllUsersDropdown() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<UserDropdownModel[]>(this.apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }


    // DeleteUser
    public DeleteUser(Id) {
        var deleteUrl = this.apiUrl+"/" + Id;
       // console.log("delete url-----"+deleteUrl);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.delete<any>(deleteUrl, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // GetAgentBal
    public GetAgentBal() {
        var getAgentBal = this.apiUrl+"/GetAgentBal";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(getAgentBal, { headers: headers })
            .pipe(
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

