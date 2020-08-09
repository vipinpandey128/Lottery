import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NotificationService } from '../services/Notification.service';
@Component({
    template: ''
})
export class AdminLogoutComponent implements OnInit
{
    constructor(private _Route: Router, private snack:NotificationService)
    {

    }
    ngOnInit() {
        //localStorage.removeItem('AdminUser');
        localStorage.clear();
        this.snack.openSnackBar('You Are Logged Out Successfully.....');
        this._Route.navigate(['Login']);
    }
}

