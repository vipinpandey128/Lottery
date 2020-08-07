import { IpAddressService } from './../services/IpAddress.service';
import { NotificationService } from './../services/Notification.service';
import { throwError } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginModel } from "./Models/app.LoginModel";
import { LoginService } from "./Services/app.LoginService";
 
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  templateUrl: "./app.login.html",
  styleUrls: ['./app.login.css'],
})
export class LoginComponent implements OnInit {
  
  private _loginservice;
  private _ip;
  output: any;
  ipAddress='';

  constructor(
    private _Route: Router,
    public snackBar: NotificationService,
    loginservice: LoginService,
    ip: IpAddressService
  ) {
    this._loginservice = loginservice;
    this._ip = ip;
  }

  LoginModel: LoginModel = new LoginModel();

  ngOnInit(): void {
    localStorage.clear();
    this._ip.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;
     // console.log(res.ip); 
    }); 
  }

  onSubmit() {
    this.LoginModel.IpAddress = this.ipAddress;
    this._loginservice
      .validateLoginUser(this.LoginModel)
      .subscribe((response) => {                                       
        console.log(response);
        if (response.Token == null && response.Usertype == "0") {
          this.snackBar.openSnackBar(
            "Invalid Username and Password"
          );
          this._Route.navigate(["Login"]);
        }

        if (response.Status==false) {
          this.snackBar.openSnackBar(
            "User is deactivated !! contact to admin..."
          );
          this._Route.navigate(["Login"]);
        }

        if (response.Usertype == "1") {
          
          this.snackBar.openSnackBar(
            "Logged in Successfully"
          );

          this._Route.navigate(["/Admin/Dashboard"]);
        }

        if (response.Usertype == "2") {
          this.snackBar.openSnackBar(
            "Logged in Successfully"
          );
          this._Route.navigate(["/Agent/Dashboard"]);
        }
        if (response.Usertype == "3") {

          this.snackBar.openSnackBar(
            "Logged in Successfully"
          );
          this._Route.navigate(["/Client/Dashboard"]);
        }
      });
  }
}
