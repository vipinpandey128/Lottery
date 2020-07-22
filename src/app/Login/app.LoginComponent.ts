import { throwError } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginModel } from "./Models/app.LoginModel";
import { LoginService } from "./Services/app.LoginService";
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
 
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  templateUrl: "./app.login.html",
  styleUrls: [],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    localStorage.clear();
  }
  private _loginservice;
  output: any;

  actionButtonLabel: string = "Retry";
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  horizontalPosition: MatSnackBarHorizontalPosition = "center";

  constructor(
    private _Route: Router,
    public snackBar: MatSnackBar,
    loginservice: LoginService
  ) {
    this._loginservice = loginservice;
  }

  LoginModel: LoginModel = new LoginModel();

  onSubmit() {
    let config = new MatSnackBarConfig();
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.verticalPosition = this.verticalPosition;
    this._loginservice
      .validateLoginUser(this.LoginModel)
      .subscribe((response) => {
        if (response.Token == null && response.Usertype == "0") {
          this.snackBar.open(
            "Invalid Username and Password",
            this.action ? this.actionButtonLabel : undefined,
            config
          );
          this._Route.navigate(["Login"]);
        }

        if (response.Usertype == "1") {
          
          this.snackBar.open(
            "Logged in Successfully",
            this.action ? this.actionButtonLabel : undefined,
            config
          );

          this._Route.navigate(["/Admin/Dashboard"]);
        }

        if (response.Usertype == "2") {
          this.snackBar.open(
            "Logged in Successfully",
            this.action ? this.actionButtonLabel : undefined,
            config
          );
          this._Route.navigate(["/Agent/Dashboard"]);
        }
        if (response.Usertype == "3") {

          this.snackBar.open(
            "Logged in Successfully",
            this.action ? this.actionButtonLabel : undefined,
            config
          );
          this._Route.navigate(["/User/Dashboard"]);
        }
      });
  }
}
