import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserModel } from './Models/app.UserModel';
import { UserService } from './Services/app.UserRegistration.Service';

@Component({
    templateUrl: './app.UserRegistration.html',
    styleUrls: [
    ]
})


export class UserRegistrationComponent implements OnInit {
    UserModel: UserModel = new UserModel();
    private _userService;
    output: any;
    ngOnInit(): void {


    }

    constructor(
        private datePipe: DatePipe,
        private _Route: Router,
        private userService: UserService
    ) {
        this._userService = userService;
    }
    onSubmit() 
    {
      

        this._userService.SaveUser(this.UserModel).subscribe(
            response => {
            this.output = response
            if (this.output.StatusCode == "409") {
                alert('User Already Exists');
            }
            else if (this.output.StatusCode == "200") {
                alert('User Created Successfully');
                this._Route.navigate(['/User/All']);
            }
            else {
                alert('Something Went Wrong');
            }
        });
    }
   
    
}