import { Component, OnInit, ViewChild } from "@angular/core";
import { SchemeService } from "./Services/app.Scheme.Service";
import { SchemeMasterViewModel } from "./Models/app.SchemeViewModel";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  templateUrl: "./app.AllSchemeComponent.html",
  styleUrls: [],
})
export class AllSchemeComponent implements OnInit {
  private _SchemeService;
  AllSchemeList: SchemeMasterViewModel[];
  errorMessage: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    "SchemeID",
    "SchemeName",
    "Status",
    "Createddate",
    "EditAction",
    "DeleteAction",
  ];
  dataSource: any;
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  actionButtonLabel: string = 'Retry';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  config:any;

  constructor(
    public snackBar: MatSnackBar,
    private location: Location,
    private _Route: Router,
    private schemeService: SchemeService
  ) {
    this._SchemeService = schemeService;
    this.config = new MatSnackBarConfig();
            this.config.duration = this.setAutoHide ? this.autoHide : 0;
            this.config.verticalPosition = this.verticalPosition;
  }

  ngOnInit() {
    this._SchemeService.GetAllScheme().subscribe(
      (AllScheme) => {
        this.AllSchemeList = AllScheme;
        this.dataSource = new MatTableDataSource(this.AllSchemeList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Delete(schemeId): void {
    if (confirm("Are you sure to delete Scheme ?")) {
      this._SchemeService.DeleteScheme(schemeId).subscribe((response) => {
        if (response.StatusCode == "200") {
          alert("Deleted Scheme Successfully");
          this.snackBar.open(
            "Deleted Scheme Successfully",
            this.action ? this.actionButtonLabel : undefined,
            this.config
          );
          location.reload();
        } else {
          alert("Something Went Wrong");
          this._Route.navigate(["/Scheme/All"]);
        }
      });
    }
  }
}
