import { SchemeService } from './../SchemeMasters/Services/app.Scheme.Service';
import { SchemeMasterModel } from './../SchemeMasters/app.SchemeModel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GameModel } from './Models/GameModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { GameService } from './Services/Game.service';
import { NotificationService } from '../services/Notification.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-Game',
  templateUrl: './Game.component.html',
  styleUrls: ['./Game.component.css']
})
export class GameComponent implements OnInit {

    private _gameService;
    private _schemeService;
    GameModel : GameModel = new GameModel();
    output: any;
    SchemeList: SchemeMasterModel[];
    errorMessage: any;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['GameId', 'GameName', 'SchemeName','WinPer','StartTime','EndTime', 'EditAction', 'DeleteAction'];
    dataSource: any;

  constructor(private _Route: Router, private gameService :GameService,private schemeService:SchemeService,
     private snackbar:NotificationService) {
    this._gameService = gameService;
    this._schemeService = schemeService;
   }

  ngOnInit() : void {
    this._gameService.getAllGamesAsync().subscribe(
        assignModel => 
        {
            
            this.dataSource = new MatTableDataSource(assignModel);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        },
        error => this.errorMessage = <any>error
    );

    this._schemeService.GetAllScheme().subscribe(
      (AllScheme) => {
        this.SchemeList = AllScheme;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  onSubmit()
  {
    this._gameService.AddGame(this.GameModel).subscribe(e=>{
      console.log(e);
    });
  }

  Edit(id)
  {

  }


  Delete(id)
  {
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
