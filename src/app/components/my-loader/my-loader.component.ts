import { OnDestroy } from '@angular/core';
// my-loader.component.ts
import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../../services/loader.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-my-loader",
  templateUrl: "./my-loader.component.html",
  styleUrls: ["./my-loader.component.css"],
})
export class MyLoaderComponent implements OnInit,OnDestroy {
  loading: boolean;
  loader: any = [
    "../../../assets/loader1.svg",
    "../../../assets/loader2.svg",
    "../../../assets/loader3.svg",
    "../../../assets/loader4.svg",
    "../../../assets/loader5.svg"
  ];
  srcLoader:Subscription;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });

    var randomNumber = Math.floor(Math.random()*this.loader.length);
    this.srcLoader = this.loader[randomNumber];
    //audioElement.setAttribute('src', );
  }
  ngOnInit() {}
  ngOnDestroy(){
    if (this.srcLoader) {
      var randomNumber = Math.floor(Math.random()*this.loader.length);
    this.srcLoader = this.loader[randomNumber];
  }
  }
}
