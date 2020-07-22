import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template:''
})
export class AgentLogoutComponent implements OnInit
{
    constructor(private _route: Router)
    {

    }

    ngOnInit()
    {
        localStorage.removeItem('AgentUser');
        this._route.navigate(['Login']);
    }
}
