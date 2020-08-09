import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/Notification.service';

@Component({
  template:''
})
export class AgentLogoutComponent implements OnInit
{
    constructor(private _route: Router, private snack:NotificationService)
    {

    }

    ngOnInit()
    {
        // localStorage.removeItem('AgentUser');
        localStorage.clear();
        this.snack.openSnackBar('You Are Logged Out Successfully.....');
        this._route.navigate(['Login']);
        
    }
}
