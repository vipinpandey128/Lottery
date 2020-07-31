import { Component, OnInit, ViewChild } from '@angular/core';
import { AssignRemoveModel } from './Models/AssignRemoveModel';
import { UserService } from '../CreateUsers/Services/app.UserRegistration.Service';
import { UserDropdownModel } from '../CreateUsers/Models/app.UserDropdownModel';
import { RoleService } from '../RoleMaster/Services/app.role.Service';
import { RoleModel } from '../RoleMaster/Models/app.RoleModel';
import { AssignandRemoveRoleService } from './Services/app.AssignandRemoveRole.Service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AssignRolesViewModel } from './Models/AssignRolesViewModel';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    templateUrl: './app.AssignandRemoveRole.html',
    styleUrls: [
    ]
})

export class AssignRoleComponent implements OnInit {
    private _userservice;
    private _roleservice;
    private _assignandremoveservice;
    UserList: UserDropdownModel[];
    AssignRemoveModel: AssignRemoveModel = new AssignRemoveModel();
    RoleList :RoleModel[];
    buttonType : any;
    errorMessage: any;
    output: any;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['RoleName', 'UserName'];
    dataSource: any;
    AssignModel : AssignRolesViewModel[]
    offset: any;
    constructor(private userservice: UserService ,
        private roleservice :RoleService,
        private assignandremoverolerervice : AssignandRemoveRoleService,
        private _Route: Router
        ) 
        {
        this._userservice = userservice;
        this._roleservice = roleservice;
        this._assignandremoveservice = assignandremoverolerervice;
    }
    
    ngOnInit(): void 
    {
        this._userservice.GetAllUsersDropdown().subscribe(
            allUsers => {
                this.UserList = allUsers
            },
            error => this.errorMessage = <any>error
        );

        this._roleservice.GetAllRole().subscribe(
            allroles => {
                this.RoleList = allroles
            },
            error => this.errorMessage = <any>error
        );

        this._assignandremoveservice.GetAllAssignedRoles().subscribe(
            assignModel => 
            {
   
                this.dataSource = new MatTableDataSource(assignModel);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error => this.errorMessage = <any>error
        );
    }
   

    onSubmit(buttonType): void {
        if(buttonType==="onAssign") 
        {
            console.log(this.AssignRemoveModel);
            this._assignandremoveservice.AssignRole(this.AssignRemoveModel).subscribe(
                response => 
                {
                    this.output = response
                    if (this.output.StatusCode == "409") {
                        alert('Role Already Exists');
                    }
                    else if (this.output.StatusCode == "200") {
                        alert('Role Assigned Successfully');
                        this._Route.navigate(['/Assign/AllRole']);
                    }
                    else {
                        alert('Something Went Wrong');
                    }
                });


        }
        if(buttonType==="onRemove")
        {
            this._assignandremoveservice.RemoveRole(this.AssignRemoveModel).subscribe(
                response => 
                {
                    this.output = response
                    if (this.output.StatusCode == "409") {
                        alert('Role does not Exists');
                    }
                    else if (this.output.StatusCode == "200") {
                        alert('Role Removed Successfully');
                        this._Route.navigate(['/Assign/AllRole']);
                    }
                    else {
                        alert('Something Went Wrong');
                    }
                });
        }

}

applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getNext(event: PageEvent) {
    this.offset = event.pageSize * event.pageIndex
    // call your api function here with the offset
    console.log(event.pageSize);
    console.log(event.pageIndex);
  }
}