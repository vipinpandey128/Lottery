import { NotificationService } from './../services/Notification.service';
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
@Component({
    template:''
})
export class UserLogoutComponent implements OnInit
{
    constructor(private _route: Router, private snack:NotificationService)
    {

    }

    ngOnInit()
    {
        //localStorage.removeItem('currentUser');
        localStorage.removeItem('AdminUser');
        this.snack.openSnackBar('You Are Logged Out Successfully.....');
        this._route.navigate(['Login']);
    }
}
