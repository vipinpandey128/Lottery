import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanService } from './Services/app.planmaster.service';
import { PlanMasterViewModel } from './Models/app.PlanMasterViewModel';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    templateUrl: './app.allplanmaster.component.html',
    styleUrls: [
    ]
})

export class AllPlanMasterComponent implements OnInit {
    private _planService;
    PlanList: PlanMasterViewModel = new PlanMasterViewModel();
    errorMessage: any;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['PlanID', 'PlanName', 'SchemeName', 'Text', 'TotalAmount', 'RecStatus', 'EditAction', 'DeleteAction'];
    dataSource: any;
    constructor(private _Route: Router, private planService: PlanService) {
        this._planService = planService;
    }
    ngOnInit(): void {


        this._planService.GetAllPlans().subscribe(
            allplan => {
                this.PlanList = allplan
                this.dataSource = new MatTableDataSource(allplan);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error => this.errorMessage = <any>error
        );
    }


    Delete(PlanID) {
        if (confirm("Are you sure to delete Plan ?")) {
            this._planService.DeletePlan(PlanID).subscribe
                (
                response => {
                    if (response.StatusCode == "200") {
                        alert('Deleted Plan Successfully');
                        location.reload();
                    }
                    else {
                        alert('Something Went Wrong');
                        this._Route.navigate(['/Plan/All']);
                    }
                }
                )
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}