import { SchemeService } from './../SchemeMasters/Services/app.Scheme.Service';
import { SchemeMasterModel } from './../SchemeMasters/app.SchemeModel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GameModel } from './Models/GameModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
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
    // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private _Route: Router, private gameService :GameService,private schemeService:SchemeService,
     private snackbar:NotificationService) {
    this._gameService = gameService;
    this._schemeService = schemeService;
   }

  ngOnInit() : void {
    
    this.getAllGame();

    this._schemeService.GetAllScheme().subscribe(
      (AllScheme) => {
        this.SchemeList = AllScheme;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }


  getAllGame()
  {
    this._gameService.getAllGamesAsync().subscribe(
      assignModel => 
      {
          
          this.dataSource = new MatTableDataSource(assignModel);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      },
      error => this.errorMessage = <any>error
  );
  }

  onSubmit()
  {
    if(this.GameModel.GameId>0)
    {
      this._gameService.UpdateGame(this.GameModel).subscribe(e=>{
        //console.log(e);
        this.getAllGame();
      });
    }
    else
    {
      this._gameService.AddGame(this.GameModel).subscribe(e=>{
        //console.log(e);
        this.getAllGame();
      });
    }
  }

  Edit(gameId)
  {
    this._gameService.getGameByID(gameId).subscribe(e=>{
      this.GameModel = e;
    });
  }


  Delete(id)
  {
    this._gameService.AddGame(this.GameModel).subscribe(e=>{
      console.log(e);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
