import { TermsService } from './service/terms.service';
import { NotificationService } from './../services/Notification.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  terms:boolean;
  loginRoute:string='';
  private _termService;
  constructor(private route : ActivatedRoute, private _Route: Router, private snack:NotificationService, private termService:TermsService) {
    this._termService = termService;
   }

ngOnInit() : void{
  this.loginRoute = this.route.snapshot.paramMap.get('url');  
}
 
  accept()
  {
    if(this.terms)
    {
      this._termService.UpdateTerm()
        .subscribe(response => {
          if(response.StatusCode==200)
          {
              this._Route.navigate([this.loginRoute]);
          }
          else
          {
            this.snack.openSnackBar('कुछ टेक्निकल दिक्कत है कृपया फिर से प्रयास करे ...।');
          }
        });
    }
    else
    {
      this.snack.openSnackBar('कृपया नियम और शर्तें स्वीकार करें ...।');
    }
  }

}
