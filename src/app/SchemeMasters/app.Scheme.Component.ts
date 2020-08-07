import { NotificationService } from './../services/Notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SchemeMasterModel } from './app.SchemeModel';
import { SchemeService } from './Services/app.Scheme.Service';
import { Router } from '@angular/router';
import { SchemeMasterViewModel } from './Models/app.SchemeViewModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  templateUrl: './app.SchemeMaster.html',
  styleUrls: [],
})
export class SchemeComponent implements OnInit {
  title = 'Scheme Master';
  SchemeForms: SchemeMasterModel = new SchemeMasterModel();
  private _SchemeService;
  private responsedata: any;
  AllSchemeList: SchemeMasterViewModel[];
  errorMessage: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'SchemeID',
    'SchemeName',
    'WinPer',
    'Terms',
    'Status',
    'Createddate',
    'EditAction',
    'DeleteAction',
  ];
  dataSource: any;
  action: boolean = false;
  output: any;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor(
    private _Route: Router,
    public snackBar: NotificationService,
    private schemeService: SchemeService
  ) {
    this._SchemeService = schemeService;
  }
  onSubmit() {
    if (this.SchemeForms.SchemeID > 0) {
      this.update();
    } else {
      this._SchemeService.SaveScheme(this.SchemeForms).subscribe((response) => {
        this.output = response;
        if (this.output.StatusCode == '409') {
          this.snackBar.openSnackBar('Scheme Name Already Exists');
        } else if (this.output.StatusCode == '200') {
          this.snackBar.openSnackBar('Saved Scheme Successfully');
          this.getScheme();
        } else {
          this.snackBar.openSnackBar('Something Went Wrong');
        }
      });
    }
  }

  ngOnInit() {
    this.getScheme();
  }

  getScheme() {
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
    if (confirm('Are you sure to delete Scheme ?')) {
      this._SchemeService.DeleteScheme(schemeId).subscribe((response) => {
        if (response.StatusCode == '200') {
          this.snackBar.openSnackBar('Deleted Scheme Successfully');
          this.getScheme();
        } else {
          this.snackBar.openSnackBar('Something Went Wrong');
        }
      });
    }
  }

  Edit(SchemeID) {
    var data = this._SchemeService.GetSchemeById(SchemeID).subscribe(
      (Scheme) => {
        this.SchemeForms.SchemeID = Scheme.SchemeID;
        this.SchemeForms.SchemeName = Scheme.SchemeName;
        this.SchemeForms.WinPer = Scheme.WinPer;
        this.SchemeForms.Status = Scheme.Status;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  update() {
    this._SchemeService.UpdateScheme(this.SchemeForms).subscribe((response) => {
      if (response.StatusCode == '200') {
        this.snackBar.openSnackBar('Updated Scheme Successfully');
        this.getScheme();
      }
      if (response.StatusCode == '500') {
        this.snackBar.openSnackBar('Something is wrong!!');
      }
    });
  }
}
