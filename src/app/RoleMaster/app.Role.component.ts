import { Component } from '@angular/core';
import { RoleModel } from './Models/app.RoleModel';
import { RoleService } from './Services/app.role.Service';
import { Router } from '@angular/router';

@Component({
    templateUrl : './app.Role.html',
    styleUrls: [
    
]
})

export class RoleComponent
{
    private _roleService;
    RoleModel : RoleModel = new RoleModel();
    output: any;

    constructor(private _Route: Router, roleService :RoleService ){
        this._roleService = roleService;
    }

    onSubmit() 
    {
       

        this._roleService.AddRole(this.RoleModel).subscribe(
            response => {
            this.output = response
            if (this.output.StatusCode == "409") {
                alert('Role Already Exists');
            }
            else if (this.output.StatusCode == "200") {
                alert('Role Saved Successfully');
                this._Route.navigate(['/Role/All']);
            }
            else {
                alert('Something Went Wrong');
            }
        });
    }

}