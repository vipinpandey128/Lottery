import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginModel } from '../Models/app.LoginModel';
import { Router } from '@angular/router';
import{environment} from '../../../environments/environment';
import { MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    public token: string;
    actionButtonLabel: string = 'Retry';
    action: boolean = false;
    setAutoHide: boolean = true;
    autoHide: number = 2000;
    constructor(private _http: HttpClient,public snackBar: MatSnackBar, private _Route: Router)
    {

    }
    private apiUrl = environment.apiEndpoint+"/api/Authenticate/";

    public validateLoginUser(loginmodel: LoginModel)
    {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post<any>(this.apiUrl, loginmodel, { headers: headers })
            .pipe(tap(data =>
            {
                if (data.Token != null)
                {
                    if (data.Usertype == "3") {
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ username: loginmodel.Username, token: data.Token }));
                    }
                    else if (data.Usertype == "1") {
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('AdminUser', JSON.stringify({ username: loginmodel.Username, token: data.Token }));
                    }
                    else if(data.Usertype == "2")
                    {
                        localStorage.setItem('AgentUser', JSON.stringify({ username: loginmodel.Username, token: data.Token }));
                    }
                    // return true to indicate successful login
                    return data;
                } else {
                    // return false to indicate failed login
                    return null;
                }
            }),
                catchError(this.handleError)
            );
    }

    LogoutUser() {
        localStorage.removeItem('currentUser');
    }

    private handleError(error: HttpErrorResponse) {
        let config = new MatSnackBarConfig();
            config.duration = this.setAutoHide ? this.autoHide : 0;
            config.verticalPosition = this.verticalPosition;
          
        if (error.error instanceof ErrorEvent) {
              this.snackBar.open("An error occurred: "+error.error.message, this.action ? this.actionButtonLabel : undefined, config);
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            this.snackBar.open("Connection was refused!! please check server side..", this.action ? this.actionButtonLabel : undefined, config);

            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        this.snackBar.open("Something bad happened; please try again later.", this.action ? this.actionButtonLabel : undefined, config);

        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
}
