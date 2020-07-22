import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
@Component({
    template:''
})
export class UserLogoutComponent implements OnInit
{
    constructor(private _route: Router)
    {

    }

    ngOnInit()
    {
        localStorage.removeItem('currentUser');
        this._route.navigate(['Login']);
    }
}
