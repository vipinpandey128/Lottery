import { NotificationService } from './../services/Notification.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { RoleModel } from './Models/app.RoleModel';
import { RoleService } from './Services/app.role.Service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    templateUrl : './app.Role.html',
    styleUrls: [
    
]
})

export class RoleComponent implements OnInit
{
    private _roleService;
    RoleModel : RoleModel = new RoleModel();
    output: any;
    RoleList: RoleModel = new RoleModel();
    errorMessage: any;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['RoleId', 'RoleName', 'Status', 'EditAction', 'DeleteAction'];
    dataSource: any;

    constructor(private _Route: Router, roleService :RoleService, private snackbar:NotificationService ){
        this._roleService = roleService;
    }

    ngOnInit(): void
    {
        this.getRole();
    }

    getRole()
    {
        this._roleService.GetAllRole().subscribe(
            allrole => {
                this.RoleList = allrole
                this.dataSource = new MatTableDataSource(allrole);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error => this.errorMessage = <any>error
        );
    }

    onSubmit() 
    {
        if(this.RoleModel.RoleId>0)
        {
             this.UpdateRole();
        }
        else{
            this._roleService.AddRole(this.RoleModel).subscribe(
                response => {
                this.output = response
                if (this.output.StatusCode == "409") {
                    this.snackbar.openSnackBar('Role Already Exists');
                }
                else if (this.output.StatusCode == "200") {
                    this.snackbar.openSnackBar('Role Created Successfully..');
                    this.getRole();
                }
                else {
                    this.snackbar.openSnackBar('Something Went Wrong');
                }
            });
        }
    }

    Delete(RoleId) {

        if (confirm("Are you sure to delete Role ?")) {
            this._roleService.DeleteRole(RoleId).subscribe
                (
                response => {
                    if (response.StatusCode == "200") {
                        this.snackbar.openSnackBar('Deleted Role Successfully');
                        this.getRole();
                    }
                    else {
                        this.snackbar.openSnackBar('Something Went Wrong');
                    }
                }
                )
        }
    }

    Edit(roleId)
    {
        // GetRoleById
        this._roleService.GetRoleById(roleId).subscribe(
            allPeriod => {
                this.RoleModel = allPeriod

            },
            error => this.errorMessage = <any>error);
    }

    UpdateRole() 
    {
        this._roleService.UpdateRole(this.RoleModel).subscribe(
            response => {
            this.output = response
            if (this.output.StatusCode == "409") {
                alert('Role Already Exists');
            }
            else if (this.output.StatusCode == "200") {
                this.snackbar.openSnackBar('Role Updated Successfully');
                this.getRole();
                //this.RoleModel = null;
            }
            else {
                this.snackbar.openSnackBar('Something Went Wrong');
            }
        });
    }

    

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
}